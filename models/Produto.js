
const db = require('../config/database');
const fs = require('fs');
const path = require('path');

class Produto {
    // Buscar todos os produtos
    static async findAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM produtos ORDER BY codigo DESC', (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    // Buscar produto por ID
    static async findById(codigo) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM produtos WHERE codigo = ?', [codigo], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }

    // Criar produto
    static async create(produtoData) {
        const { nome, valor, imagem } = produtoData;
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO produtos (nome, valor, imagem) VALUES (?, ?, ?)',
                [nome, valor, imagem],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                }
            );
        });
    }

    // Atualizar produto
    static async update(codigo, produtoData) {
        const { nome, valor, imagem } = produtoData;
        
        if (imagem) {
            return new Promise((resolve, reject) => {
                db.query(
                    'UPDATE produtos SET nome = ?, valor = ?, imagem = ? WHERE codigo = ?',
                    [nome, valor, imagem, codigo],
                    (err, results) => {
                        if (err) reject(err);
                        resolve(results);
                    }
                );
            });
        } else {
            return new Promise((resolve, reject) => {
                db.query(
                    'UPDATE produtos SET nome = ?, valor = ? WHERE codigo = ?',
                    [nome, valor, codigo],
                    (err, results) => {
                        if (err) reject(err);
                        resolve(results);
                    }
                );
            });
        }
    }

    // Deletar produto
    static async delete(codigo) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM produtos WHERE codigo = ?', [codigo], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    // Mover imagem para pasta uploads
    static async salvarImagem(imagem, nomeAntigo = null) {
        return new Promise((resolve, reject) => {
            const uploadPath = path.join(__dirname, '../uploads', imagem.name);
            
            // Se houver imagem antiga, remove-la
            if (nomeAntigo) {
                const oldPath = path.join(__dirname, '../uploads', nomeAntigo);
                if (fs.existsSync(oldPath)) {
                    fs.unlink(oldPath, (err) => {
                        if (err) console.error('Erro ao remover imagem antiga:', err);
                    });
                }
            }
            
            imagem.mv(uploadPath, (err) => {
                if (err) reject(err);
                resolve(imagem.name);
            });
        });
    }

    // Remover imagem do sistema de arquivos
    static async removerImagem(nomeImagem) {
        return new Promise((resolve, reject) => {
            const filePath = path.join(__dirname, '../uploads', nomeImagem);
            
            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, (err) => {
                    if (err) reject(err);
                    resolve(true);
                });
            } else {
                resolve(false);
            }
        });
    }
}

module.exports = Produto;
