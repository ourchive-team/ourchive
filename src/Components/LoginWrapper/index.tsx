import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { addressState, publicKeyState, nicknameState } from '../../states/loginState';
import { onchain } from '../../func';

interface ILoginWrapper {
  children: JSX.Element;
}

const LoginWrapper = ({ children }: ILoginWrapper) => {
  const setAddress = useSetRecoilState(addressState);
  const setPublicKey = useSetRecoilState(publicKeyState);
  const setNickname = useSetRecoilState(nicknameState);

  useEffect(() => {
    onchain.walletConnect(setAddress, setPublicKey);
    onchain.checkUserExists(setNickname);
  });

  return children;
};
export default LoginWrapper;
