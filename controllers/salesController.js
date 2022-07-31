const salesService = require('../services/salesService');

const addSale = async (req, res) => {
  const arraySales = req.body;
  const result = await salesService.createProduct(arraySales);
  const typeResult = Array.isArray(result);
  if (typeResult) {
    result.find((element) => {
      if (element.message) {
        return res.status(element.status).json(element.message);
      } return null;
    });
  } else {
    res.status(201).json(result);
  }
};

const getAllSales = async (req, res) => {
  const result = await salesService.getAllSales();
  if (!result) return res.stauts(404).json({ message: 'sales Not Found' });
  return res.status(200).json(result);
};

const getSalesById = async (req, res) => {
    const { id } = req.params;
    const result = await salesService.getSalesById(id);
    if (result.length === 0) return res.status(404).json({ message: 'Sale not found' });
    return res.status(200).json(result);
};
module.exports = {
  addSale,
  getAllSales,
  getSalesById,
};
