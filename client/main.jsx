import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { srlToRegex } from '../imports/api/translator';

import App from '../imports/components/app.jsx';
import configureStore from '../imports/store/store';

window.srlToRegex = srlToRegex;

Meteor.startup(() => {
  const store = configureStore();

  render(<App store={store} />, document.getElementById('root'));
});
