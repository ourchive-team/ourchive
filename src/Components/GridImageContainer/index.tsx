import React from 'react';
import RenderImageList, { IRenderImageList } from '../RenderImageList';

const GridImageContainer = ({ itemList, routeUrl, hideDetails, skeletonCount }: IRenderImageList) => {
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
        hideDetails={hideDetails}
        skeletonCount={skeletonCount}
      />
    </div>
  );
};

export default GridImageContainer;
