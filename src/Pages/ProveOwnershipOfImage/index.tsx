import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { baseColor, LargeButton, PaddingBox, StyledInput } from '../../styles';
import { proveImage, reportImage } from '../../func';
import TopNavigator from '../../Components/TopNavigator';
import YellowBottomNavigator from '../../Components/YellowBottomNavigator';
import Modal from '../../Components/Modal';
import { ProveStatus } from '../Profile/ProveList';
import RenderImageList from '../../Components/RenderImageList';

const ProveOwnershipOfImage = () => {
  const [reqData, setReqData] = useState({ nickname: '', title: '', phrase: '' });
  const [modalOpen, setModalOpen] = useState(false);
  //request for proof

  const nav = useNavigate();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      {modalOpen && (
        <Modal close={() => setModalOpen(!modalOpen)}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px' }}>
            <span style={{ textAlign: 'center', fontSize: '20px', fontWeight: 700 }}>Submitting phrase completed</span>
            <span style={{ textAlign: 'center', padding: '20px 0px' }}>
              Your proof went perfectly.
              <br />
              There will be no legal issues and the person who reported it will know that you have proved it. Thank you
              for your proof process.
            </span>
            <PaddingBox style={{ width: '100%', padding: '0px 16px' }}>
              <LargeButton
                style={{ backgroundColor: baseColor.yellow, color: 'black', fontWeight: 700 }}
                onClick={() => nav(-1)}
              >
                Go to Prove List
              </LargeButton>
            </PaddingBox>
          </div>
        </Modal>
      )}
      <TopNavigator>
        <span>Prove Ownership of Image</span>
      </TopNavigator>
      <PaddingBox>
        <div
          style={{
            display: 'flex',
            borderRadius: '16px',
            flexDirection: 'column',
            width: '100%',
            height: 'fit-content',
            border: '1px solid white',
            alignItems: 'center',
          }}
        >
          <div style={{ marginTop: 16 }}>
            <ProveStatus proveStatus={0} />
          </div>
          <RenderImageList
            itemList={[{ id: '0x' }]}
            routeUrl="/Images"
            style={{ wrapper: { padding: '12px 30px 30px' } }}
            skeletonWidth={130}
            skeletonHeight={130}
            hideDetails
          />
          {/*<img src="" style={{ width: '130px', height: '130px' }} />*/}
        </div>
      </PaddingBox>
      <PaddingBox>
        <span style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Creator Nickname</span>
        <StyledInput
          name="nickname"
          placeholder="Put Creator Nickname"
          onChange={e => setReqData({ ...reqData, [e.target?.name]: e.target.value })}
        />
      </PaddingBox>
      <PaddingBox>
        <span style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Image Title</span>
        <StyledInput
          name="title"
          placeholder="Put Image Title"
          onChange={e => setReqData({ ...reqData, [e.target?.name]: e.target.value })}
        />
      </PaddingBox>
      <PaddingBox style={{ paddingBottom: '32px' }}>
        <span style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Phrase</span>
        <StyledInput
          name="phrase"
          placeholder="Put Phrase"
          onChange={e => setReqData({ ...reqData, [e.target?.name]: e.target.value })}
        />
      </PaddingBox>
      <YellowBottomNavigator>
        <LargeButton
          disabled={!reqData.nickname || !reqData.phrase || !reqData.title}
          onClick={() => {
            proveImage({ creatorNickname: reqData.nickname, imageTitle: reqData.title, phrase: reqData.phrase });
            setModalOpen(true);
          }}
        >
          Prove Ownership of Image
        </LargeButton>
      </YellowBottomNavigator>
    </div>
  );
};

export default ProveOwnershipOfImage;
