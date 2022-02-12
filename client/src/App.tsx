import { Routes, Route} from "react-router-dom";
import Homepage from './components/Homepage';
import Login from './components/Login';
import Signup from './components/Signup';
import './styles/App.css';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </div>
  );
}