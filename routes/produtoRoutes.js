
const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/ProdutoController');

// Rotas principais
router.get('/', produtoController.index);
router.get('/:situacao', produtoController.index);

// Rotas de CRUD
router.post('/cadastrar', produtoController.create);
router.get('/formularioEditar/:codigo', produtoController.editForm);
router.post('/editar', produtoController.update);
router.get('/remover/:codigo&:imagem', produtoController.delete);

module.exports = router;
