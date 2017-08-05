import React from 'react';

export default () => (
  <div className="translator">
    <div>
      {
        Array(3).fill(null).map(() => (
          <textarea />
        ))
      }
    </div>
  </div>
);
