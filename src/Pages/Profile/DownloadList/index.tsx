import React from 'react';

import RenderImageList from '../../../Components/RenderImageList';
import { buyImage, downloadImage } from '../../../func';
import { baseColor, StyledSpan } from '../../../styles';
import CreatedBy from '../../../Components/CreatedBy';
import profileIcon from '../../../images/profile-icon.png';

interface IExpireStatus {
  expireDate: number;
}
const ExpireStatus = ({ expireDate }: IExpireStatus) => {
  const isExpired = expireDate <= 0;
  const color = isExpired ? baseColor.orange : baseColor.green;
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
      <span style={{ color, fontSize: '11px' }}>{isExpired ? 'Ownership Expired' : `D-${expireDate}`}</span>
    </div>
  );
};

const ReDownloadOrExpiredButton = ({ expireDate }: IExpireStatus) => {
  const isExpired = expireDate <= 0;
  const color = isExpired ? baseColor.orange : 'white';
  return (
    <button
      type="button"
      onClick={() => {
        if (isExpired) {
          buyImage({
            size: 1,
            creator: 'asdf',
            imageTitle: 'asdf',
            expiry: 0,
          });
        } else {
          downloadImage();
        }
      }}
      style={{
        fontWeight: 700,
        fontSize: 14,
        marginTop: 'auto',
        width: 'fit-content',
        height: 'fit-content',
        padding: '8px 16px',
        border: '1px solid black',
        borderRadius: '16px',
        backgroundColor: color,
      }}
    >
      {isExpired ? 'Buy Again' : 'Re-download'}
    </button>
  );
};

const PurchaseList = () => {
  const requiredData = [
    { id: '0x1', imgUrl: '/', title: 'Two people standing', description: 'desc', creator: 'Shelby', expireDate: 30 },
    { id: '0x1', imgUrl: '/', title: 'Two people standing', description: 'desc', creator: 'Shelby', expireDate: 2 },
    { id: '0x1', imgUrl: '/', title: 'Two people standing', description: 'desc', creator: 'Shelby', expireDate: 0 },
  ];

  return (
    <div style={{ display: 'flex', width: '100%', flexDirection: 'column', padding: '16px' }}>
      {requiredData.map(el => {
        return (
          <div
            style={{
              display: 'flex',
              width: '100%',
              border: '1px solid white',
              borderRadius: '16px',
              marginBottom: '16px',
            }}
          >
            <RenderImageList
              itemList={[]}
              routeUrl="/Images"
              skeletonWidth={100}
              skeletonHeight={100}
              hideDetails
            />

            <div style={{ display: 'flex', width: '100%', flexDirection: 'column', padding: '16px 16px 16px 0px' }}>
              <ExpireStatus expireDate={el.expireDate} />
              <StyledSpan
                style={{
                  fontWeight: 700,
                  fontSize: '15px',
                  whiteSpace: 'nowrap',
                  marginTop: '12px',
                  marginBottom: '4px',
                }}
              >
                {el.title}
              </StyledSpan>
              <StyledSpan style={{ fontSize: '12px', marginBottom: '4px', color: 'rgba(255,255,255,0.6)' }}>
                {el.description}
              </StyledSpan>
              <CreatedBy
                profileImg={profileIcon}
                creator={el.creator}
                style={{
                  img: { width: '16px', height: '16px', marginRight: '4px' },
                  text: { fontSize: '10px', fontWeight: 700 },
                }}
              />
              <ReDownloadOrExpiredButton expireDate={el.expireDate} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PurchaseList;
