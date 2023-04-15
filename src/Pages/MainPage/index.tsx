import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import searchIcon from '../../icons/search-icon-black.svg';

import SelectCategoryBar from '../../Components/SelectCategoryBar';
import ImageGridWrapper from '../../Components/ImageComponents/ImageGridWrapper';
import BottomContainer from '../../Components/NavigatorComponents/BottomContainer';
import BottomNavigator from '../../Components/NavigatorComponents/BottomNavigator';

import { onchain } from '../../func';
import { baseColor, PaddingBox } from '../../styles';
import { nicknameState } from '../../states/loginState';
import { TokenItem } from '../../Components/ImageComponents/ImageSkeletonRenderer';

const MainPage = () => {
  const [tokenList, setTokenList] = useState<TokenItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    onchain.getAllImageInfoList().then(data => {
      setTokenList(data);
      setIsLoading(true);
    });
  }, []);

  const [nickname, setNickname] = useRecoilState(nicknameState);

  return (
    <MainWrapper>
      <PaddingBox>
        <img style={{ marginLeft: 'auto', marginBottom: '32px', cursor: 'pointer' }} src={searchIcon} alt="search" />
        <span style={{ fontSize: '20px', marginBottom: '-6px' }}>Projects you`ll love</span>
      </PaddingBox>
      <div style={{ width: '100%' }}>
        <SelectCategoryBar data={['Recommended', 'Lifestyle', 'Future', 'Normal']} />
      </div>
      {/*@ts-ignore:next-line;*/}
      <ImageGridWrapper
        itemList={tokenList}
        skeletonCount={6}
        routeUrl="/images"
        favorite
        style={{ wrapper: { width: '100%' } }}
      />
      <BottomContainer style={{ backgroundColor: baseColor.beige }}>
        <BottomNavigator selectedMenu="home" />
      </BottomContainer>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

export default MainPage;
