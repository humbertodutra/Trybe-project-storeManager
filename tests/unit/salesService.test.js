const { expect } = require('chai');
const salesModel = require('../../models/salesModel');
const sinon = require('sinon');
const salesService = require('../../services/salesService');

describe('verify if the func create sale returns the code 201', async () => {
  const salesReturn = {
    "id": 3,
    "itemsSold": [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 1,
        "quantity": 1
      }
    ]
  }

  before(async () => {
    sinon.stub(salesModel, 'createSale').returns(salesReturn)
  })
  after(async () => {
    sinon.restore();
  })

  it('returns a object with products', async () => {
    const a = await salesService.createProduct();
    expect(a).to.be.a('object');
  })

})

