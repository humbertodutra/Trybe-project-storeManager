const salesModel = require('../models/salesModel');
const productService = require('./productService');

const verifingQuantity = (a) => {
  if (a.quantity < 0 || a.quantity === 0) {
    return {
      status: 422,
      message: {
        message: '"quantity" must be greater than or equal to 1',
      },
    };
  }
  if (!a.quantity || a.quantity === '') {
 return {
    status: 400, message: { message: '"quantity" is required"' },
  }; 
}
};

const verifingProductId = async (a) => {
  const verifingId = await productService.getById(a.productId);
  if (!a.productId) return { status: 400, message: { message: '"productId" is required' } };
  if (!verifingId) return { status: 404, message: { message: 'Product not found' } };
};

const productVerify = async (array) => Promise.all(array.map(async (a) => {
  const byQuantity = await verifingQuantity(a);
  const byId = await verifingProductId(a);

  if (byQuantity) return byQuantity;
  if (byId) return byId;
}));
  
const createProduct = async (array) => {
  const verifyProduct = await productVerify(array);
  const verified = await verifyProduct.filter((a) => a !== undefined);
  if (verified.length >= 1) return verified;
  const saleResult = await salesModel.createSale(array);
  if (!saleResult) return null;
  return (saleResult);
};

module.exports = {
  createProduct,
};