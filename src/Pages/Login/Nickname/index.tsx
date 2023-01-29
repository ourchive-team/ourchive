import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { LargeButton, StyledInput } from '../../../styles';
import YellowBottomNavigator from '../../../Components/YellowBottomNavigator';
import { loginState } from '../../../states/loginState';

const Nickname = () => {
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [userNickname, setUserNickname] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);

  const nav = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <span style={{ textAlign: 'center', fontSize: '18px', height: '50px', padding: '16px' }}>Nickname</span>
      <div style={{ display: 'flex', flexDirection: 'column', padding: '16px' }}>
        <span style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Nickname</span>
        <StyledInput
          value={userNickname}
          placeholder="Put Nickname"
          onChange={e => setUserNickname(e.target.value)}
          onBlur={e => {
            if (e.target.value) {
              setIsAvailable(true);
            } else {
              setIsAvailable(false);
            }
          }}
        />
        <span style={{ fontSize: '11px', paddingTop: '16px', color: 'rgba(255,255,255,0.5)' }}>
          {isAvailable
            ? '* Nickname is available'
            : '* Username must contain between 4~64 characters (letters or numbers), but cannot contain spaces or diacritics. Symbols are not allowed.'}
        </span>
      </div>
      <YellowBottomNavigator>
        <LargeButton
          disabled={!isAvailable}
          style={{ backgroundColor: isAvailable ? 'black' : '#8E8E8E' }}
          onClick={() => {
            setIsLogin({ isLogin: true });
            nav('/main');
          }}
        >
          Go to Ourchive
        </LargeButton>
      </YellowBottomNavigator>
    </div>
  );
};

export default Nickname;
