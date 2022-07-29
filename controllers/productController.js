const productService = require('../services/productService');

const getAll = async (req, res) => {
  try {
    const productsList = await productService.getAll();
    if (!productsList) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(productsList);
  } catch (error) {
    console.error(error);
    res.status(500)
      .json({ message: 'Erro ao realizar a consulta' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const productById = await productService.getById(id);

    if (!productById || productById.length < 1) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(productById);
  } catch (error) {
    console.error(error);
    res.status(500)
      .json({ message: 'Erro ao realizar a consulta' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: '"name" is required' });
    }

    if (name.length < 5) {
      return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
    }

    const createdProduct = await productService.createProduct(name);
    return res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500)
      .json({ message: 'Não foi possivel criar o seu produto' });
  }
};

module.exports = {
    getAll,
    getById,
    createProduct,
};