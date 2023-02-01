import React from 'react';

import RenderImageList from '../../../Components/RenderImageList';
import { buyImage, downloadImage } from '../../../func';

const PurchaseList = () => {
  const requiredData = [
    { id: '0x1', imgUrl: '/', title: 'Two people standing', description: 'desc', expireDate: 30 },
    { id: '0x1', imgUrl: '/', title: 'Two people standing', description: 'desc', expireDate: 2 },
    { id: '0x1', imgUrl: '/', title: 'Two people standing', description: 'desc', expireDate: 0 },
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
            <RenderImageList itemList={[]} routeUrl="/Images" skeletonWidth={100} skeletonHeight={100} hideDetails />

            <div style={{ display: 'flex', width: '100%', flexDirection: 'column', padding: '16px 16px 16px 0px' }}>
              <span style={{ fontWeight: 700, fontSize: '14px' }}>{el.title}</span>
              <span style={{ fontWeight: 400, fontSize: '12px' }}>{el.description}</span>

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
                    onClick={() => downloadImage()}
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
                      buyImage({
                        id: 'hi',
                        size: 1,
                        creator: 'asdf',
                        imageTitle: 'asdf',
                        expiry: 0,
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
