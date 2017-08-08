import React from 'react';
import { Provider } from 'react-redux';
import Translator from './translator/translator';
import RegexExample from './regex_example';
import SessionForm from './session_modal/session_form';
import { PatternDropdownContainer } from
'./translator/pattern_dropdown_container';

// <Header />
// <SessionModal />

export default ({ store }) => (
  <Provider store={store}>
    <main>
      <SessionForm />
      <Translator />
      <PatternDropdownContainer />
      <RegexExample />

    </main>
  </Provider>
);
