import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import useAuth from '../../useAuth';

export default function NotAuthorized() {
  const { user } = useAuth();

  return (
      <>
        <main>
          <h2>401: Access Denied</h2>
          <p>You are not authorized to view this page.</p>
          <div className='btnContainer'>
            {!user ? 
            <Link to='/login'>
              <Button variant='primary'>Log in</Button>
            </Link> :
            <Link to='/dashboard'>
              <Button variant='primary'>Dashboard</Button>
            </Link>
            }
          </div>
        </main>
      </>
  );
}