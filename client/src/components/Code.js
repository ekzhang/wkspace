import React from 'react';
import './Code.css';

function Code({ value }) {
  return (
    <pre className="code-element"><code>{value}</code></pre>
  );
}

export default Code;
