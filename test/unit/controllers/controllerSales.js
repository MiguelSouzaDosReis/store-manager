const { expect } = require('chai')
const sinon = require('sinon')
const controllerSales = require('../../../controllers/controllerSales')
const Sales = require('../../../models/Sales')
const res = {};
const req = {};
describe('fazendo os testes do controllerSales', () =>{
  before(() => {
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()
  })
  describe('testando a função everthing', () => {
    sinon.stub(Sales,'getAll').resolves([])
    it('everthing status 200 e json funciona', async () => {
     await controllerSales.everthing(req, res)
     expect(res.status.calledWith(200)).to.be.true
     expect(res.json.calledWith(sinon.match.array)).to.be.true
    })
  })
})