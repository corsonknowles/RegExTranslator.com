import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const Regexs = new Mongo.Collection('regexs');

Meteor.methods({
  'regexs.fetch'() { return Regexs.find({
    userId: {$exists: false}
    }).fetch(); },
  'regexs.insert'(data) { return Regexs.insert(data); },
});


export default Regexs;
//
// //N.B. these publish callbacks need to use the function() {} form rather
// //than ES2015 fat arrows () => {}. Otherwise, we won't get the right context
// //on "this."
// if (Meteor.isServer) {
//   Meteor.publish('regexs.public', function() {
//     //Find and subscribe to all regexs that are publically available -
//     //i.e., not associated with a specific user
//     return Regexs.find({
//       userId: {$exists: false}
//     }, {
//       fields: Regexs.pattern
//     });
//   });
//
//   Meteor.publish('regexs.private', function() {
//     //If the current user's id doesn't match...
//     if (!this.userId) {
//       //Indicate to the subscription that we've sent all the data we're
//       //initially going to send (i.e., none)
//       return this.ready();
//     }
//     //else return all regexs associated with the current user
//     return Regexs.find({
//       userId: this.userId
//     }, {
//       fields: Regexs.pattern
//     });
//   });
// }
