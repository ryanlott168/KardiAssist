
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function NotFound() {

  return (
      <>
        <main>
          <h1>401: Page Not Found</h1>
          <div className='btnContainer'>
            <Link to='/'>
              <Button variant='primary'>Go Home</Button>
            </Link>
          </div>
        </main>
      </>
  );
}