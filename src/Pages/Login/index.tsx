import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { LargeButton } from '../../styles';
import { media } from '../../styles/mediaQuery';
import { loginState } from '../../states/loginState';

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

  color: #000000;
`;

// need font and image

export const Login = () => {
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  return (
    <LoginPageContainer>
      <TitleContainer>
        <ImageContainer />
        <Title>OurChive</Title>
      </TitleContainer>
      <LargeButton
        style={{ marginTop: 'auto' }}
        onClick={() => {
          setIsLogin({ isLogin: true });
        }}
      >
        Wallet Connect
      </LargeButton>
    </LoginPageContainer>
  );
};
