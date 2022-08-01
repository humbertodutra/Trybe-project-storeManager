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

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteFromDb = await salesService.deleteSaleTwo(id);
    if (!deleteFromDb) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    return res.status(204).send('ok');
  } catch (error) {
    return res.status(500).json({ message: 'error ao realizar a sua consulta' });
  }
};

const updateSale = async (req, res) => {
    const arrayOfupdates = req.body;
    const { id } = req.params;
    const updatingInDb = await salesService.updateSale(id, arrayOfupdates);
    const typeResult = Array.isArray(updatingInDb);
    if (typeResult) {
      updatingInDb.find((e) => {
        if (e.message) {
          return res.status(e.status).json(e.message);
        } return null;
      });
} else return res.status(200).json(updatingInDb);
};
module.exports = {
  addSale,
  getAllSales,
  getSalesById,
  deleteSale,
  updateSale,
};
