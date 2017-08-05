import SRL from '../srl/lib/SRL';

export const srlToRegex = (srl) => {
  const query = new SRL(srl);
  return query.get().toString();
};
