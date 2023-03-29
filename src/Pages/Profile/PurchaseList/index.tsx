import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import RenderImageList from '../../../Components/RenderImageList';
import { onchain } from '../../../func';
import { downloadFromIPFS } from '../../../func/ipfs';
import { TokenPurchaseItem } from '../../../func/type';
import { addressState } from '../../../states/loginState';

const PurchaseList = () => {
  const [purchaseList, setPurchaseList] = useState<TokenPurchaseItem[]>([]);
  const [address, setAddress] = useRecoilState(addressState);
  const addressString = address;

  useEffect(() => {
    onchain.getPurchasedImageList(addressString).then(data => {
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
            <RenderImageList itemList={[]} routeUrl="/Images" skeletonWidth={100} skeletonHeight={100} hideDetails />

            <div style={{ display: 'flex', width: '100%', flexDirection: 'column', padding: '16px 16px 16px 0px' }}>
              <span style={{ fontWeight: 700, fontSize: '14px' }}>{el.token.name}</span>
              <span style={{ fontWeight: 400, fontSize: '12px' }}>DESCRIPTION HERE</span>

              {el.expireDate > 0 ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        backgroundColor: '#029C54',
                        borderRadius: '50%',
                        marginRight: '4px',
                      }}
                    />
                    <span style={{ color: '#029C54', fontWeight: 400, fontSize: '12px' }}>{`D-${el.expireDate}`}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      downloadFromIPFS({ imageUri: el.token.uri, imageTitle: el.token.name });
                    }}
                    style={{
                      marginLeft: 'auto',
                      marginTop: 'auto',
                      width: 'fit-content',
                      height: 'fit-content',
                      padding: '8px 16px',
                      border: '1px solid white',
                      borderRadius: '16px',
                      backgroundColor: 'transparent',
                      color: 'white',
                    }}
                  >
                    Download
                  </button>
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        backgroundColor: '#F55B1D',
                        borderRadius: '50%',
                        marginRight: '4px',
                      }}
                    />
                    <span style={{ color: '#F55B1D', fontWeight: 400, fontSize: '12px' }}>Expired</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onchain.buyImage({
                        size: 1,
                        creator: el.token.creator,
                        creatorNickname: el.token.creatorNickname,
                        imageTitle: el.token.name,
                        expiry: 99999999999, // FIXME
                      });
                    }}
                    style={{
                      color: 'white',
                      marginLeft: 'auto',
                      marginTop: 'auto',
                      width: 'fit-content',
                      height: 'fit-content',
                      padding: '8px 16px',
                      border: '1px solid black',
                      borderRadius: '16px',
                      backgroundColor: '#F55B1D',
                    }}
                  >
                    Buy Again
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PurchaseList;
