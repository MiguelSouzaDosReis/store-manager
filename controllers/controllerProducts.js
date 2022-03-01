const Products = require('../models/Products');

const everthing = async (_req, res) => {
  const products = await Products.getAll();

  res.status(200).json(products);
};

const everthingId = async (req, res) => {
  const { id } = req.params;
  const products = await Products.getId(id);
  if (products === undefined) { return res.status(404).json({ message: 'Product not found' }); }

  res.status(200).json(products);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const exist = 'Product already exists';
  const existName = await Products.getName(name);
  if (existName.length > 0) { return res.status(409).json({ message: exist }); }
  const creationProducts = await Products.create(name, quantity);
  res.status(201).json(creationProducts);
};

module.exports = { everthing, everthingId, create };