import SRL from 'srl';
const assert = require('assert');

import { srlToRegex, regexToSrl } from '../imports/api/translator';

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});

describe('translate pieces', function() {
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

    it('should handle negative charsets', function() {
      assert.equal(regexToSrl("[^3-6]"), "raw [^3-6]");
      assert.equal(regexToSrl("[^ABC]"), "raw [^ABC]");

    });

    it('should translate combined ranges', function() {
      assert.equal(regexToSrl("[a-zA-Z0-9%#_]"), "any of (letter, uppercase, digit, one of \"%#_\")");
    });
  });

  describe('quantifiers', function() {
    it('should handle basic quantifiers', function() {
      assert.equal(regexToSrl("[a-z]+"), "letter, once or more");
      assert.equal(regexToSrl("[A-Z]*"), "uppercase, never or more");
      assert.equal(regexToSrl("[0-9]?"), "digit, optional");
    });

    it('should handle numeric quantifiers', function() {
      assert.equal(regexToSrl("[a-z]{1}"), "letter, once");
      assert.equal(regexToSrl("[A-Z]{2}"), "uppercase, twice");
      assert.equal(regexToSrl("[0-9]{3}"), "digit, exactly 3 times");
      assert.equal(regexToSrl("[0-9]{3,}"), "digit, at least 3 times");
      assert.equal(regexToSrl("[0-9]{3,10}"), "digit, between 3 and 10 times");
    });
  });

  describe('boundaries', function() {
    it('should detect start and end of regex', function() {
      assert.equal(regexToSrl("^[a-z]"), "begin with, letter");
      assert.equal(regexToSrl("[a-z]$"), "letter, must end");
      assert.equal(regexToSrl("^[a-z]$"), "begin with, letter, must end");
    });
  });

  describe('escaped and literal characters', function() {
    it('should translate common literals', function() {
      assert.equal(regexToSrl("\\s"), "whitespace");
      assert.equal(regexToSrl("\\S"), "no whitespace");
      assert.equal(regexToSrl("\\d"), "digit");
      assert.equal(regexToSrl("\\D"), "raw [^0-9]");
      assert.equal(regexToSrl("\\w"), "any character");
      assert.equal(regexToSrl("\\W"), "no character");

      assert.equal(regexToSrl("\\b"), "raw \\b");
      assert.equal(regexToSrl("\\t"), "tab");
      assert.equal(regexToSrl("\\r"), "raw \\r");
      assert.equal(regexToSrl("\\n"), "new line");
    });

    it('should translate escaped characters', function() {
      assert.equal(regexToSrl("\\("), "literally \"(\"");
      assert.equal(regexToSrl("\\^"), "literally \"^\"");
      assert.equal(regexToSrl("\\$"), "literally \"$\"");
      assert.equal(regexToSrl("\\."), "literally \".\"");
    });
  });

  describe('groups', function() {
    describe('capturing', function() {
      it('should handle capturing', function() {
        assert.equal(regexToSrl("([a-z]{3})"), "capture (letter, exactly 3 times)");
      });
    });
  });
});

const testTranslation = data => {
  describe(data.description, function() {
    it('should work by default', function() {
      data.inputs.forEach(input => {
        assert(RegExp(data.original).test(input), `match against ${input}`);
      });
    });

    it('should work after first translation', function() {
      data.inputs.forEach(string => {
        let firstPassTranslation = new RegExp(repeatTranslation(data.original, 1));

        assert(firstPassTranslation.test(string));
      });
    });

    it('should be stable', function() {
      let translations = [];
      for (let i = 1; i <= 3; i++) {
        translations.push(repeatTranslation(data.original, i));
      }
      assert.equal(translations[2], translations[1]);
    });
  });
};

describe('translate common regexs', function() {
  testTranslation({
    description: 'email addresses',
    original: "^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$",
    inputs: ["test@email.com", "things@stuff.net", "me@you.co"]
  });

  testTranslation({
    description: 'US zipcodes',
    original: "^[0-9]{5}(?:-[0-9]{4})?$",
    inputs: ["90210", "12345-0345"]
  });

  testTranslation({
    description: 'Alpha numeric characters',
    original: "^[a-zA-Z0-9]+$",
    inputs: ["aaa", "ASDAS", "assdASDADS", "asdas9769ASDASD", "12312"]
  });

  testTranslation({
    description: 'Digits',
    original: "^[0-9]+$",
    inputs: ["1", "12312"]
  });

  testTranslation({
    description: 'Phone numbers',
    original: "^(?:\\([0-9]{3}\\))?[- .]?[0-9]{3}[- .]?[0-9]{4}$",
    inputs: ["(555)555-1234", "(555) 555 1234"]
  });

  testTranslation({
    description: 'Dates (MM/DD/YYYY)',
    original: "^(?:0?[1-9]|1[012])[- \/.](?:0?[1-9]|[12][0-9]|3[01])[- \/.](?:19|20)?[0-9]{2}$",
    inputs: ["01/01/1900", "10/30/2015"]
  });
});

/*
  Translate given regex string to SRL and back to regex the specified number of times
  Note: Accepts a string of the regex with no surrounding slashes; Returns the same
 */
const repeatTranslation = (regex, times) => {
  let translated = regex;

  for (let i = 0; i < times; i++) {
    translated = SRL(regexToSrl(translated)).getRawRegex();
  }

  return translated;
};
