import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import RenderImageList from '../../../Components/RenderImageList';
import { buyImage, downloadImage, getPurchasedImageList, TokenPurchaseItem } from '../../../func';
import { addressState } from '../../../states/loginState';
import { baseColor, StyledSpan } from '../../../styles';
import CreatedBy from '../../../Components/CreatedBy';
import profileIcon from '../../../images/profile-icon.png';

interface IExpireStatus {
  expireDate: number;
}
const ExpireStatus = ({ expireDate }: IExpireStatus) => {
  // TODO: isExpired
  const isExpired = expireDate > 0;
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

const ReDownloadOrExpiredButton = ({ expireDate, creator, creatorNickname, imageTitle, imageUri }: any) => {
  const isExpired = expireDate > 0;
  const color = isExpired ? baseColor.orange : 'white';
  return (
    <button
      type="button"
      onClick={() => {
        if (isExpired) {
          buyImage({
            size: 1,
            creator,
            creatorNickname,
            imageTitle,
            expiry: 0,
          });
        } else {
          downloadImage({ imageUri, imageTitle });
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
  const [purchaseList, setPurchaseList] = useState<TokenPurchaseItem[]>([]);
  const [address] = useRecoilState(addressState);
  useEffect(() => {
    getPurchasedImageList(address).then(data => {
      setPurchaseList(data);
    });
  }, []);

  return (
    <div style={{ display: 'flex', width: '100%', flexDirection: 'column', padding: '16px' }}>
      {purchaseList.map(el => {
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
              itemList={[
                {
                  creator: el.token.creator,
                  creatorNickname: el.token.creatorNickname,
                  collection: el.token.collection,
                  name: el.token.name,
                  uri: el.token.uri,
                  price: el.token.price,
                },
              ]}
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
                {el.token.name}
              </StyledSpan>
              <StyledSpan style={{ fontSize: '12px', marginBottom: '4px', color: 'rgba(255,255,255,0.6)' }}>
                good for general purpose videos
              </StyledSpan>
              <CreatedBy
                profileImg={profileIcon}
                creator={el.token.creatorNickname}
                style={{
                  img: { width: '16px', height: '16px', marginRight: '4px' },
                  text: { fontSize: '10px', fontWeight: 700 },
                }}
              />
              <ReDownloadOrExpiredButton
                expireDate={el.expireDate}
                creator={el.token.creator}
                creatorNickname={el.token.creatorNickname}
                imageTitle={el.token.name}
                imageUri={el.token.uri}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PurchaseList;
