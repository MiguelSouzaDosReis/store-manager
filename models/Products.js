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

const create = async (name, quantity) => {
  const querry = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?,?)';
  const [results] = await connection.execute(querry, [name, quantity]);
  const id = results.insertId;
  return { id, name, quantity };
};

const getName = async (name) => {
  const query = 'SELECT  * FROM StoreManager.products WHERE name=?;';
  const [results] = await connection.execute(query, [name]);
  
  return results;
};

module.exports = { getAll, getId, create, getName }; 