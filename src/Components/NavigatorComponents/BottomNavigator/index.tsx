import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import homeIcon from '../../../icons/home.svg';
import homeIconActive from '../../../icons/homeActive.svg';
import uploadIcon from '../../../icons/upload.svg';
import profileIcon from '../../../icons/profile.svg';
import profileIconActive from '../../../icons/profileActive.svg';

import { baseColor } from '../../../styles';

const BottomNavigator = ({ selectedMenu }: { selectedMenu: string }) => {
  return (
    <BottomNavContainer>
      <NavBox to="/main">
        <StyledImage src={selectedMenu === 'home' ? homeIconActive : homeIcon} alt="home" />
        <StyledSpan>Home</StyledSpan>
      </NavBox>
      <NavBox to="/upload-image">
        <StyledImage src={uploadIcon} alt="upload" />
        <StyledSpan>Upload</StyledSpan>
      </NavBox>
      <NavBox to="/profile">
        <StyledImage src={selectedMenu === 'profile' ? profileIconActive : profileIcon} alt="profile" />
        <StyledSpan>Profile</StyledSpan>
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
  background-color: ${baseColor.beige};
  justify-content: space-around;
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
  width: 20px;
  margin-bottom: 4px;
  aspect-ratio: 1/1;
`;

const StyledSpan = styled.span`
  font-size: 10px;
  color: black;
`;

export default BottomNavigator;
