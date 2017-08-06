import React from 'react';
import { Provider } from 'react-redux';
import Translator from './Translator';

// <Header />
// <DisplayBox />
// <ResultBox />
// <SessionModal />

export default ({ store }) => (
  <Provider store={store}>
    <main>
      <Translator />
    </main>
  </Provider>
);
