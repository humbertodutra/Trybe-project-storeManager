const { expect } = require('chai');
const salesModel = require('../../models/salesModel');
const connection = require('../../connection');
const sinon = require('sinon');


describe('verify create Sale on Model', () => {
  const payLoadSales= [
    {
      id: '1',
      name: 'Martelo de Thor'
    },
    {
      id: '2',
      name: 'Traje de encolhimento'
    }
  ]
  before(async () => {
    sinon.stub(connection, 'execute').returns(payLoadSales);
  })
  after(async () => {
    connection.execute.restore()
  })

  it('retorna um array de sales', async () => {
    const awnser = await salesModel.createSale(payLoadSales);
    expect(awnser).to.be.a('object');
  })
});