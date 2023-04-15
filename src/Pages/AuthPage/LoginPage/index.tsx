import React from 'react';
import styled from 'styled-components';

import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { LargeButton } from '../../../styles';
import { addressState, publicKeyState, nicknameState } from '../../../states/loginState';

import BottomContainer from '../../../Components/NavigatorComponents/BottomContainer';
import { onchain } from '../../../func';

export const LoginPage = () => {
  const nav = useNavigate();
  const setAddress = useSetRecoilState(addressState);
  const setPublicKey = useSetRecoilState(publicKeyState);
  const setNickname = useSetRecoilState(nicknameState);

  return (
    <LoginPageContainer style={{ backgroundColor: 'white', height: '100%' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '35vh',
          marginBottom: 'auto',
        }}
      >
        <span style={{ fontFamily: 'Cormorant SC', letterSpacing: '0.5em', fontSize: '58px' }}>OUR</span>
        <span style={{ fontFamily: 'Cormorant SC', letterSpacing: '0.5em', fontSize: '58px' }}>STOCK</span>

        <span style={{ fontSize: '15px', marginTop: '24px', fontWeight: 400, letterSpacing: '0.1em' }}>
          Web3 Stock Image Market
        </span>
      </div>
      <BottomContainer>
        <LargeButton
          style={{ fontSize: '16px' }}
          onClick={async () => {
            await onchain.walletConnect(setAddress, setPublicKey);
            if (await onchain.checkUserExists(setNickname)) {
              nav('/main');
            } else {
              nav('/nickname');
            }
          }}
        >
          Connect Wallet
        </LargeButton>
      </BottomContainer>
    </LoginPageContainer>
  );
};

const LoginPageContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 600px;

  display: flex;
  flex-direction: column;
`;
