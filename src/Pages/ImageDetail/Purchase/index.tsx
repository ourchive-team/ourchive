import React, { useState } from 'react';
import { LargeButton, PaddingBox, StyledInput } from '../../../styles';
import TopNavigator from '../../../Components/TopNavigator';
import Resolution, { IResolutionList } from '../../../Components/Resolution';
import YellowBottomNavigator from '../../../Components/YellowBottomNavigator';
import { buyImage } from '../../../func';

const BuyNFT = () => {
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
      resolution: '4000x2500',
      dpi: '300',
      format: 'jpg',
      value: 1,
    },
    {
      size: 'SMALL',
      resolution: '4000x2500',
      dpi: '300',
      format: 'jpg',
      value: 1,
    },
  ];

  const [selectedSize, setSelectedSize] = useState<IResolutionList>();
  const [periodDay, setPeriodDay] = useState('');

  const requestReady = selectedSize && periodDay && Number(periodDay) > 0;
  const periodNumber = Number.isNaN(Number(periodDay)) ? 0 : Number(periodDay);
  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', flexDirection: 'column' }}>
      <TopNavigator>
        <span>Purchase</span>
      </TopNavigator>

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

      <YellowBottomNavigator>
        <>
          <span style={{ color: 'black', fontSize: '16px', marginBottom: '8px' }}>Total Price</span>
          <div
            style={{
              display: 'flex',
              color: requestReady ? 'black' : '#8E8E8E',
              fontSize: '20px',
              fontWeight: 700,
              marginBottom: '16px',
            }}
          >
            <span>
              {requestReady ? `${selectedSize.value * periodNumber}` : 0}
              &nbsp;
            </span>
            <span>APT</span>
          </div>
          <LargeButton
            disabled={!requestReady}
            onClick={() => buyImage()}
            style={{ backgroundColor: requestReady ? 'black' : '#8E8E8E' }}
          >
            Buy this Image
          </LargeButton>
        </>
      </YellowBottomNavigator>
    </div>
  );
};

export default BuyNFT;
