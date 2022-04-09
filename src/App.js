import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useSearchParams,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import { setUser } from './redux/slices/userSlice';

const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
      dispatch(setUser({ token, user }));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="signIn" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
