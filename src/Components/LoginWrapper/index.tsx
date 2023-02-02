import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginState, addressState, publicKeyState, nicknameState } from '../../states/loginState';
import { checkUserExists, walletConnect } from '../../func';

interface ILoginWrapper {
  children: JSX.Element;
}

const LoginWrapper = ({ children }: ILoginWrapper) => {
  const [isLogin, setIsLogin] = useState(false);
  const [address, setAddress] = useRecoilState(addressState);
  const [publicKey, setPublicKey] = useRecoilState(publicKeyState);
  const [nickname, setNickname] = useRecoilState(nicknameState);
  const location = useLocation();

  useEffect(() => {
    walletConnect(setAddress, setPublicKey);
    checkUserExists(setNickname);
  });

  return children;
};
export default LoginWrapper;
