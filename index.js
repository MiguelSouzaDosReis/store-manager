const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.json());
require('dotenv').config();
const controllerProducts = require('./controllers/controllerProducts');
const controllerSales = require('./controllers/controllerSales');
const validationSales = require('./middlewares/validationSales');
const validationProducts = require('./middlewares/validationProducts');

const { validQuantityProducts, validNameProducts } = validationProducts;
const { validQuantitySales, validProductsIDSales, validQuantitySales2 } = validationSales;
const { create, update } = controllerSales;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', controllerProducts.everthing);

app.get('/products/:id', controllerProducts.everthingId);

app.get('/sales', controllerSales.everthing);

app.get('/sales/:id', controllerSales.everthingId);

app.post('/products', validQuantityProducts, validNameProducts, controllerProducts.create);

app.put('/products/:id', validQuantityProducts, validNameProducts, controllerProducts.update);

app.delete('/products/:id', controllerProducts.execlude);

app.delete('/sales/:id', controllerSales.execlude);

app.post('/sales', validQuantitySales, validQuantitySales2, validProductsIDSales, create);

app.put('/sales/:id', validQuantitySales, validQuantitySales2, validProductsIDSales, update);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
