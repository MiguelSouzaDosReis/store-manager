const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.json());
require('dotenv').config();
const controllerProducts = require('./controllers/controllerProducts');
const controllerSales = require('./controllers/controllerSales');
const validation = require('./middlewares/validation');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', controllerProducts.everthing);

app.get('/products/:id', controllerProducts.everthingId);

app.get('/sales', controllerSales.everthing);

app.get('/sales/:id', controllerSales.everthingId);

app.post('/products', validation.validQuantity, validation.validName, controllerProducts.create);

app.put('/products/:id', validation.validQuantity, validation.validName, controllerProducts.update);

app.delete('/products/:id', controllerProducts.execlude);

app.delete('/sales/:id', controllerSales.execlude);

app.post('/sales', validation.validQuantity, validation.validProductsID, controllerSales.create);

app.put('/sales/:id', validation.validQuantity, validation.validProductsID, controllerSales.update);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
