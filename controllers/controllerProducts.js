const Products = require('../models/Products');
const ProductsService = require('../services/validation');

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

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
 const updateProducts = await ProductsService.updateIsValid(name, quantity, id);
  if (!updateProducts) { return res.status(404).json({ message: 'Product not found' }); }
  res.status(200).json(updateProducts);
};

const execlude = async (req, res) => {
  const { id } = req.params;
  const productsID = await Products.getId(id);
  if (!productsID) { return res.status(404).json({ message: 'Product not found' }); }
  await Products.execlude(id);
 res.status(204).json();
};

module.exports = { everthing, everthingId, create, update, execlude };