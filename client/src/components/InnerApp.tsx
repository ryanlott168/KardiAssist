import { Routes, Route } from "react-router-dom";
import Homepage from './Homepage';
import Header from "./Header";
import Login from './Login';
import About from "./About";
import Dashboard from "./Dashboard";
import AuthenticatedRoute from "./AuthenticatedRoute";
import '../styles/App.scss';



export default function InnerApp() {

    return (
          <div className="InnerApp">
            <Header/>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/dashboard" element={
                <AuthenticatedRoute>
                  <Dashboard />
                </AuthenticatedRoute>
                }
              />
              <Route path="login" element={<Login />} />
              <Route path="about" element={<About />} />
            </Routes>
          </div>
    );
  }