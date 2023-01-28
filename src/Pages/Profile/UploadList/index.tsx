import React from 'react';
import RenderImageList from '../../../Components/RenderImageList';

const UploadList = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '16px' }}>
      <div style={{ display: 'flex', border: '1px solid white', borderRadius: '16px' }}>
        <RenderImageList
          itemList={[{ id: '0x' }]}
          routeUrl="/Images"
          skeletonWidth={100}
          skeletonHeight={100}
          hideDetails
        />
        <div style={{ display: 'flex', flexDirection: 'column', padding: '16px 16px 16px 0px' }}>
          <span style={{ fontWeight: 700, fontSize: '14px' }}>Title</span>
          <span style={{ fontWeight: 400, fontSize: '12px' }}>Description</span>

          <div style={{ display: 'flex', marginTop: 'auto' }}>
            <span style={{ marginRight: '24px' }}>93.2</span>
            <span>432</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadList;
