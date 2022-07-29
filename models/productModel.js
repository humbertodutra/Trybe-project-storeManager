const connection = require('../connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products ORDER BY id';

  const [results] = await connection.execute(query);

  return results;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ? ORDER BY id';
  const [[results]] = await connection.execute(query, [id]);
  return results;
};

const createProduct = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [row] = await connection.execute(query, [name]);
  const result = {
    id: row.insertId,
    name,
  };
  return result;
};

module.exports = {
  getAll,
  getById,
  createProduct,
};