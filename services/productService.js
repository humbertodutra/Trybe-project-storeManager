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

const updateProduct = async (id, name) => {
  const checkId = await getById(id);
  const productUpdate = await productModel.updateProduct(id, name);
  if (!checkId) return null;
  return productUpdate;
};

const deleteProduct = async (id) => {
  const checkId = await getById(id);
  if (!checkId) return null;
  const deleteFromDb = await productModel.deleteProduct(id);
  return deleteFromDb;
};

const getSearch = async (term) => {
  const result = await productModel.searchByTerm(term);
  return result;
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
  getSearch,
};