import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../styles/Homepage.scss';
import useAuth from '../useAuth';

export default function Homepage() {
  const { user } = useAuth();

  return (
      <>
        <main>
          <h2>Welcome to the homepage!</h2>
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