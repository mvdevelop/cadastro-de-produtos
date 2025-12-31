
const express = require('express');
const fileupload = require('express-fileupload');
const { engine } = require('express-handlebars');
const path = require('path');
require('dotenv').config();

// Importar rotas
const produtoRoutes = require('./routes/produtoRoutes');

// App
const app = express();

// Configurações
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileupload());

// Configuração do Handlebars
app.engine('handlebars', engine({
    helpers: {
        condicionalIgualdade: function (parametro1, parametro2, options) {
            return parametro1 === parametro2 ? options.fn(this) : options.inverse(this);
        }
    }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Arquivos estáticos
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));
app.use('/css', express.static('./public/css'));
app.use('/img', express.static('./uploads'));
app.use(express.static('public'));

// Rotas
app.use('/', produtoRoutes);

// Rota para arquivos não encontrados
app.use((req, res) => {
    res.status(404).render('404', { title: 'Página não encontrada' });
});

// Configuração do Handlebars
app.engine('handlebars', engine({
    helpers: {
        condicionalIgualdade: function (parametro1, parametro2, options) {
            return parametro1 === parametro2 ? options.fn(this) : options.inverse(this);
        },
        reduce: function(array, initialValue) {
            if (!array) return initialValue;
            return array.reduce((sum, item) => {
                return sum + parseFloat(item.valor || 0);
            }, initialValue);
        },
        now: function() {
            return new Date().toLocaleDateString('pt-BR');
        }
    }
}));

// Iniciar servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});
