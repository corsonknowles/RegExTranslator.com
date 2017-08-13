import translationHash from './english_translation_hash';

const srlToEngHash = {};
const engToSrlHash = {};
Object.keys(translationHash).forEach(srlTemplate => {
  const englishTemplates = translationHash[srlTemplate];

  const est = `\\b${srlTemplate.replace(/\$\d+/g, '(.*?)')}\\b`;
  if (englishTemplates.length === 0) {
    srlToEngHash[est] = srlTemplate;
  } else {
    srlToEngHash[est] = englishTemplates;
  }

  englishTemplates.forEach(englishTemplate => {
    const eet = `\\b${englishTemplate.replace(/\$\d+/g, '(.*?)')}\\b`;
    engToSrlHash[eet] = srlTemplate;
  });
});

export const engToSrl = input => {
  let output = input.slice();

  Object.keys(engToSrlHash).forEach(srlTemplate => {
    const englishTemplate = engToSrlHash[srlTemplate];
    output = output.replace(new RegExp(srlTemplate, 'g'), englishTemplate);
  });

  return output;
};

export const srlToEng = input => {
  let output = input.slice();

  Object.keys(srlToEngHash).forEach(engTemplate => {
    const srlTemplates = srlToEngHash[engTemplate];
    output = output.replace(
      new RegExp(engTemplate, 'g'),
      srlTemplates[Math.floor(Math.random() * srlTemplates.length)]
    );
  });

  return output;
};
