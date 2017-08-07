import React from 'react';
import { Provider } from 'react-redux';
import Translator from './translator';
import RegexExample from './regex_example';

// <Header />
// <SessionModal />

export default ({ store }) => (
  <Provider store={store}>
    <main>
      <Translator />
      <RegexExample />
    </main>
  </Provider>
);
