import {
    Navigate,
    useLocation,
  } from 'react-router-dom';
import useAuth from '../useAuth';

export default function AuthenticatedRoute({ children }: { children: JSX.Element }) {
    let { user } = useAuth();
    let location = useLocation();
  
    if (!user) {
      return <Navigate to='/login' state={{ from: location }} replace />;
    }
  
    return children;
}