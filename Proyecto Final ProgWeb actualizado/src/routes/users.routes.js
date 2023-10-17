const {Router} = require('express');
const router = Router();
const {GetAllTrailersByCategory,RenderSignUpForm, addSignUp, loginForm, login, logout} = require('../controllers/users.controller')

router.get('/trailers/search', GetAllTrailersByCategory);

router.get('/users/signup', RenderSignUpForm);
router.post('/users/signup', addSignUp);

router.get('/users/login', loginForm);
router.post('/users/login', login);

router.get('/users/logout',logout);

module.exports = router;