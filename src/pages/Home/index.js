import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';

import Hero from '../../components/Hero/Hero';
import Welcome from './Welcome';
import { setUser } from '../../redux/slices/userSlice';

const Home = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get('data')) {
      const data = JSON.parse(searchParams.get('data'));
      if (data.status !== 'ok') {
        return;
      }
      const { token, dataUser } = data;
      const decoded = jwt_decode(token);
      if (decoded.exp > Date.now() / 1000) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(dataUser));
        dispatch(
          setUser({
            token: token,
            user: dataUser,
          })
        );
        navigate('/');
      }
    }
  }, []);

  return (
    <div>
      <Hero />
      <Welcome />
    </div>
  );
};

export default Home;
