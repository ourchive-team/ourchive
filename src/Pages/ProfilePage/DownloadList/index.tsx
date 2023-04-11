import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import ImageSkeletonRenderer from '../../../Components/ImageComponents/ImageSkeletonRenderer';
import { onchain } from '../../../func';
import { downloadFromIPFS } from '../../../func/ipfs';
import { TokenPurchaseItem } from '../../../func/type';
import { addressState } from '../../../states/loginState';
import { baseColor, StyledSpan } from '../../../styles';
import CreatorInfo from '../../../Components/CreatorInfo';
import profileIcon from '../../../images/profile-icon.png';
import TopNavigator from '../../../Components/NavigatorComponents/TopNavigator';

interface IExpireStatus {
  expireDate: number;
}

const PurchaseList = () => {
  const [purchaseList, setPurchaseList] = useState<TokenPurchaseItem[]>([
    {
      expireDate: 0,
      token: {
        creator: '0x00000000',
        creatorNickname: 'test',
        name: 'test',
        collection: 'test',
        price: 0,
        uri: 'test',
      },
    },
  ]);
  const [address] = useRecoilState(addressState);
  useEffect(() => {
    // onchain.getPurchasedImageList(address).then(data => {
    //   setPurchaseList(data);
    // });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TopNavigator>
        <span>Download List</span>
      </TopNavigator>

      <div style={{ display: 'flex', width: '100%', flexDirection: 'column', padding: '16px' }}>
        {purchaseList.map(el => {
          return (
            <div
              style={{
                display: 'flex',
                width: '100%',
                border: '1px solid black',
                borderRadius: '10px',
                marginBottom: '16px',
              }}
            >
              <ImageSkeletonRenderer
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
                <StyledSpan style={{ fontSize: '12px', marginBottom: '4px', color: 'rgba(0,0,0,0.6)' }}>
                  good for general purpose videos
                </StyledSpan>
                <CreatorInfo
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
    </div>
  );
};

const ExpireStatus = ({ expireDate }: IExpireStatus) => {
  // TODO: isExpired
  const isExpired = expireDate > 0;
  const color = isExpired ? baseColor.pink : baseColor.green;
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
  const color = isExpired ? baseColor.pink : 'black';
  return (
    <button
      type="button"
      onClick={() => {
        if (isExpired) {
          onchain.buyImage({
            size: 1,
            creator,
            creatorNickname,
            imageTitle,
            expiry: 0,
          });
        } else {
          downloadFromIPFS({ imageUri, imageTitle });
        }
      }}
      style={{
        fontWeight: 700,
        fontSize: 14,
        marginTop: 'auto',
        width: 'fit-content',
        height: 'fit-content',
        padding: '8px 16px',
        color: 'white',
        border: 'none',
        borderRadius: '32px',
        backgroundColor: color,
      }}
    >
      {isExpired ? 'Buy Again' : 'Re-download'}
    </button>
  );
};

export default PurchaseList;
