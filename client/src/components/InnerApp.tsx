import { Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Header from './Header';
import Login from './Login';
import Dashboard from './Dashboard';
import AddUser from './AddUser';
import AuthenticatedRoute from './AuthenticatedRoute';
import '../styles/App.scss';




export default function InnerApp() {

    return (
          <div className='InnerApp'>
            <Header/>
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/dashboard' element={
                <AuthenticatedRoute>
                  <Dashboard />
                </AuthenticatedRoute>
                }
              />
              <Route path='/user/addUser' element={
                <AuthenticatedRoute>
                  <AddUser />
                </AuthenticatedRoute>
                }
              />
              <Route path='login' element={<Login />} />
            </Routes>
          </div>
    );
  }