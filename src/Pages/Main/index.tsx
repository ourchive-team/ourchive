import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { TokenTypes } from 'aptos';
import searchIcon from '../../icons/search-icon.svg';
import banner from '../../images/banner.png';

import SelectCategoryBar from '../../Components/SelectCategoryBar';
import GridImageContainer from '../../Components/GridImageContainer';
import { getAllImageInfoList } from '../../func';
import BottomNavigator from '../../Components/BottomNavigator';
import { PaddingBox } from '../../styles';
import { nicknameState } from '../../states/loginState';
import { TokenItem } from '../../Components/RenderImageList';

const Main = () => {
  const [tokenList, setTokenList] = useState<TokenItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getAllImageInfoList().then(data => {
      setTokenList(data);
      setIsLoading(true);
    });
  }, []);

  const [nickname, setNickname] = useRecoilState(nicknameState);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        overflow: 'auto',
      }}
    >
      <PaddingBox>
        <img style={{ marginLeft: 'auto', marginBottom: '32px' }} src={searchIcon} alt="search" />
        <img src={banner} alt="banner" style={{ marginBottom: '32px' }} />
        <span style={{ fontSize: '20px', marginBottom: '-6px' }}>Projects you`ll love</span>
      </PaddingBox>
      <div style={{ width: '100%' }}>
        <SelectCategoryBar data={['Recommended', 'Lifestyle', 'Future', 'Normal']} />
      </div>
      {/*@ts-ignore:next-line;*/}
      <GridImageContainer itemList={tokenList} skeletonCount={6} routeUrl="/images" />
      <PaddingBox style={{ marginTop: 'auto' }}>
        <BottomNavigator />
      </PaddingBox>
    </div>
  );
};

export default Main;
