import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Buffer } from 'buffer';

import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.svg';
import profileIcon from '../../images/profile-icon.png';

import { baseColor, LargeButton } from '../../styles';
import { loginState, addressState, publicKeyState, nicknameState } from '../../states/loginState';
import { checkUserExists, walletConnect } from '../../func';
import YellowBottomNavigator from '../../Components/YellowBottomNavigator';

import our from '../../images/our.svg';
import chive from '../../images/chive.svg';

const LoginPageContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 600px;

  display: flex;
  flex-direction: column;
`;

// need font and image

export const Login = () => {
  const nav = useNavigate();
  const [address, setAddress] = useRecoilState(addressState);
  const [publicKey, setPublicKey] = useRecoilState(publicKeyState);
  const [nickname, setNickname] = useRecoilState(nicknameState);
  const [imaage, setImaage] = useState<any>();

  const a = 'asdf';
  const imageToBase64DataUri = async (img: any) => {
    const getImage = await axios.get(img, {
      responseType: 'arraybuffer',
    });

    const imageToBase64 = Buffer.from(getImage.data, 'binary').toString('base64');
    const dataUri = `data:image/svg+xml;base64,${encodeURIComponent(imageToBase64)}`;

    return dataUri;
  };

  async function sendEmail() {
    const sheetId = '1OMNwC1Ub4tsCb5UeMMIyI4IW2uLzdpvWj1AAEQrsHmM';
    const scriptUrl =
      'https://script.google.com/macros/s/AKfycbyrtd9GcC-D3nmtEWLhJHV-j2SfxaXQck79BqacEKgr232NXBSitPvwSNzPdY8MtDAINQ/exec';

    // 이미지를 선택합니다.
    const logos = logo;

    // 이미지를 base64 데이터 uri로 변환합니다.
    const imageDataUri = await imageToBase64DataUri(logos);
    setImaage(imageDataUri);

    const emailHTML = `
<table style="table-layout: fixed; border-collapse: collapse; width: 100%; max-width: 600px; margin-bottom:72px;">
    <thead>
        <tr>
            <th style="background-color: #FBFE67; height:140px; font-family: Unbounded; width:100%; margin: 0px auto;">OUR CHIVE</th>
        </tr>
    </thead>
    <tbody>
        <tr style="text-align:center">
            <td>
                <p style="font-family: Unbounded; font-style: normal; font-size: 16px; text-align:center; margin-top:40px;">
                    <strong style="font-weight: 700;">A request for proof of the Image you used has been received.</strong>
                    <br/>
                    Please visit OURCHIVE and proceed with the proof of ownership.
                </p>
            </td>
        </tr>
        <tr style="text-align:center">
            <td>
                <p style="font-family: Unbounded; font-style: normal; font-size: 16px; text-align:center; margin-top:40px;">
                    Please be advised that if you can’t prove ownership,
                    <br/>
                    <strong style="font-weight: 700;">there may be legal action against your contents.</strong>
                </p>
            </td>
        </tr>
        <tr style="text-align:center">
            <td>
                <div style="margin:40px 0px">
                    <span style="font-family: Unbounded; font-style: normal; font-weight: 400; font-size: 10px;">Creator nickname</span>
                    <span style="font-family: Unbounded; font-style: normal; font-weight: 700; font-size: 16px;"> with " ${a} "</span>
                </div>
            </td>
        </tr>
        <tr style="text-align:center">
            <td>
                <div style="margin:40px 0px ">
                    <span style="font-family: Unbounded; font-style: normal; font-weight: 400; font-size: 10px;">Reported Image Title:</span>
                    <span style="font-family: Unbounded; font-style: normal; font-weight: 700; font-size: 16px;"> with " imageTitle "</span>
                </div>
            </td>
        </tr>
        <tr style="text-align:center">
            <td>
                <div style="margin:40px 0px ">
                    <span style="font-family: Unbounded; font-style: normal; font-weight: 400; font-size: 10px;">Phrase for Proof</span>
                    <span style="font-family: Unbounded; font-style: normal; font-weight: 700; font-size: 16px;"> with " phrase "</span>
                </div>
            </td>
        </tr>
        <tr style="text-align:center">
            <td>
                <a>
                    <button style="font-family: Unbounded; font-style: normal; font-weight: 400; font-size: 20px; padding:22px 50px; background-color:black; color:white; border-radius: 4px; margin-bottom: 40px;">
                        Prove Ownership
                    </button>
                </a>
            </td>
        </tr>
        <tr style="text-align:center">
            <td>
                <h2 style="font-family: Unbounded; font-style: normal; font-weight: 700; font-size: 20px;">How to prove?</h2>
            </td>
        </tr>
        <table>
            <tbody>
                <tr>
                    <td style="text-align:center; width:70px;">
                        <p style="display: inline-block; font-family: Unbounded; width:70px; font-style: normal; font-weight: 700; font-size: 14px; margin-right:32px;">step1</p>
                    </td>
                    <td>
                        <p style="display: inline-block; font-family: Unbounded; font-style: normal; font-weight: 400; font-size: 14px;">Press the “Prove Ownership”  button.</p>
                    </td>
                </tr>
                <tr>
                    <td style="text-align:center; width:70px;">
                          <p style="display: inline-block; font-family: Unbounded; width:70px; font-style: normal; font-weight: 700; font-size: 14px; margin-right:32px;">step2</p>
                     </td>
                    <td>
                         <p style="display: inline-block; font-family: Unbounded; font-style: normal; font-weight: 400; font-size: 14px;">Connect to wallet in OURCHIVE. It will lead you to the prove page in the platform</p>
                    </td>
                </tr>
                <tr>
                    <td style="text-align:center; width:70px;">
                          <p style="display: inline-block; font-family: Unbounded; width:70px; font-style: normal; font-weight: 700; font-size: 14px; margin-right:32px;">step3</p>
                     </td>
                    <td>
                         <p style="display: inline-block; font-family: Unbounded; font-style: normal; font-weight: 400; font-size: 14px;">Enter the page and press the “prove Ownership of Image” button.</p>
                    </td>
                </tr>
            </tbody>
        </table>
    </tbody>
</table>
  `;

    const emailParams = {
      email: 'sanghyeok.kim@alphanonce.com',
      subject: 'Test Emailas',
      body: emailHTML,
    };
    const script = document.createElement('script');
    script.src = `${scriptUrl}?sheetId=${sheetId}&email=${emailParams.email}&subject=${
      emailParams.subject
    }&body=${encodeURIComponent(emailParams.body)}&callback=callback`;
    document.body.appendChild(script);
    //@ts-ignore
    window.callback = function () {
      console.log('Email sent!');
    };
  }
  console.log(imaage);

  return (
    <div style={{ backgroundColor: 'white' }}>
      <button type="button" onClick={sendEmail}>
        sadfkjo
      </button>
      <img style={{ width: 200, height: 200 }} alt="a" src={imaage} />
      <LoginPageContainer style={{ backgroundColor: baseColor.yellow, height: '100%' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '35vh',
            marginBottom: 'auto',
          }}
        >
          <img src={our} alt="our" style={{ width: '280px', marginBottom: '20px' }} />
          <img src={chive} alt="chive" style={{ width: '280px' }} />
        </div>
        <YellowBottomNavigator>
          <LargeButton
            style={{ fontSize: '16px' }}
            onClick={async () => {
              const { address: addr, publicKey: pKey } = await walletConnect(setAddress, setPublicKey);
              if (await checkUserExists(setNickname)) {
                // SET isLogin to true
                nav('/main');
              } else {
                nav('/nickname');
              }
            }}
          >
            Connect Wallet
          </LargeButton>
        </YellowBottomNavigator>
      </LoginPageContainer>
    </div>
  );
};
