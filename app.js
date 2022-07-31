const express = require('express');

const app = express();
const router = require('./routers/index');

app.use(express.json());
app.use('/sales', router.salesRouter);
app.use('/products', router.productsRouter);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;