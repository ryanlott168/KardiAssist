import { Link } from 'react-router-dom';
import useAuth from '../useAuth';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
      <>
        <main>
          <h2>Welcome to the Dashboard, {user!.firstName}!</h2>
          <p>You can do this, I believe in you.</p>
        </main>
      </>
  );
}