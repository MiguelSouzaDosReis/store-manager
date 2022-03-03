const Sales = require('../models/Sales');

const create = async (arrayProducts) => {
  const createS = await Sales.createS();
  const salesCreation = { id: createS.insertId, itemsSold: arrayProducts };

  arrayProducts.map(async ({ productId, quantity }) => {
    await Sales.createSP(createS.insertId, productId, quantity); 
});

  return salesCreation;
};
const updateIsValid = async (saleId, quantity, productId) => {
  const updateValidade = await Sales.update(saleId, quantity, productId);
  if (!updateValidade.affectedRows) {
    return null;
  }
  return { saleId, itemUpdated: [{ quantity, productId }] };
  };

module.exports = { create, updateIsValid };