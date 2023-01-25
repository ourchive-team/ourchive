import React from 'react';
import './App.css';
import { useRecoilValue } from 'recoil';
import { Login } from './Pages/Login';
import { loginState } from './states/loginState';
import ImageDetail from './Pages/ImageDetail';

const App = () => {
  const { isLogin } = useRecoilValue(loginState);
  if (!isLogin) {
    return <Login />;
  }

  return <ImageDetail />;
};

export default App;
