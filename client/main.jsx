import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { srlToRegex, regexToSrl } from '../imports/api/translator';

import App from '../imports/components/app';
import configureStore from '../imports/store/store';
import '../imports/startup/accounts-config';
import '../imports/api/regexs';

window.srlToRegex = srlToRegex;
window.regexToSrl = regexToSrl;

Meteor.startup(() => {
  const store = configureStore();
  render(<App store={store} />, document.getElementById('root'));
});
