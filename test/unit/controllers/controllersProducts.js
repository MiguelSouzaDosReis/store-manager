const { expect } = require('chai')
const sinon = require('sinon')
const Products = require('../../../models/Products')
const controllerProducts = require('../../../controllers/controllerProducts')
const res = {};
const req = {};
req.body = {name: 'Miguel', quantity:10};
req.params = { id: 1 }
const validation = require('../../../services/validation')

describe('fazendo os teste do controllerProducts', () => {
  before(() => {
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()
    sinon.stub(Products,'getId').resolves([])
  })
  after(() => {
    Products.getId.restore()
  })
  describe('testando a função everthing', () => {
    sinon.stub(Products,'getAll').resolves([])
    it('everthing status 200 e json funciona', async () => {
     await controllerProducts.everthing(req, res)
     expect(res.status.calledWith(200)).to.be.true
     expect(res.json.calledWith(sinon.match.array)).to.be.true
    })
  })
   describe('testando a função everthingId', () => {
    it('everthingId status 200 e json funciona', async () => {
     await controllerProducts.everthingId(req, res)
     expect(res.status.calledWith(200)).to.be.true
     expect(res.json.calledWith(sinon.match.array)).to.be.true
    })
  })
  describe('testando a função create', () => {
    sinon.stub(Products,'create').resolves([])
    sinon.stub(Products,'getName').resolves([])
    it('create status 200 e json funciona', async () => {
     await controllerProducts.create(req, res)
     expect(res.status.calledWith(200)).to.be.true
     expect(res.json.calledWith(sinon.match.array)).to.be.true
    })
  })
  describe('testando a função update', () => {
    sinon.stub(validation,'updateIsValid').resolves([])
    sinon.stub(Products,'update').resolves([])
    it('update status 200 e json funciona', async () => {
     await controllerProducts.update(req, res)
     expect(res.status.calledWith(200)).to.be.true
     expect(res.json.calledWith(sinon.match.array)).to.be.true
    })
  })
   describe('testando a função execlude', () => {
    sinon.stub(Products,'execlude').resolves([])
    it('execlude status 200 e json funciona', async () => {
     await controllerProducts.execlude(req, res)
     expect(res.status.calledWith(200)).to.be.true
     expect(res.json.calledWith(sinon.match.array)).to.be.true
    })
  })
})