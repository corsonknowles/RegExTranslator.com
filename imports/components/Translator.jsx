import React from 'react';
import SrlInput from './translator/srl_input';
import RegexInput from './translator/regex_input';

export default () => (
  <div className="translator">
    <SrlInput />
    <RegexInput />
  </div>
);
