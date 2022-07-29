const connection = require('../connection');

const createSale = async (array) => {
  const queryOne = 'INSERT INTO StoreManager.sales () VALUES()';
  const [row] = await connection.execute(queryOne);
  Promise.all(array.map(async (execution) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)VALUES(?, ?, ?)',
      [row.insertId, execution.productId, execution.quantity],
    );
  }));

  const result = {
    id: row.insertId,
    itemSold: array,
  };

  return result;
};

module.exports = {
  createSale,
};