import React from 'react';
import { Provider } from 'react-redux';
import Translator from './translator/translator';
import RegexExample from './regex_example';
import SessionForm from './session/session_form';

export default ({ store }) => (
  <Provider store={store}>
    <div className="app">
      <header>
        <SessionForm />
      </header>

      <main>
        <Translator />
        <RegexExample />
      </main>
    </div>
  </Provider>
);
