const Products = require('../models/Products');

const updateIsValid = async (name, quantity, id) => {
  const updateValidade = await Products.update(name, quantity, id);
  if (!updateValidade.affectedRows) {
    return null;
  }
  return { name, quantity, id };
  };

  module.exports = { updateIsValid };