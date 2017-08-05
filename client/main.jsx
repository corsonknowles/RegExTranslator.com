import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

/* Testing purposes only */
import { srlToRegex } from '../imports/api/translator';
window.srlToRegex = srlToRegex;
/* --------------------- */

import App from '../imports/ui/App.jsx';

Meteor.startup(() => {
  render(<App />, document.getElementById('root'));
});
