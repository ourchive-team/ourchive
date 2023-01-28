import React from 'react';
import { LargeButton } from '../../../styles';
import { buyNFT } from '../../../func';

const BuyNFT = () => {
  return <LargeButton onClick={() => buyNFT()}>Buy this NFT</LargeButton>;
};

export default BuyNFT;
