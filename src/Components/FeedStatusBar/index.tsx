import React from 'react';
import styled from 'styled-components';

import heartIcon from '../../icons/heart.svg';
import ownerIcon from '../../icons/owners.svg';
import visitorIcon from '../../icons/visitors.svg';

const FeedStatusBar = () => {
  return (
    <FeedStatusBarContainer>
      <IconBox>
        <StyledImg src={heartIcon} alt="home" style={{ width: '18px' }} />
        <span style={{ fontSize: 14, fontWeight: 700 }}>123</span>
        <span style={{ fontSize: 10, opacity: 0.3 }}>Favorites</span>
      </IconBox>
      <IconBox>
        <StyledImg src={ownerIcon} alt="upload" style={{ width: '18px' }} />
        <span style={{ fontSize: 14, fontWeight: 700 }}>55</span>
        <span style={{ fontSize: 10, opacity: 0.3 }}>Owners</span>
      </IconBox>
      <IconBox>
        <StyledImg src={visitorIcon} alt="profile" style={{ height: '18px' }} />
        <span style={{ fontSize: 14, fontWeight: 700 }}>1512</span>
        <span style={{ fontSize: 10, opacity: 0.3 }}>Visitors</span>
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
`;

export default FeedStatusBar;
