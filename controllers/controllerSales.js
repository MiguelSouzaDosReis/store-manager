const Sales = require('../models/Sales');
const SalesService = require('../services/Sales');

const everthing = async (_req, res) => {
  const sales = await Sales.getAll();

  res.status(200).json(sales);
};

const everthingId = async (req, res) => {
  const { id } = req.params;
  const sales = await Sales.getId(id);
  if (sales.length === 0) { return res.status(404).json({ message: 'Sale not found' }); }

  res.status(200).json(sales);
};

const execlude = async (req, res) => {
  const { id } = req.params;
  const salesID = await Sales.getId(id);
  if (salesID.length === 0) { return res.status(404).json({ message: 'Sale not found' }); }
  await Sales.execlude(id);
 res.status(204).json();
};

 const create = async (req, res) => {
  const arrayProducts = req.body;
  const saleCreation = await SalesService.create(arrayProducts);
  return res.status(201).json(saleCreation);
};

const update = async (req, res) => {
  const { id } = req.params;
  const [array] = req.body;
  const { quantity, productId } = array;
  const saleUpdate = await SalesService.updateIsValid(id, quantity, productId);
  return res.status(200).json(saleUpdate);
};

module.exports = { everthing, everthingId, execlude, create, update };