const Products = require('../models/Products');

const everthing = async (_req, res) => {
  const products = await Products.getAll();

  res.status(200).json(products);
};

const everthingId = async (req, res) => {
  const { id } = req.params;
  const products = await Products.getId(id);
  if (products.length === 0) { return res.status(404).json({ mensage: 'Product not found' }); }

  res.status(200).json(products);
};

module.exports = { everthing, everthingId };