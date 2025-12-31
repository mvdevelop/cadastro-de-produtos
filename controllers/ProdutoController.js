
const Produto = require('../models/Produto');

class ProdutoController {
    // Listar todos os produtos
    async index(req, res) {
        try {
            const produtos = await Produto.findAll();
            res.render('formulario', { 
                produtos,
                situacao: req.params.situacao || null 
            });
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            res.render('formulario', { 
                produtos: [],
                situacao: 'erroCarregamento'
            });
        }
    }

    // Exibir formulário de edição
    async editForm(req, res) {
        try {
            const produto = await Produto.findById(req.params.codigo);
            if (!produto) {
                return res.redirect('/falhaEdicao');
            }
            res.render('formularioEditar', { produto });
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
            res.redirect('/falhaEdicao');
        }
    }

    // Criar novo produto
    async create(req, res) {
        try {
            const { nome, valor } = req.body;
            const imagem = req.files?.imagem;

            // Validação
            if (!nome || !valor || isNaN(valor) || !imagem) {
                return res.redirect('/falhaCadastro');
            }

            // Salvar imagem
            const nomeImagem = await Produto.salvarImagem(imagem);

            // Criar produto no banco
            await Produto.create({
                nome,
                valor: parseFloat(valor),
                imagem: nomeImagem
            });

            res.redirect('/okCadastro');
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            res.redirect('/falhaCadastro');
        }
    }

    // Atualizar produto
    async update(req, res) {
        try {
            const { codigo, nome, valor, nomeImagem } = req.body;
            const imagem = req.files?.imagem;

            // Validação
            if (!nome || !valor || isNaN(valor)) {
                return res.redirect('/falhaEdicao');
            }

            let novaImagem = null;
            
            // Se houver nova imagem
            if (imagem) {
                novaImagem = await Produto.salvarImagem(imagem, nomeImagem);
            }

            // Atualizar produto
            await Produto.update(codigo, {
                nome,
                valor: parseFloat(valor),
                imagem: novaImagem
            });

            res.redirect('/okEdicao');
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            res.redirect('/falhaEdicao');
        }
    }

    // Deletar produto
    async delete(req, res) {
        try {
            const { codigo, imagem } = req.params;
            
            // Remover imagem do sistema de arquivos
            await Produto.removerImagem(imagem);
            
            // Remover produto do banco
            await Produto.delete(codigo);
            
            res.redirect('/okRemover');
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
            res.redirect('/falhaRemover');
        }
    }
}

module.exports = new ProdutoController();
