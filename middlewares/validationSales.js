const MessageQuantity = '"quantity" is required';

const validQuantitySales = async (req, res, next) => {
  const array = req.body;
  for (let i = 0; i < array.length; i += 1) {
    const { quantity } = array[i];
    if (quantity === undefined) { return res.status(400).json({ message: MessageQuantity }); }
  }
  return next();
};

const validQuantitySales2 = async (req, res, next) => {
  const array = req.body;
  for (let i = 0; i < array.length; i += 1) {
    const { quantity } = array[i];
    if (typeof quantity !== 'number' || quantity <= 0) { 
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' }); 
    }
  }
  return next();
};

const validProductsIDSales = async (req, res, next) => {
  const array = req.body;
  for (let i = 0; i < array.length; i += 1) { 
    const { productId } = array[i];
    console.log(productId);
    if (!productId) { return res.status(400).json({ message: '"productId" is required' }); }
  }
  next();
};

module.exports = { validQuantitySales, validProductsIDSales, validQuantitySales2 };
