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

const getAllSales = async () => {
  const newLocal = `SELECT * FROM StoreManager.sales_products 
  INNER JOIN StoreManager.sales WHERE sales.id = sales_products.sale_id 
  order by sales_products.sale_id ASC, sales_products.product_id ASC`;
  const [row] = await connection.execute(
    newLocal,
  );
  
  return row;
};

const getSalesById = async (id) => { 
  const newLocal = `SELECT * FROM StoreManager.sales_products 
    INNER JOIN StoreManager.sales 
    ON sales.id = sales_products.sale_id
    where id = ?
    order by sales_products.sale_id ASC, sales_products.product_id ASC`;
  const [row] = await connection.execute(newLocal, [id]);
  return row;
};

module.exports = {
  createSale,
  getAllSales,
  getSalesById,
};