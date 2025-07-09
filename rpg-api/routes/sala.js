const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');
const salaController = require('../controllers/salasController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, 'board-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.post('/', authMiddleware, upload.single('imagem_tabuleiro'), salaController.createSala);

router.get('/', authMiddleware, salaController.listarSalas);

router.get('/:id', authMiddleware, salaController.getSalaById);

router.post('/:id/entrar', authMiddleware, salaController.entrarNaSala);

router.delete('/:salaId/tokens/:personagemId', authMiddleware, salaController.removerDoTabuleiro);
module.exports = router;