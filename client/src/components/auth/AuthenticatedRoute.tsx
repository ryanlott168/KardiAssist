import {
    Navigate,
    useLocation,
  } from 'react-router-dom';
import useAuth from '../../useAuth';

export default function AuthenticatedRoute({ children, security }: { children: JSX.Element, security: string }) {
    let { user } = useAuth();
    let location = useLocation();

    if (security === 'admin' && !user?.isAdmin) {
      return <Navigate to='/notAuthorized' state={{ from: location }} replace />;
    } else if (security === 'user' && !user) {
      return <Navigate to='/login' state={{ from: location }} replace />;
    }
  
    return children;
}