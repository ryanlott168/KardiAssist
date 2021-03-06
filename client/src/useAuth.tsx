import {
createContext,
ReactNode,
useContext,
useEffect,
useMemo,
useState,
} from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import * as sessionsApi from './helper/api/sessions';
import * as usersApi from './helper/api/users';
import User from './interfaces/user';

interface AuthContextType {
    user?: User;
    loading: boolean;
    error?: any;
    login: (email: string, password: string) => void;
    addUser: (firstName: string, lastName: string, email: string, password: string, isAdmin: boolean) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);

export function AuthProvider({ children }: { children: ReactNode; }): JSX.Element {
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

    const navigate = useNavigate();
    const location = useLocation();

    // If we change page, reset the error state.
    useEffect(() => {
        if (error) setError(null);
    }, [location.pathname]);

    // Check if there is a currently active session
    // when the provider is mounted for the first time.
    //
    // If there is an error, it means there is no session.
    //
    // Finally, just signal the component that the initial load
    // is over.
    useEffect(() => {
        usersApi.getCurrentUser()
        .then((user) => setUser(user))
        .catch((_error) => {})
        .finally(() => setLoadingInitial(false));
    }, []);

    // Flags the component loading state and posts the login
    // data to the server.
    //
    // An error means that the email/password combination is
    // not valid.
    //
    // Finally, just signal the component that loading the
    // loading state is over.
    function login(email: string, password: string) {
        setLoading(true);

        sessionsApi.login({ email, password })
        .then((user) => {
            setUser(user);
            navigate('/dashboard');
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }

    // Sends new user details to the server. 
    async function addUser(firstName: string, lastName: string, email: string, password: string, isAdmin: boolean) {
        setLoading(true);

        return await usersApi.addUser({ firstName, lastName, email, password, isAdmin })
        .catch((error) => {
            setError(error);
            return error;
        })
        .finally(() => setLoading(false));
    }

    // Call the logout endpoint and then remove the user
    // from the state.
    function logout() {
        sessionsApi.logout().then(() => setUser(undefined));
    }

    // Make the provider update only when it should.
    // We only want to force re-renders if the user,
    // loading or error states change.
    //
    // Whenever the `value` passed into a provider changes,
    // the whole tree under the provider re-renders, and
    // that can be very costly! Even in this case, where
    // you only get re-renders when logging in and out
    // we want to keep things very performant.
    const memoedValue = useMemo(
        () => ({
        user,
        loading,
        error,
        login,
        addUser,
        logout,
        }),
        [user, loading, error]
    );

    // We only want to render the underlying app after we
    // assert for the presence of a current user.
    return (
        <AuthContext.Provider value={memoedValue}>
        {!loadingInitial && children}
        </AuthContext.Provider>
    );
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useAuth() {
    return useContext(AuthContext);
}