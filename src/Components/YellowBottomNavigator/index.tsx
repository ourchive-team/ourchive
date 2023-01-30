import React from 'react';
import { baseColor, LargeButton } from '../../styles';

interface IYellowBottomNavigator {
  children?: JSX.Element;
  style?: {
    box?: any;
    bar?: any;
  };
  fixed?: boolean;
}

const YellowBottomNavigator = ({ children, style, fixed }: IYellowBottomNavigator) => {
  return (
    <div
      style={{
        display: 'flex',
        marginTop: 'auto',
        height: 'fit-content',
        padding: '16px 16px 0px',
        width: '100%',
        flexDirection: 'column',
        backgroundColor: baseColor.yellow,
        ...style?.box,
      }}
    >
      {children}
      <div
        style={{
          width: '134px',
          height: '5px',
          margin: '21px auto 8px',
          backgroundColor: 'black',
          borderRadius: '100px',
          ...style?.bar,
        }}
      />
    </div>
  );
};

export default YellowBottomNavigator;
