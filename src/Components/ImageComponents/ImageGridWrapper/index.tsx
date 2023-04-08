import React from 'react';
import ImageSkeletonRenderer, { IImageSkeletonRenderer } from '../ImageSkeletonRenderer';

const ImageGridWrapper = ({
  itemList,
  routeUrl,
  favorite,
  hideDetails,
  skeletonCount,
  style,
}: IImageSkeletonRenderer) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      }}
    >
      <ImageSkeletonRenderer
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

export default ImageGridWrapper;
