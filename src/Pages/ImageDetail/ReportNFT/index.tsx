import React from 'react';
import { LargeButton } from '../../../styles';
import { reportNFT } from '../../../func';

const ReportNFT = () => {
  //request for proof
  return <LargeButton onClick={() => reportNFT()}>Request for Prove</LargeButton>;
};

export default ReportNFT;
