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

const updateProduct = async (id, name) => {
  await connection.execute(
    `UPDATE StoreManager.products
      SET name = ?
      WHERE id = ?`,
    [name, id],
  );

  return {
    id,
    name,
  };
};

const deleteProduct = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?', [id],
  );
  return [];
};

const searchByTerm = async (term) => {
  const termo = `%${term}%`;
  const [rows] = await connection.execute(
    `SELECT * FROM StoreManager.products
    WHERE  name LIKE ?`,
    [termo],
  );

  return rows;
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchByTerm,
};