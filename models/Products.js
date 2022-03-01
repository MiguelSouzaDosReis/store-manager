const connection = require('./connections');

const serialize = (element) => ({
  id: element.id,
  name: element.name,
  quantity: element.quantity,
});

const getAll = async () => {
  const querry = 'SELECT * FROM StoreManager.products';
  const [results] = await connection.execute(querry);

  return results;
};

const getId = async (id) => {
  const query = 'SELECT  * FROM StoreManager.products WHERE id=?;';
  const [results] = await connection.execute(query, [id]);
  
  return results.map(serialize)[0];
};

module.exports = { getAll, getId };