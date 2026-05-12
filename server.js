const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
    res.json({ mensagem: '⭐ Bem-vindo à API da Festa Junina!' });
});

const rotasCategorias = require('./routes/categorias');
const rotasCantores = require('./routes/cantores');
const rotasIngressos = require('./routes/ingressos');

app.use('/api/categorias', rotasCategorias);
app.use('/api/cantores', rotasCantores);
app.use('/api/ingressos', rotasIngressos);

app.use((req, res, next) => {
    res.status(404).json({
        sucesso: false,
        mensagem: `Rota '${req.url}' não encontrada na API de Shows e Eventos.`
    });
});

app.use(errorHandler);

const PORTA = process.env.PORT || 3000;

app.listen(PORTA, () => {
    console.log('');
    console.log('🚀 ================================');
    console.log(`🚀 Servidor rodando!`);
    console.log(`🚀 Porta local: ${PORTA}`);
    console.log('🚀 ================================');
    console.log('');

    console.log('📋 Rotas disponíveis:');
    console.log(`   GET    /api/categorias`);
    console.log(`   POST   /api/categorias`);
    console.log(`   GET    /api/cantores`);
    console.log(`   GET    /api/cantores/:id`);
    console.log(`   POST   /api/cantores`);
    console.log(`   PUT    /api/cantores/:id`);
    console.log(`   DELETE /api/cantores/:id`);
    console.log(`   GET    /api/ingressos`);
    console.log(`   POST   /api/ingressos`);
    console.log('');

    console.log('💣 Rota de teste de erro:');
    console.log(`   GET    /api/cantores/erro-teste`);
    console.log('');
});

module.exports = app;