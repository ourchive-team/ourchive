import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import React from 'react';

interface IRenderSkeleton {
  skeletonWidth?: number;
  skeletonHeight?: number;
}

const RenderSkeleton = ({ skeletonWidth, skeletonHeight }: IRenderSkeleton) => {
  return (
    <SkeletonTheme baseColor="#1F1F29" highlightColor="#3F3E3F" borderRadius="8px">
      <Skeleton width={skeletonWidth || 136} height={skeletonHeight || 143} />
    </SkeletonTheme>
  );
};

export default RenderSkeleton;
