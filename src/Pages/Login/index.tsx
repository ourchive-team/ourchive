import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { baseColor, LargeButton } from '../../styles';
import { media } from '../../styles/mediaQuery';
import { loginState } from '../../states/loginState';
import { walletConnect } from '../../func';

const LoginPageContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 600px;

  display: flex;
  flex-direction: column;

  padding: 40px 24px;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;

  width: 100%;

  border-radius: 4px;

  background-color: #f2f2f2;

  ${media.mobile`
      min-height: 158px;
      height: 22.66vh;
  `}
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${media.mobile`
    margin-top: 29.18%;
    margin-bottom: 26.23%;
  `}
`;

const Title = styled.span`
  font-family: 'Balsamiq Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 56px;
  text-align: center;
  padding-top: 16px;

  color: white;
`;

// need font and image

export const Login = () => {
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  return (
    <LoginPageContainer style={{ backgroundColor: baseColor.yellow }}>
      <TitleContainer>
        <ImageContainer />
        <Title style={{ fontFamily: 'unbounded', color: 'black' }}>OurChive</Title>
      </TitleContainer>

      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto' }}>
        <LargeButton
          style={{
            backgroundColor: 'white',
            color: 'black',
            border: '1px solid black',
            marginBottom: '12px',
            fontSize: '16px',
          }}
          onClick={() => {}}
        >
          Sign in
        </LargeButton>

        <LargeButton
          style={{ fontSize: '16px' }}
          onClick={() => {
            setIsLogin({ isLogin: true });
            walletConnect();
          }}
        >
          Wallet Connect
        </LargeButton>
      </div>
    </LoginPageContainer>
  );
};
