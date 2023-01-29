import React from 'react';
import { LargeButton } from '../../../styles';
import { reportImage } from '../../../func';

const ReportNFT = () => {
  //request for proof
  return <LargeButton onClick={() => reportImage()}>Request for Prove</LargeButton>;
};

export default ReportNFT;
