import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Login } from './Pages/Login';
import { loginState } from './states/loginState';

import Main from './Pages/Main';
import ImageDetail from './Pages/ImageDetail';

const App = () => {
  const { isLogin } = useRecoilValue(loginState);
  if (!isLogin) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/images/:id" element={<ImageDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
