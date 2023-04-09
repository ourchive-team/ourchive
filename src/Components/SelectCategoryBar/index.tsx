import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { baseColor } from '../../styles';

interface ISelectCategoryBarData {
  data: string[];
}

const SelectCategoryBar = ({ data }: ISelectCategoryBarData) => {
  const colorCode = Object.values(baseColor);
  const random = Math.floor(Math.random() * colorCode.length - 1);

  const [selected, setSelected] = useState(0);
  const [randomColorCode, setRandomColorCode] = useState(colorCode);

  useEffect(() => {
    let colorCount = 0;
    const randomCode = colorCode.map((el, i) => {
      const isOver = random + i > colorCode.length - 1;
      if (colorCount > colorCode.length - 1) colorCount = 0;
      if (isOver) colorCount += 1;
      return colorCode[random + i > colorCode.length - 1 ? colorCount : random + i];
    });

    setRandomColorCode(randomCode);
  }, []);

  return (
    <div style={{ display: 'flex', width: '100%', height: '52px', overflowX: 'scroll', padding: '10px 20px' }}>
      {data.map((el, i) => {
        const isSelected = selected === i;
        const selectedOrRandomColor = isSelected ? 'white' : randomColorCode[i];
        return (
          <CategoryBtn
            style={{
              fontWeight: isSelected ? 700 : 400,
              color: isSelected ? 'black' : 'rgba(0,0,0,0.5)',
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

  /* Gray 300 */

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
