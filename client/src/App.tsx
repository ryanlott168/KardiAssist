import { Routes, Route} from "react-router-dom";
import Homepage from './components/Homepage';
import Header from "./components/Header";
import Login from './components/Login';
import './styles/App.scss';


export default function App() {

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}