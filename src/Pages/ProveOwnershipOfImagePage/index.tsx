import React, { useEffect, useState } from 'react';
import QueryString from 'qs';

import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { baseColor, LargeButton, PaddingBox, StyledInput } from '../../styles';
import { onchain } from '../../func';
import TopNavigator from '../../Components/NavigatorComponents/TopNavigator';
import BottomContainer from '../../Components/NavigatorComponents/BottomContainer';
import { ProveStatus } from '../ProfilePage/ProveList';
import ImageSkeletonRenderer from '../../Components/ImageComponents/ImageSkeletonRenderer';
import { nicknameState } from '../../states/loginState';
import CenteredModal from '../../Components/CenteredModal';

const ProveOwnershipOfImagePage = () => {
  const location = useLocation();
  const queryData: any = QueryString.parse(location.search, { ignoreQueryPrefix: true });

  const [reqData, setReqData] = useState({
    creator: location.pathname.split('/')[3].replace(/%20/g, ' '),
    nickname: location.pathname.split('/')[4].replace(/%20/g, ' '),
    title: location.pathname.split('/')[5].replace(/%20/g, ' '),
    phrase: queryData?.phrase || '',
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [nickname] = useRecoilState(nicknameState);
  const [uri, setUri] = useState('');
  //request for proof

  useEffect(() => {
    onchain
      .tokendataIdToUri({
        collection: `${reqData.nickname}'s Collection`,
        creator: reqData.creator,
        name: reqData.title,
      })
      .then(data => setUri(data));
  }, [reqData]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <CenteredModal
        show={modalOpen}
        onHide={() => setModalOpen(false)}
        title="Image Uploaded"
        body={
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px' }}>
            <span style={{ textAlign: 'center', fontSize: '20px', fontWeight: 700 }}>Submitting phrase completed</span>
            <span style={{ textAlign: 'center', padding: '20px 0px' }}>
              Your proof went perfectly.
              <br />
              There will be no legal issues and the person who reported it will know that you have proved it. Thank you
              for your proof process.
            </span>
          </div>
        }
        footer={
          <LargeButton
            style={{ backgroundColor: baseColor.yellow, color: 'black', fontWeight: 700 }}
            onClick={() => setModalOpen(false)}
          >
            Go to Prove List
          </LargeButton>
        }
      />

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
          <ImageSkeletonRenderer
            itemList={[
              {
                creator: reqData.creator,
                creatorNickname: reqData.nickname,
                collection: '',
                name: reqData.title,
                uri,
                price: 0,
              },
            ]}
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
          value={reqData.nickname}
          placeholder="Put Creator Nickname"
          onChange={e => setReqData({ ...reqData, [e.target?.name]: e.target.value })}
        />
      </PaddingBox>
      <PaddingBox>
        <span style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Image Title</span>
        <StyledInput
          name="title"
          value={reqData.title}
          placeholder="Put Image Title"
          onChange={e => setReqData({ ...reqData, [e.target?.name]: e.target.value })}
        />
      </PaddingBox>
      <PaddingBox style={{ paddingBottom: '32px' }}>
        <span style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Phrase</span>
        <StyledInput
          name="phrase"
          value={reqData.phrase}
          placeholder="Put Phrase"
          onChange={e => setReqData({ ...reqData, [e.target?.name]: e.target.value })}
        />
      </PaddingBox>
      <BottomContainer>
        <LargeButton
          disabled={!reqData.nickname || !reqData.phrase || !reqData.title}
          onClick={() => {
            console.log('proving brr brr!');
            onchain
              .proveImage({
                userNickname: nickname,
                creatorNickname: reqData.nickname,
                imageTitle: reqData.title,
                phrase: reqData.phrase,
              })
              .then(data => {
                setModalOpen(true);
              });
          }}
        >
          Prove Ownership of Image
        </LargeButton>
      </BottomContainer>
    </div>
  );
};

export default ProveOwnershipOfImagePage;
