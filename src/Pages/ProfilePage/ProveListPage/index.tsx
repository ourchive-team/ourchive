import React, { useState } from 'react';

import { useRecoilState } from 'recoil';
import { baseColor, LargeButton, PaddingBox, StyledInput, StyledSpan } from '../../../styles';
import TopNavigator from '../../../Components/NavigatorComponents/TopNavigator';
import ImageSkeletonRenderer from '../../../Components/ImageComponents/ImageSkeletonRenderer';
import CreatorInfo from '../../../Components/CreatorInfo';
import profileIcon from '../../../images/profile-icon.png';
import BottomContainer from '../../../Components/NavigatorComponents/BottomContainer';
import CenteredModal from '../../../Components/CenteredModal';
import { dateToString } from '../../../func/util';
import { IProveImage, IProveItem } from '../../../func/type';
import { nicknameState } from '../../../states/loginState';
import { onchain } from '../../../func';

interface IProveStatus {
  proveStatus: 0 | 1 | 2 | 3;
}

const EnumProveStatus = {
  0: 'Not Proved',
  1: 'Proved',
  2: 'Prove Requested',
  3: 'Cannot Prove',
};

const EnumProveColor = {
  0: baseColor.lightOrange,
  1: baseColor.green,
  2: baseColor.orange,
  3: baseColor.pink,
};

const ProveListPage = () => {
  const initReqData: IProveImage = {
    userNickname: '',
    creatorNickname: '',
    imageTitle: '',
    phrase: '',
  };

  const dummy: IProveItem[] = [
    {
      proved: 0,
      title: 'set',
      creator: 'wer',
      requestedDate: null, //Timestamp?
      provedDate: null, //Timestamp?
      keyPhrase: 'wef w',
      uri: 'fwef',
    },
  ];

  const [proveList, setProveList] = useState<IProveItem[]>(dummy);

  const [nickname] = useRecoilState(nicknameState);
  const [reqData, setReqData] = useState<IProveImage>(initReqData);
  const [modal, setModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);

  // useEffect(() => {
  //   onchain.getProveList(nickname).then(data => {
  //     setProveList(data);
  //   });
  // }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <CenteredModal
        show={modal}
        onHide={() => setModal(false)}
        body={
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
            <PaddingBox>
              <div
                style={{
                  display: 'flex',
                  borderRadius: '16px',
                  flexDirection: 'column',
                  width: '100%',
                  height: 'fit-content',
                  border: '1px solid rgba(0,0,0,0.5)',
                  alignItems: 'center',
                }}
              >
                <div style={{ marginTop: 16 }}>
                  <ProveStatus proveStatus={0} />
                </div>
                <ImageSkeletonRenderer
                  itemList={[
                    {
                      creator: reqData.creatorNickname,
                      creatorNickname: reqData.userNickname,
                      collection: 'asdf',
                      name: reqData.imageTitle,
                      uri: 'fewaf',
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
                name="creatorNickname"
                value={reqData.creatorNickname}
                placeholder="Put Creator Nickname"
                onChange={e => setReqData({ ...reqData, [e.target?.name]: e.target.value })}
              />
            </PaddingBox>
            <PaddingBox>
              <span style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Image Title</span>
              <StyledInput
                name="imageTitle"
                value={reqData.imageTitle}
                placeholder="Put Image Title"
                onChange={e => setReqData({ ...reqData, [e.target?.name]: e.target.value })}
              />
            </PaddingBox>
            <PaddingBox>
              <span style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Email to Request</span>
              <StyledInput
                name="phrase"
                placeholder="Put Phrase"
                value={reqData.phrase}
                onChange={e => setReqData({ ...reqData, [e.target?.name]: e.target.value })}
              />
            </PaddingBox>
          </div>
        }
        footer={
          <LargeButton
            style={{ margin: '0px 16px 16px' }}
            disabled={!reqData.creatorNickname || !reqData.phrase || !reqData.imageTitle}
            onClick={() => {
              onchain
                .proveImage({
                  userNickname: nickname,
                  creatorNickname: reqData.userNickname,
                  imageTitle: reqData.imageTitle,
                  phrase: reqData.phrase,
                })
                .then(data => {
                  setModal(false);
                  setReqData(initReqData);
                  setCompleteModal(true);
                });
            }}
          >
            Prove Ownership of Image
          </LargeButton>
        }
      />

      <CenteredModal
        title="Submitting phrase completed"
        show={completeModal}
        onHide={() => setCompleteModal(false)}
        body={
          <p style={{ textAlign: 'center', fontWeight: 400, fontSize: '12px' }}>
            Your proof went perfectly.
            <br /> There will be no legal issues and the person who reported <br />
            it will know that you have proved it. Thank you for your proof process.
          </p>
        }
        footer={<LargeButton onClick={() => setCompleteModal(false)}>Go to prove List</LargeButton>}
      />

      <TopNavigator>
        <span style={{ fontSize: '18px' }}>Prove list</span>
      </TopNavigator>

      <PaddingBox>
        {proveList.map(el => {
          const highlightsColor = EnumProveColor[el.proved];
          return (
            <div
              // click to prove page
              // onClick={() => {
              //   nav(`${el.creator}/${el.title}?phrase=${el.keyPhrase}`);
              // }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px',
                border: '1px solid black',
                borderRadius: '16px',
                marginBottom: '16px',
              }}
            >
              <ProveStatus proveStatus={el.proved} />
              <div style={{ display: 'flex', marginTop: '-4px' }}>
                <div>
                  <ImageSkeletonRenderer
                    itemList={[]}
                    routeUrl="/Images"
                    style={{ wrapper: { paddingLeft: '0px' } }}
                    skeletonWidth={60}
                    skeletonHeight={60}
                    hideDetails
                  />
                </div>

                <div style={{ display: 'flex', width: '100%', flexDirection: 'column', padding: '18px 18px 18px 0px' }}>
                  <StyledSpan
                    style={{
                      fontWeight: 700,
                      fontSize: '15px',
                      whiteSpace: 'nowrap',
                      marginBottom: '4px',
                    }}
                  >
                    {el.title}
                  </StyledSpan>

                  <div style={{ marginTop: 'auto' }}>
                    <CreatorInfo
                      profileImg={profileIcon}
                      creator={el.creator}
                      style={{
                        img: { width: '16px', height: '16px', marginRight: '4px' },
                        text: { fontSize: '10px', fontWeight: 700, marginBottom: '0px', color: 'black' },
                      }}
                    />
                  </div>
                </div>
              </div>
              <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.3)', marginBottom: '12px' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 'auto', rowGap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <StyledSpan style={{ color: 'rgba(0,0,0,0.6)', whiteSpace: 'nowrap' }}>Requested Date</StyledSpan>
                  <StyledSpan style={{ whiteSpace: 'nowrap' }}>{dateToString(el.requestedDate)}</StyledSpan>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <StyledSpan style={{ color: 'rgba(0,0,0,0.6)', whiteSpace: 'nowrap' }}>Proved Date</StyledSpan>
                  <StyledSpan style={{ color: highlightsColor, whiteSpace: 'nowrap' }}>
                    {dateToString(el.provedDate)}
                  </StyledSpan>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <StyledSpan style={{ color: 'rgba(0,0,0,0.6)', whiteSpace: 'nowrap' }}>Key Phrase</StyledSpan>
                  <StyledSpan style={{ color: highlightsColor, whiteSpace: 'nowrap' }}>{el.keyPhrase}</StyledSpan>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {el.proved === 0 && (
                    <LargeButton
                      onClick={() => {
                        const itemData = {
                          userNickname: nickname,
                          creatorNickname: el.creator,
                          imageTitle: el.title,
                          phrase: el.keyPhrase,
                        };

                        // onchain.proveImage({ ...itemData }).then(data => {
                        setReqData({ ...itemData });
                        setModal(true);
                        // });
                      }}
                      style={{ width: '114px', minHeight: '30px', height: '30px' }}
                    >
                      Prove
                    </LargeButton>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </PaddingBox>
      <BottomContainer style={{ backgroundColor: baseColor.beige }} />
    </div>
  );
};

export const ProveStatus = ({ proveStatus }: IProveStatus) => {
  const color = EnumProveColor[proveStatus];
  const status = EnumProveStatus[proveStatus];
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '4px 12px',
        border: `1px solid ${color}`,
        width: 'fit-content',
        borderRadius: 48,
      }}
    >
      <div
        style={{
          width: '6px',
          height: '6px',
          backgroundColor: color,
          borderRadius: '50%',
          marginRight: '4px',
        }}
      />
      <span style={{ color, fontSize: '11px' }}>{status}</span>
    </div>
  );
};

export default ProveListPage;
