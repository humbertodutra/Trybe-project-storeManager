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

module.exports = {
  addSale,
};

// não é possivel realizar operaçoes em um venda sem o campo quantity
// não é possivel realizar operaçoes com quatity menor o igual a 0
// não é possivel realizar operaçoes com productId vazio
// não é possivel realizar operaçoes com productId inexistente no banco de dados