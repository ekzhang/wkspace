import React from 'react';

function Spacer({ width }) {
  return <div style={{ marginLeft: (width || 'auto') }}></div>;
}

export default Spacer;
