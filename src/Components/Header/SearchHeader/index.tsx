import React from 'react';
import styled from 'styled-components';

const HeaderSearchInput = styled.input`
  height: 24px;
  background-color: transparent;
  color: black;
  border: none;
`;

const SearchFilterBox = styled.div`
  width: fit-content;
  margin-left: auto;
`;

const SearchHeader = () => {
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <HeaderSearchInput value="Ourchive" />
      <SearchFilterBox>
        <span>S | </span>
        <span>F</span>
      </SearchFilterBox>
    </div>
  );
};

export default SearchHeader;
