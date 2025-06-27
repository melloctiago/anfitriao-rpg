const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Cria a pasta uploads se não existir
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configuração do Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Ex: miniatura-168999.png
        const ext = path.extname(file.originalname);
        const name = `miniatura-${Date.now()}${ext}`;
        cb(null, name);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    fileFilter: (req, file, cb) => {
        const isImage = file.mimetype.startsWith('image/');
        cb(null, isImage);
    }
});

// Rota de upload
router.post('/upload', upload.single('icone'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ erro: 'Nenhuma imagem enviada.' });
    }

    const urlImagem = `/uploads/${req.file.filename}`;
    return res.status(200).json({ mensagem: 'Imagem enviada com sucesso!', url: urlImagem });
});

module.exports = router;
