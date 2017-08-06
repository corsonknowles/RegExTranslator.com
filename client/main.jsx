import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/components/App.jsx';
import configureStore from '../imports/store/store';

Meteor.startup(() => {
  const store = configureStore();

  render(<App store={store} />, document.getElementById('root'));
});
