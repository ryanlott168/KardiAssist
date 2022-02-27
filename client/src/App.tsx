import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './useAuth';
import InnerApp from './components/InnerApp';


export default function App() {

  return (
    <Router>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </Router>
  );
}