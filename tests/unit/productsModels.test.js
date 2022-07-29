const { expect } = require('chai');
const productsModel = require('../../models/productModel');
const connection = require('../../connection');
const sinon = require('sinon');


describe('Verify if the function getall() from productsModels returns a array', () => {

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
    sinon.stub(connection, 'execute').returns([payLoadProducts]);
  });

  after(async () => {
    connection.execute.restore();
  })
  it('retorna um array de produtos', async () => {
    const response = await productsModel.getAll();
    expect(response).to.be.a('array');
      })
  
})

describe('Verify if the function getById from products models returns the product id', () => {

  const payLoadProducts = {
    name: 'Martelo de Thor',
    id: '1'
  }

  before(async () => {
    sinon.stub(connection, 'execute').returns([[payLoadProducts]])
  });

  after(async () => {
    connection.execute.restore();
  })

  it('returns a objetct the represents a product', async () => {
    
    const response = await productsModel.getById(1);
    expect(response).to.be.a('object')
  })

})

describe('Verify the function to insert a product on database', () => {
  const payLoadProducts = {
    id: '4',
    name: 'Martelo de Thor'
  }

  before(async () => {
    sinon.stub(connection, 'execute').returns([[payLoadProducts]])
  });

  after(async () => {
    connection.execute.restore();
  })

  it('returns a objetct the represents a product', async () => {
    const { name } = payLoadProducts
    const response = await productsModel.createProduct(name);
    expect(response).to.be.a('object')
  })

})