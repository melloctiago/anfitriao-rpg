const express = require('express');
const router = express.Router();
const personagemController = require('../controllers/personagemController');
const authMiddleware = require('../middleware/authMiddleware'); 

//aqui vai proteger todas as rotas abaixo
router.use(authMiddleware);

// Rotas para Personagem
router.post('/personagens', personagemController.createPersonagem);
router.get('/personagens', personagemController.getAllPersonagens);
router.get('/personagens/:id', personagemController.getPersonagemById);
router.put('/personagens/:id', personagemController.updatePersonagem);
router.delete('/personagens/:id', personagemController.deletePersonagem);

module.exports = router;