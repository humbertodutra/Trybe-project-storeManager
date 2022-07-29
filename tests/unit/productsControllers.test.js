const sinon = require('sinon');
const productService = require('../../services/productService');
const productController = require('../../controllers/productController');
const { expect } = require('chai');




describe('When productControllers is called with getAll', () => {
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
  
  const req = {}
  const res = {}

  before(() => {
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(payLoadProducts)
  
    sinon.stub(productService, 'getAll').resolves(payLoadProducts);
  })

  after(() => {
    sinon.restore()
  })

  it('its called the with de status code 200', async () => {
    await productController.getAll(req, res)
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(payLoadProducts)).to.be.equal(true);
  })
})

describe('When productControllers is called with getById', () => {
  const payLoadProducts = [
    {
      id: '1',
      name: 'Martelo de Thor'
    },
  ];

  const req = {}
  const res = {}

  before(() => {
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(payLoadProducts)
    req.params = sinon.stub().returns(1)

    sinon.stub(productService, 'getById').resolves(payLoadProducts);
  })

  after(() => {
    sinon.restore()
  })

  it('its called the with de status code 200', async () => {
    await productController.getById(req, res)
    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(payLoadProducts)).to.be.equal(true);
  })
})

describe('When productControllers is called with createProduct', () => {
  const payLoadProducts = [
    {
      id: '1',
      name: 'Martelo de Thor'
    },
  ];

  const req = {}
  const res = {}

  before(() => {
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns(payLoadProducts)
    req.body = sinon.stub().returns()

    sinon.stub(productService, 'createProduct').resolves(payLoadProducts);
  })

  after(() => {
    sinon.restore()
  })

  it('its called the with de status code 200', async () => {
    const { name } = payLoadProducts
    await productController.createProduct(req, res)
    expect(res.status.calledWith(201)).to.be.equal(true);
    expect(res.json.calledWith(payLoadProducts)).to.be.equal(true);
  })
})