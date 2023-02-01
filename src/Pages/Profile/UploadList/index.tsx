import React from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

import RenderImageList from '../../../Components/RenderImageList';

import aptosLogo from '../../../icons/aptos.svg';
import { baseColor, PaddingBox } from '../../../styles';
import YellowBottomNavigator from '../../../Components/YellowBottomNavigator';
import TopNavigator from '../../../Components/TopNavigator';

interface ItemList {
  id: string;
  title: string;
  desc: string;
  profit: string;
}

const StyledSpan = styled.span`
  width: 100%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UploadList = () => {
  const itemList: ItemList[] = [
    {
      id: '0x1',
      title: 'A girl in a hot pink hat',
      desc: 'BA in fashion & graphic design tattoo, reiki & the  ..',
      profit: '93.2',
    },
    {
      id: '0x1',
      title: 'A girl in a hot pink hat',
      desc: 'BA in fashion & graphic design tattoo, reiki & the  ..',
      profit: '93.2',
    },
    {
      id: '0x1',
      title: 'A girl in a hot pink hat',
      desc: 'BA in fashion & graphic design tattoo, reiki & the  ..',
      profit: '93.2',
    },
    {
      id: '0x1',
      title: 'A girl in a hot pink hat',
      desc: 'BA in fashion & graphic design tattoo, reiki & the  ..',
      profit: '93.2',
    },
    {
      id: '0x1',
      title: 'A girl in a hot pink hat',
      desc: 'BA in fashion & graphic design tattoo, reiki & the  ..',
      profit: '93.2',
    },
    {
      id: '0x1',
      title: 'A girl in a hot pink hat',
      desc: 'BA in fashion & graphic design tattoo, reiki & the  ..',
      profit: '93.2',
    },
  ];

  const nav = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TopNavigator>
        <span>Upload List</span>
      </TopNavigator>
      <PaddingBox>
        {itemList.map(el => {
          return (
            <div
              onClick={() => nav(`/images/${el.id}`)}
              style={{
                display: 'flex',
                marginBottom: '20px',
                border: '1px solid white',
                borderRadius: '16px',
                height: 'fit-content',
              }}
            >
              <RenderImageList itemList={[]} routeUrl="/Images" skeletonWidth={100} skeletonHeight={100} hideDetails />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '16px 16px 16px 0px',
                  height: '140px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <StyledSpan style={{ fontWeight: 700, fontSize: '15px', whiteSpace: 'nowrap' }}>{el.title}</StyledSpan>
                <StyledSpan
                  style={{
                    fontWeight: 400,
                    fontSize: '12px',
                    width: '100%',
                    margin: '8px 0px',
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  {el.desc}
                </StyledSpan>

                <div style={{ display: 'flex', alignItems: 'center', marginTop: 'auto' }}>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginRight: '8px' }}>
                    My profit
                  </span>
                  <span style={{ fontWeight: 700, color: baseColor.yellow }}>{el.profit}</span>
                  <img
                    src={aptosLogo}
                    alt="apt_logo"
                    style={{ borderRadius: '50%', marginLeft: '4px', width: '16px', height: '16px' }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </PaddingBox>
      <YellowBottomNavigator
        style={{
          box: { position: 'fixed', left: 0, bottom: 0, backgroundColor: 'black', zIndex: 2, paddingTop: '0px' },
          bar: { backgroundColor: 'white' },
        }}
      />
    </div>
  );
};

export default UploadList;
