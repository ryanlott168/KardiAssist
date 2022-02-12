import { Routes, Route} from "react-router-dom";
import Homepage from './components/Homepage';
import About from './components/About';
import './styles/App.css';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}