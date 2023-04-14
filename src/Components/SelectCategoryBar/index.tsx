import React, { useState } from 'react';
import styled from 'styled-components';

interface ISelectCategoryBarData {
  data: string[];
}

const colorCode = ['#E7CFB6', '#A7CCC5', '#E6B86B', '#D57368'];

const SelectCategoryBar = ({ data }: ISelectCategoryBarData) => {
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ display: 'flex', width: '100%', height: '52px', overflowX: 'scroll', padding: '10px 20px' }}>
      {data.map((el, i) => {
        const isSelected = selected === i;
        const selectedOrRandomColor = isSelected ? 'black' : colorCode[i];
        return (
          <CategoryBtn
            style={{
              fontWeight: isSelected ? 700 : 400,
              color: isSelected ? 'white' : 'rgba(255,255,255,0.8)',
              backgroundColor: selectedOrRandomColor,
            }}
            onClick={() => setSelected(i)}
          >
            {el}
          </CategoryBtn>
        );
      })}
    </div>
  );
};

const CategoryBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 10px;
  gap: 8px;

  width: fit-content;
  height: 32px;

  background: #f2f2f2;
  border-color: transparent;
  border-radius: 40px;

  margin-right: 10px;

  font-weight: 400;
  font-size: 12px;
  color: #666666;

  :nth-last-child {
    margin-right: 0px;
  }
`;

export default SelectCategoryBar;
