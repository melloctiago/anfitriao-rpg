const express = require('express');
const router = express.Router();
const personagemController = require('../controllers/personagemController');
const authMiddleware = require('../middleware/authMiddleware');

// isso vai protejer todas as rotas
router.use(authMiddleware);

router.post('/personagens', personagemController.createPersonagem);         
router.get('/personagens', personagemController.getAllPersonagens);         
router.get('/personagens/:id', personagemController.getPersonagemById);     
router.put('/personagens/:id', personagemController.updatePersonagem);     
router.delete('/personagens/:id', personagemController.deletePersonagem); 

module.exports = router;
