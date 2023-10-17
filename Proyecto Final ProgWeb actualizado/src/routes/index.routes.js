const {Router} = require('express');
const router = Router();
const {RenderIndex,RenderLogin} = require('../controllers/index.controller')
//Obtener Index
router.get('/', RenderIndex);

module.exports = router;