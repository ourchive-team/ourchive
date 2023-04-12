import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { baseColor, LargeButton, PaddingBox, StyledSpan } from '../../../styles';
import TopNavigator from '../../../Components/NavigatorComponents/TopNavigator';
import ImageSkeletonRenderer from '../../../Components/ImageComponents/ImageSkeletonRenderer';
import CreatorInfo from '../../../Components/CreatorInfo';
import profileIcon from '../../../images/profile-icon.png';
import BottomContainer from '../../../Components/NavigatorComponents/BottomContainer';
import { onchain } from '../../../func';
import { dateToString } from '../../../func/util';
import { IProveItem } from '../../../func/type';
import { nicknameState } from '../../../states/loginState';
import CenteredModal from '../../../Components/CenteredModal';

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
  0: baseColor.yellow,
  1: baseColor.green,
  2: baseColor.orange,
  3: baseColor.orange,
};

const ReportList = () => {
  const [proveList, setProveList] = useState<IProveItem[]>([]);
  const [nickname] = useRecoilState(nicknameState);
  const [Modal, setModal] = useState(true);
  const [completeModal, setCompleteModal] = useState(false);

  // useEffect(() => {
  //   onchain.getProveList(nickname).then(data => {
  //     setProveList(data);
  //   });
  // }, []);

  const nav = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
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
              onClick={() => {
                nav(`${el.creator}/${el.title}?phrase=${el.keyPhrase}`);
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px',
                border: '1px solid white',
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
                        text: { fontSize: '10px', fontWeight: 700, marginBottom: '0px', color: 'white' },
                      }}
                    />
                  </div>
                </div>
              </div>
              <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.3)', marginBottom: '12px' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 'auto', rowGap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <StyledSpan style={{ color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap' }}>
                    Requested Date
                  </StyledSpan>
                  <StyledSpan style={{ whiteSpace: 'nowrap' }}>{dateToString(el.requestedDate)}</StyledSpan>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <StyledSpan style={{ color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap' }}>Proved Date</StyledSpan>
                  <StyledSpan style={{ color: highlightsColor, whiteSpace: 'nowrap' }}>
                    {dateToString(el.provedDate)}
                  </StyledSpan>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <StyledSpan style={{ color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap' }}>Key Phrase</StyledSpan>
                  <StyledSpan style={{ color: highlightsColor, whiteSpace: 'nowrap' }}>{el.keyPhrase}</StyledSpan>
                </div>
              </div>
            </div>
          );
        })}
      </PaddingBox>
      <BottomContainer
        style={{ box: { backgroundColor: 'transparent', paddingTop: 0 }, bar: { backgroundColor: 'white' } }}
      />
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

export default ReportList;
