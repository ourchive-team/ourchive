import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { addressState, publicKeyState, nicknameState } from '../../states/loginState';
import { onchain } from '../../func';

interface ILoginWrapper {
  children: JSX.Element;
}

const LoginWrapper = ({ children }: ILoginWrapper) => {
  const [, setAddress] = useRecoilState(addressState);
  const [, setPublicKey] = useRecoilState(publicKeyState);
  const [, setNickname] = useRecoilState(nicknameState);

  useEffect(() => {
    onchain.walletConnect(setAddress, setPublicKey);
    onchain.checkUserExists(setNickname);
  });

  return children;
};
export default LoginWrapper;
