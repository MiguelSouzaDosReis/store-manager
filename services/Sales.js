const Sales = require('../models/Sales');

const create = async (arrayProducts) => {
  const createS = await Sales.createS();
  const salesCreation = { id: createS.insertId, itemsSold: arrayProducts };

  arrayProducts.map(async ({ productId, quantity }) => {
    await Sales.createSP(createS.insertId, productId, quantity); 
});

  return salesCreation;
};

module.exports = { create };