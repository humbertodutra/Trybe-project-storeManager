const salesModel = require('../models/salesModel');
const productService = require('./productService');

const getValidateById = async (e) => {
  if (!e.productId) return { status: 400, message: { message: '"productId" is required' } };
  const checkingDb = await productService.getById(e.productId);
  if (checkingDb === null) {
    return {
      status: 404, message: { message: 'Product not found' },
    }; 
  }
};

const getValidateByQuantity = async (e) => {
  if (e.quantity < 0 || e.quantity === 0) {
    return {
      status: 422, message: { message: '"quantity" must be greater than or equal to 1' },
    };
  }
  if (!e.quantity) {
    return {
      status: 400, message: { message: '"quantity" is required' },
    };
  }
};

const verifyAddSales = async (array) => Promise.all(array.map(async (e) => {
  const validateById = await getValidateById(e);
  if (validateById) {
    return validateById;
  }
  const validateByQuantity = await getValidateByQuantity(e);
  if (validateByQuantity) {
    return validateByQuantity;
  } 
  return e;
}));
 
const createProduct = async (array) => {
  const verify = await verifyAddSales(array);
  const logError = verify.filter((e) => (e.message));
  if (logError.length > 0) {
    return logError;
  }
  
  const addProduct = salesModel.createSale(array);
  return addProduct;
};

const getAllSales = async () => {
  const result = await salesModel.getAllSales();
  const formatResult = result.map((a) => {
    const { sale_id: saleId, product_id: productId, quantity, date } = a;
    const obj = {
      saleId,
      date,
      productId,
      quantity,
    };
    return obj;
  });
  return formatResult;
};

const getSalesById = async (id) => {
  const result = await salesModel.getSalesById(id);
  if (result.length === 0) return [];
  const format = result.map((a) => {
    const { product_id: productId, quantity, date } = a;
    const obj = {
      productId,
      quantity,
      date,
    };
    return obj;
  });
  return format;
};

const deleteSale = async (id) => {
  const checkSaleId = await getSalesById(id);
  if (!checkSaleId) return null;
  const result = await salesModel.deleteSale(id);
  return result;
};

const byId = async (id) => {
  const checkId = await salesModel.getBy(id);
  if (!checkId) return null;
  return checkId;
};

const deleteSaleTwo = async (id) => {
  const checkId = await byId(id);
  if (!checkId) return null;
  const deleteSaleDb = await salesModel.deleteSale(id);
  return deleteSaleDb;
};

const updateSalesAssist = async (array) => Promise.all(array.map(async (a) => {
  const validateById = await getValidateById(a);
  if (validateById) {
    return validateById;
  }
  const validateByQuantity = await getValidateByQuantity(a);
  if (validateByQuantity) {
    return validateByQuantity;
  }
  return a;
}));

const updateSale = async (id, array) => {
  const verify = await updateSalesAssist(array);
  const logError = verify.filter((e) => (e.message));
  if (logError.length > 0) {
    return logError;
  }
  const verifyid = await byId(id);
  if (!verifyid) {
    return [{
      status: 404, message: { message: 'Sale not found' },
    }]; 
  }
  
  const updatingInDb = await salesModel.updateSale(id, array);
  return updatingInDb;
};

module.exports = {
  createProduct,
  getAllSales,
  getSalesById,
  deleteSale,
  deleteSaleTwo,
  updateSale,
};