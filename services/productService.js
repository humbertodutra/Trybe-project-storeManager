const productModel = require('../models/productModel');

const getAll = async () => {
  const products = await productModel.getAll();
  if (!products) return null;
  return products;
};

const getById = async (id) => {
  const product = await productModel.getById(id);
  if (!product) return null;
  return product;
};

const createProduct = async (name) => {
  const productCreated = await productModel.createProduct(name);
  if (!productCreated) return null;
  return productCreated;
};

module.exports = {
  getAll,
  getById,
  createProduct,
};