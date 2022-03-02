const connection = require('./connections');

const serialize = (element) => ({
  saleId: element.sale_id,
  date: element.date,
  productId: element.product_id,
  quantity: element.quantity,
});

const serializeID = (element) => ({
  date: element.date,
  productId: element.product_id,
  quantity: element.quantity,
});

const getAll = async () => {
  const [results] = await connection.execute(`SELECT sp.sale_id, s.date ,sp.product_id, sp.quantity
  FROM StoreManager.sales_products AS sp 
  INNER JOIN StoreManager.sales AS s
  ON sp.sale_id = s.id
  ORDER BY sp.sale_id, sp.product_id`); 

  return results.map(serialize);
};

const getId = async (id) => {
  const [results] = await connection.execute(`SELECT s.date ,sp.product_id, sp.quantity
  FROM StoreManager.sales_products AS sp 
  INNER JOIN StoreManager.sales AS s
  ON sp.sale_id = s.id
  WHERE sale_id=?
  ORDER BY sp.product_id `, [id]);
  
  return results.map(serializeID);
};

const execlude = async (id) => {
  await connection.execute('DELETE FROM StoreManager.sales_products WHERE sale_id=? ', [id]);
};

const createSP = async (saleId, productId, quantity) => {
  const querry = `INSERT INTO StoreManager.sales_products
  (sale_id,product_id,quantity) VALUES (?,?,?)`;
  const [results] = await connection.execute(querry, [saleId, productId, quantity]);
  return results;
};  

  const createS = async () => {
  const querry = 'INSERT INTO StoreManager.sales (date) VALUES (now())';
  const [results] = await connection.execute(querry);
  return results;
};

module.exports = { getAll, getId, execlude, createSP, createS };