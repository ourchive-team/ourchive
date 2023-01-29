import React from 'react';
import { LargeButton } from '../../../styles';
import { buyImage } from '../../../func';

const BuyNFT = () => {
  return <LargeButton onClick={() => buyImage()}>Buy this NFT</LargeButton>;
};

export default BuyNFT;
