import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { baseColor, LargeButton, PaddingBox, StyledInput } from '../../styles';
import { getImageInfo, reportImage } from '../../func';
import TopNavigator from '../../Components/TopNavigator';
import YellowBottomNavigator from '../../Components/YellowBottomNavigator';
import Modal from '../../Components/Modal';
import { sendEmail } from './func';
import { sendEmailByEmailJS } from './sendEmailByEmailJS';

const Report = () => {
  const pathItems = window.location.pathname.split('/');
  const creatorAddress = pathItems[2].replace(/%20/g, ' ');
  const nickname = pathItems[3].replace(/%20/g, ' ');
  const imageTitle = pathItems[4].replace(/%20/g, ' ');

  const [reqData, setReqData] = useState({ nickname, title: imageTitle, email: '', phrase: '' });
  const [modalOpen, setModalOpen] = useState(false);

  const anchor = useRef<any>();
  const nav = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <a
        ref={anchor}
        href={`mailto:${reqData.email} ?subject= Prove Request for Stock Image &body= A request for proof of the Image you used has been received. Please visit OURCHIEVE and proceed with the proof of ownership. Please be advised that if you can’t prove ownership, there may be legal action against your contents.\n\n localhost:3000/profile/provement-list/0x31c3999bbc7d571b53a757c433ccbe7fcb626fe85af068bdf51155422b154646/AptosMan/finger?phrase=${reqData.phrase}
        `}
        style={{
          width: '100%',
          height: '48px',
          fontWeight: 700,
          color: 'black',
          textDecoration: 'none',
          fontSize: 16,
          minHeight: 48,
          backgroundColor: baseColor.yellow,
          justifyContent: 'center',
          alignItems: 'center',
          border: 'none',
          borderRadius: '4px',
          position: 'fixed',
          zIndex: 20,
          display: 'none',
        }}
      >
        Send email
      </a>
      <div>adsf</div>
      {modalOpen && (
        <Modal close={() => setModalOpen(!modalOpen)}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px' }}>
            <span style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px' }}>Request Completed</span>
            <span>Your request has been sent to</span>
            <span style={{ color: baseColor.yellow, marginBottom: '16px' }}>{`"${reqData.email}"`}</span>
            <span>The autogenerated phrase is</span>
            <span style={{ color: baseColor.yellow, marginBottom: '16px' }}>{`"${reqData.phrase}"`}</span>

            <PaddingBox style={{ width: '100%', padding: '0px 16px' }}>
              <LargeButton
                style={{ backgroundColor: baseColor.yellow, color: 'black' }}
                onClick={() => {
                  nav(-1);
                  anchor?.current?.click();
                }}
              >
                Go to Report List
              </LargeButton>
            </PaddingBox>
          </div>
        </Modal>
      )}
      <TopNavigator>
        <span>Report Image</span>
      </TopNavigator>
      <PaddingBox>
        <span style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Creator Nickname</span>
        <StyledInput
          name="nickname"
          value={nickname}
          placeholder="Put Creator Nickname"
          onChange={e => setReqData({ ...reqData, [e.target?.name]: e.target.value })}
        />
      </PaddingBox>
      <PaddingBox>
        <span style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Image Title</span>
        <StyledInput
          name="title"
          value={imageTitle}
          placeholder="Put Image Title"
          onChange={e => setReqData({ ...reqData, [e.target?.name]: e.target.value })}
        />
      </PaddingBox>
      <PaddingBox>
        <span style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Email to Request</span>
        <StyledInput
          name="email"
          placeholder="Put Email Address"
          onChange={e => setReqData({ ...reqData, [e.target?.name]: e.target.value })}
        />
      </PaddingBox>
      <YellowBottomNavigator>
        <LargeButton
          disabled={!reqData.nickname || !reqData.email || !reqData.title}
          onClick={() => {
            const randomPhrase = (Math.random() + 1).toString(36).substring(8);
            setReqData({ ...reqData, phrase: randomPhrase });
            reportImage({
              creatorNickname: reqData.nickname,
              imageTitle: reqData.title,
              randomPhrase,
            })
              .then(data => {
                getImageInfo(creatorAddress, reqData.nickname, reqData.title).then(res => {
                  sendEmailByEmailJS({
                    toEmail: reqData.email,
                    imageTitle: reqData.title,
                    creatorNickname: reqData.nickname,
                    phrase: reqData.phrase,
                    url: res.imgUrl,
                  });
                });

                setModalOpen(true);
              })
              .catch(err => {
                console.log('report fail');
              });
          }}
        >
          Request for Proof
        </LargeButton>
      </YellowBottomNavigator>
    </div>
  );
};

export default Report;
