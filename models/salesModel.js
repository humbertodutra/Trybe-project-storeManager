const connection = require('../connection');

const createSale = async (array) => {
  const queryOne = 'INSERT INTO StoreManager.sales () VALUES()';
  const [row] = await connection.execute(queryOne);
  Promise.all(array.map(async (e) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)VALUES(?, ?, ?)',
      [row.insertId, e.productId, e.quantity],
    );
  }));

  const result = {
    id: row.insertId,
    itemsSold: array,
  };

  return result;
};

module.exports = {
  createSale,
};