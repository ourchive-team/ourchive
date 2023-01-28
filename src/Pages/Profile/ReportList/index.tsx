import React from 'react';
import { LargeButton } from '../../../styles';
import { proveNFT } from '../../../func';

const ReportList = () => {
  return <LargeButton onClick={() => proveNFT()}>Prove NFT</LargeButton>;
};

export default ReportList;
