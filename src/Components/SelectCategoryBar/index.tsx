import React from 'react';
import styled from 'styled-components';

const CategoryBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 10px;
  gap: 8px;

  width: fit-content;
  height: 32px;

  /* Gray 300 */

  background: #f2f2f2;
  border-color: transparent;
  border-radius: 8px;

  margin-right: 10px;

  font-weight: 400;
  font-size: 14px;
  color: #666666;

  :nth-last-child {
    margin-right: 0px;
  }
`;

interface ISelectCategoryBarData {
  data: string[];
}

const SelectCategoryBar = ({ data }: ISelectCategoryBarData) => {
  return (
    <div style={{ display: 'flex', width: '100%', height: '52px', overflowX: 'scroll', padding: '10px 20px' }}>
      {data.map(el => {
        return <CategoryBtn>{el}</CategoryBtn>;
      })}
    </div>
  );
};

export default SelectCategoryBar;
