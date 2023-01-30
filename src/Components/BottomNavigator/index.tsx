import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import homeIcon from '../../icons/home.png';
import homeIconActive from '../../icons/home-active.png';
import uploadIcon from '../../icons/upload.svg';
import profileIcon from '../../icons/profile.png';
import profileIconActive from '../../icons/profile-active.png';

import { baseColor } from '../../styles';

const NavBox = styled(Link)`
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

const BottomNavigator = () => {
  // 현재 상태 받아와서 색칠하기
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '60px',
        marginTop: 'auto',
        justifyContent: 'space-around',
        borderTop: '1px solid #1F1F1F',
        alignItems: 'center',
        paddingTop: '8px',
      }}
    >
      <NavBox to="/main" style={{ color: baseColor.yellow }}>
        <StyledImg src={homeIconActive} alt="home" style={{ width: '20px' }} />
        <span style={{ fontSize: 10 }}>Home</span>
      </NavBox>
      <NavBox to="/upload-image">
        <StyledImg src={uploadIcon} alt="upload" style={{ width: '28px' }} />
        <span style={{ fontSize: 10 }}>Upload</span>
      </NavBox>
      <NavBox to="/profile">
        <StyledImg src={profileIcon} alt="profile" style={{ height: '20px' }} />
        <span style={{ fontSize: 10 }}>Profile</span>
      </NavBox>
    </div>
  );
};

export default BottomNavigator;
