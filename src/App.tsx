import React from 'react';
import './App.css';
import { RecoilRoot, useRecoilValue } from 'recoil';
import Main from './Pages/Main';
import { Login } from './Pages/Login';
import { loginState } from './states/loginState';

const App = () => {
  const { isLogin } = useRecoilValue(loginState);
  if (!isLogin) {
    return <Login />;
  }

  return <Main />;
};

export default App;
