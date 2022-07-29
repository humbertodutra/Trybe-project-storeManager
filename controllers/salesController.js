const salesService = require('../services/salesService');

const addSale = async (req, res) => {
  const requisition = req.body;
  const sale = await salesService.createProduct(requisition);
  const type = Array.isArray(sale);
  if (type) {
    return res.status(sale[0].status).json(sale[0].message);
  }
  return res.status(201).json(sale);
};

module.exports = {
  addSale,
};

// não é possivel realizar operaçoes em um venda sem o campo quantity
// não é possivel realizar operaçoes com quatity menor o igual a 0
// não é possivel realizar operaçoes com productId vazio
// não é possivel realizar operaçoes com productId inexistente no banco de dados