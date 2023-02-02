import React from 'react';
import RenderImageList, { IRenderImageList } from '../RenderImageList';

const GridImageContainer = ({ itemList, routeUrl, favorite, hideDetails, skeletonCount, style }: IRenderImageList) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      }}
    >
      <RenderImageList
        itemList={itemList}
        routeUrl={routeUrl}
        favorite={favorite}
        hideDetails={hideDetails}
        skeletonCount={skeletonCount}
        style={style}
      />
    </div>
  );
};

export default GridImageContainer;
