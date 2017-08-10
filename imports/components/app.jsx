import React from 'react';
import { Provider } from 'react-redux';
import Translator from './translator/translator';
import RegexExample from './regex_example';
import SessionForm from './session/session_form';

export default ({ store }) => (
  <Provider store={store}>
    <main>
      <SessionForm />
      <Translator />
      <RegexExample />
    </main>
  </Provider>
);
