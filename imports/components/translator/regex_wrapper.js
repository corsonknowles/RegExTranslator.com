import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import RegexInput from './regex_input.jsx';
import { Regexs } from '../../api/regexs';

//createContainer is a react-meteor-data method which wraps our
//component in a container that can subscribe to publications
export const RegexWrapper = createContainer( () => {
  //Subscribe to the 'Regexs' publication (holds all our public and
  //user-specific regex patterns)
  const patternsHandle = Meteor.subscribe('regexs.public');
  return {
    patterns: Regexs.find().fetch(),
    publicPatterns: patternsHandle
  };
}, RegexInput);
