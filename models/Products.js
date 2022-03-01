const connection = require('./connections');

const getAll = async () => {
  const querry = 'SELECT * FROM StoreManager.products';
  const [results] = await connection.execute(querry);

  return results;
};

const getId = async (id) => {
  const query = 'SELECT  id, name, quantity FROM StoreManager.products WHERE id=?;';
  const [results] = await connection.execute(query, [id]);
  
  return results;
};

module.exports = { getAll, getId };