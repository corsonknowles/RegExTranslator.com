import React from 'react';
import { Provider } from 'react-redux';
import Translator from './translator';
import RegexExample from './regex_example';
import SessionForm from './session_modal/session_form';

// <Header />
// <SessionModal />

export default ({ store }) => (
  <Provider store={store}>
    <main>
      <SessionForm />
      <Translator />
      <RegexExample />

    </main>
  </Provider>
);
