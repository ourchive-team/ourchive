import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import homeIconActive from '../../../icons/home-active.png';
import uploadIcon from '../../../icons/upload.svg';
import profileIcon from '../../../icons/profile.png';
import profileIconActive from '../../../icons/profile-active.png';

import { baseColor } from '../../../styles';

const BottomNavigator = () => {
  return (
    <BottomNavContainer>
      <NavBox to="/main" style={{ color: baseColor.yellow }}>
        <StyledImage src={homeIconActive} alt="home" style={{ width: '20px' }} />
        <span style={{ fontSize: 10 }}>Home</span>
      </NavBox>
      <NavBox to="/upload-image">
        <StyledImage src={uploadIcon} alt="upload" style={{ width: '28px' }} />
        <span style={{ fontSize: 10 }}>Upload</span>
      </NavBox>
      <NavBox to="/profile">
        <StyledImage src={profileIcon} alt="profile" style={{ height: '20px' }} />
        <span style={{ fontSize: 10 }}>Profile</span>
      </NavBox>
    </BottomNavContainer>
  );
};

const BottomNavContainer = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  margin-top: auto;
  position: sticky;
  background-color: black;
  justify-content: space-around;
  border-top: 1px solid #1f1f1f;
  align-items: center;
  z-index: 9;
  padding-top: 8px;
`;

const NavBox = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: white;
`;

const StyledImage = styled.img`
  margin-bottom: 4px;
  aspect-ratio: 1/1;
`;

export default BottomNavigator;
