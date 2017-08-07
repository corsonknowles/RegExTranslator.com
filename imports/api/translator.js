import SRL from 'srl';

export const srlToRegex = (srl) => {
  const query = new SRL(srl);
  return query.get().toString();
};

export const regexToSrl = regex => {

  // console.log("Start. Create root node.");
  let depth = 0;
  for (let i = 0; i < regex.length; i++) {

  }

  return "Translation coming soon";
};
