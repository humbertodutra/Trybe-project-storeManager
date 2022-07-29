const { expect } = require('chai');
const productsModel = require('../../models/productModel');
const connection = require('../../connection');
const sinon = require('sinon');
const productService = require('../../services/productService');


describe('Verify if the function getall() from productsService returns a array', () => {

  const payLoadProducts = [
    {
      id: '1',
      name: 'Martelo de Thor'
    },
    {
      id: '2',
      name: 'Traje de encolhimento'
    },
    {
      id: '3',
      name: 'Escudo do Capitão América'
    }
  ];

  before(async () => {
    sinon.stub(productsModel, 'getAll').returns([[payLoadProducts]]);
  });

  after(async () => {
    productsModel.getAll.restore();
  })
  it('retorna um array de produtos', async () => {
    const response = await productService.getAll();
    expect(response).to.be.a('array');
  })

})

describe('Verify if the function getById from products service returns the product id', () => {

  const payLoadProducts = {
    name: 'Martelo de Thor',
    id: '1'
  }

  before(async () => {
    sinon.stub(productsModel, 'getById').resolves(payLoadProducts)
  });

  after(async () => {
    productsModel.getById.restore();
  })

  it('returns a objetct the represents a product', async () => {
    const response = await productService.getById(1)
    expect(response).to.be.a('object')
  })

})

describe('Verify if the function createProduct works', () => {
  const payLoadProducts = {
    id: '1',
    name: 'Martelo de Thor',
  }
  const { name } = payLoadProducts

  before(async () => {
    sinon.stub(productsModel, 'createProduct').resolves(payLoadProducts)
  })

  after(async () => {
    sinon.restore();
  })

  it('returns a objetct the represents the added product', async () => {
    const response = await productService.createProduct(name);
    expect(response).to.be.a('object')
  })

})