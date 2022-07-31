const sinon = require('sinon');
const salesService = require('../../services/salesService');
const salesControllers = require('../../controllers/salesController');
const { expect } = require('chai');

describe('When we call the method Post on "/sales"', () => {

  
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


  const req = {}
  const res = {}

  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(salesReturn);
    sinon.stub(salesService, 'createProduct').resolves(salesReturn);
  })

  after(() => {
    sinon.restore
  })

  it('its called with code 201', async () => {
    await salesControllers.addSale(req, res);
    expect(res.status.calledWith(201)).to.be.equal(true);
    expect(res.json.calledWith(salesReturn)).to.be.equal(true);
  })

});