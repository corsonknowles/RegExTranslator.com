var assert = require('assert');

import { srlToRegex, regexToSrl } from '../imports/api/translator';

describe('translation', function() {
  describe('charset', function() {
    it('should translate common charsets', function() {
      assert.equal(regexToSrl("[a-z]"), "letter");
      assert.equal(regexToSrl("[A-Z]"), "uppercase");
      assert.equal(regexToSrl("[0-9]"), "digit");
    });

    it('should translate custom ranges', function() {
      assert.equal(regexToSrl("[d-g]"), "letter from d to g");
      assert.equal(regexToSrl("[S-X]"), "uppercase letter from S to X");
      assert.equal(regexToSrl("[3-6]"), "digit from 3 to 6");
    });

    it('should translate combined ranges', function() {
      assert.equal(regexToSrl("[a-zA-Z0-9%#_]"), "any of (letter, uppercase, digit, one of \"%#_\")");
    });
  });
});
