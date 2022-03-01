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
  WHERE product_id=?
  ORDER BY sp.product_id `, [id]);
  
  return results.map(serializeID);
};

module.exports = { getAll, getId };