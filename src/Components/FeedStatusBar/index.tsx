import React from 'react';
import styled from 'styled-components';

import heartIcon from '../../icons/heart.svg';
import ownerIcon from '../../icons/owners.svg';
import visitorIcon from '../../icons/visitors.svg';

const FeedStatusBar = () => {
  return (
    <FeedStatusBarContainer>
      <IconBox>
        <StyledImg src={heartIcon} alt="home" />
        <NumberSpan>123</NumberSpan>
        <LabelSpan>Favorites</LabelSpan>
      </IconBox>
      <IconBox>
        <StyledImg src={ownerIcon} alt="upload" />
        <NumberSpan>55</NumberSpan>
        <LabelSpan>Owners</LabelSpan>
      </IconBox>
      <IconBox>
        <StyledImg src={visitorIcon} alt="profile" />
        <NumberSpan>1512</NumberSpan>
        <LabelSpan>Visitors</LabelSpan>
      </IconBox>
    </FeedStatusBarContainer>
  );
};

const FeedStatusBarContainer = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  margin-top: auto;
  padding: 10px;
  justify-content: space-around;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: white;
`;

const StyledImg = styled.img`
  margin-bottom: 4px;
  aspect-ratio: 1/1;
  height: 18px;
`;

const NumberSpan = styled.span`
  font-size: 14px;
  font-weight: 700;
`;

const LabelSpan = styled.span`
  font-size: 10px;
  opacity: 0.3;
`;

const;

export default FeedStatusBar;
