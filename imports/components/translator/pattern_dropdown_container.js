import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import PatternDropdown from './pattern_dropdown';
import { Regexs } from '../../api/regexs';

//createContainer is a react-meteor-data method which wraps our
//component in a container that can subscribe to publications
export const PatternDropdownContainer = createContainer( () => {
  //Subscribe to the 'Regexs' publication (holds all our public and
  //user-specific regex patterns)
  const patternsHandle = Meteor.subscribe('regexs.public');
  return {
    patterns: Regexs.find().fetch()
  };
}, PatternDropdown);
