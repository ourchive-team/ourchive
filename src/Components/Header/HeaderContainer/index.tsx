import React from 'react';

interface IHeader {
  children: JSX.Element;
}

const Header = ({ children }: IHeader) => (
  <header style={{ display: 'flex', padding: '18px', backgroundColor: '#F2F2F2' }}>{children}</header>
);

export default Header;
