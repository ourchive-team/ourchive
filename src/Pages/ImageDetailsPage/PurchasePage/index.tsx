import React, { useState } from 'react';
import { baseColor, LargeButton, PaddingBox, StyledInput, StyledSpan } from '../../../styles';
import TopNavigator from '../../../Components/NavigatorComponents/TopNavigator';
import Resolution, { IResolutionList } from '../../../Components/Resolution';
import BottomContainer from '../../../Components/NavigatorComponents/BottomContainer';
import { onchain } from '../../../func';

const PurchasePage = () => {
  const pathItems = window.location.pathname.split('/');
  const creatorAddress = pathItems[3].replace(/%20/g, ' ');
  const nickname = pathItems[4].replace(/%20/g, ' ');
  const imageTitle = pathItems[5].replace(/%20/g, ' ');
  console.log({ creatorAddress, nickname, imageTitle });

  const resolutionList = [
    {
      size: 'LARGE',
      resolution: '4000x2500',
      dpi: '300',
      format: 'jpg',
      value: 1,
    },
    {
      size: 'MEDIUM',
      resolution: '1000x625',
      dpi: '300',
      format: 'jpg',
      value: 0.007,
    },
    {
      size: 'SMALL',
      resolution: '500x500',
      dpi: '300',
      format: 'jpg',
      value: 0.005,
    },
  ];

  const [selectedSize, setSelectedSize] = useState<IResolutionList>();
  const [periodDay, setPeriodDay] = useState('');

  const requestReady = selectedSize && periodDay && Number(periodDay) > 0;
  const periodNumber = Number.isNaN(Number(periodDay)) ? 0 : Number(periodDay);
  const expiryTimestamp = Math.floor(Date.now() / 1000) + periodNumber * 24 * 60 * 60;

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', flexDirection: 'column' }}>
      <TopNavigator>
        <span>Purchase</span>
      </TopNavigator>
      x
      <PaddingBox style={{ padding: '0px 16px', marginBottom: '-8px' }}>
        <span style={{ fontSize: '20px', fontWeight: 700, marginTop: '24px' }}>Resolution / Size</span>
      </PaddingBox>
      <Resolution list={resolutionList} selectedSize={selectedSize?.size} selector={setSelectedSize} />
      <PaddingBox style={{ padding: '0px 16px' }}>
        <span style={{ fontSize: '20px', fontWeight: 700, marginTop: '24px' }}>Period of Ownership</span>
        <div style={{ display: 'flex', height: '50px', alignItems: 'center', marginTop: '16px' }}>
          <StyledInput
            type="number"
            placeholder="1 to 1000"
            style={{ width: '100%', padding: '10px' }}
            value={periodDay}
            onChange={e => {
              const value = Number(e.target.value);
              if (value < 0) {
                setPeriodDay('');
              } else {
                setPeriodDay(e.target.value);
              }
            }}
          />
          <span style={{ fontSize: '16px', padding: '16px' }}>day</span>
        </div>
      </PaddingBox>
      <BottomContainer style={{ backgroundColor: baseColor.beige }}>
        <>
          <span style={{ color: 'black', fontSize: '16px', marginBottom: '8px' }}>Total Price</span>
          <div
            style={{
              display: 'flex',
              color: requestReady ? 'black' : '#8E8E8E',
              fontSize: '20px',
              fontWeight: 700,
              marginBottom: '16px',
              alignItems: 'center',
            }}
          >
            <span>
              {requestReady ? `${selectedSize.value * periodNumber}` : 0}
              &nbsp;
            </span>
            <span>ETH</span>
            {requestReady && (
              <StyledSpan style={{ fontSize: '13px', height: 'fit-content', marginLeft: '4px' }}>
                {`(${selectedSize.value}ETH x ${periodNumber} days)`}
              </StyledSpan>
            )}
          </div>
          <LargeButton
            disabled={!requestReady}
            onClick={() => {
              onchain.buyImage({
                size: Number(selectedSize?.dpi),
                creator: creatorAddress,
                creatorNickname: nickname,
                imageTitle,
                expiry: expiryTimestamp,
              });
            }}
            style={{ backgroundColor: requestReady ? 'black' : '#8E8E8E' }}
          >
            Buy this Image
          </LargeButton>
        </>
      </BottomContainer>
    </div>
  );
};

export default PurchasePage;
