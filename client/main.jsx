import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { srlToRegex, regexToSrl } from '../imports/api/translator';

import App from '../imports/components/app.jsx';
import configureStore from '../imports/store/store';
import '../imports/startup/accounts-config.js';
import '../imports/api/regexs.js';

window.srlToRegex = srlToRegex;
window.regexToSrl = regexToSrl;

Meteor.startup(() => {
  const store = configureStore();
  render(<App store={store} />, document.getElementById('root'));
});
