import { Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Header from './Header';
import Login from './auth/Login';
import Dashboard from './Dashboard';
import Studies from './studies';
import AddUser from './users/AddUser';
import AuthenticatedRoute from './auth/AuthenticatedRoute';
import NotAuthorized from './err/NotAuthorized';
import '../styles/App.scss';
import NotFound from './err/NotFound';

export default function InnerApp() {

    return (
          <div className='InnerApp'>
            <Header/>
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/dashboard' element={
                <AuthenticatedRoute security={'user'}>
                  <Dashboard />
                </AuthenticatedRoute>
                }
              />
              <Route path='/studies' element={
                <AuthenticatedRoute security={'user'}>
                  <Studies />
                </AuthenticatedRoute>
                }
              />
              <Route path='/user/addUser' element={
                <AuthenticatedRoute security={'admin'}>
                  <AddUser />
                </AuthenticatedRoute>
                }
              />
              <Route path='login' element={<Login />} />
              <Route path='notAuthorized' element={<NotAuthorized />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
    );
  }