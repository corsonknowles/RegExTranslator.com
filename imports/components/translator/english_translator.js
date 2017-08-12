// import translationHash from './english_translation_hash';
const translationHash = require('./english_translation_hash.js');

const engToSrlHash = {};
Object.keys(translationHash).forEach(srlTemplate => {
  const englishTemplates = translationHash[srlTemplate];

  englishTemplates.forEach(englishTemplate => {
    engToSrlHash[englishTemplate.replace(/\$\d+/g, '(.*?)')] = srlTemplate;
  });
});

const engToSrl = input => {
  let output = input.slice();

  Object.keys(engToSrlHash).forEach(srlTemplate => {
    const englishTemplate = engToSrlHash[srlTemplate];

    output = output.replace(new RegExp(srlTemplate, 'g'), englishTemplate);
  });

  return output;
};

const english =
`in list 'words'
ignore case
must end`;

console.log('\nInput text:');
console.log(english);
console.log('\nOutput text:');
console.log(engToSrl(english));
console.log('\n');
