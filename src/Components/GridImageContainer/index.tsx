import React from 'react';
import RenderImageList, { IRenderImageList } from '../RenderImageList';

const GridImageContainer = ({ itemList, routeUrl, hideDetails, skeletonWidth, skeletonHeight }: IRenderImageList) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, auto))',
      }}
    >
      <RenderImageList
        itemList={itemList}
        routeUrl={routeUrl}
        hideDetails={hideDetails}
        skeletonWidth={skeletonHeight}
        skeletonHeight={skeletonHeight}
      />
    </div>
  );
};

export default GridImageContainer;
