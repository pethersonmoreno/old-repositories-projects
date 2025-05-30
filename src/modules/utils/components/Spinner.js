import React from 'react';
import SyncLoader from 'react-spinners/ClipLoader';

const Spinner = () => (
  <div style={{ fill: true }}>
    <div
      style={{
        flex: 1,
        align: 'center',
        justify: 'center',
      }}
    >
      <SyncLoader
        sizeUnit="px"
        size={150}
        color="#123abc"
        loading
      />
    </div>
  </div>
);

export default Spinner;
