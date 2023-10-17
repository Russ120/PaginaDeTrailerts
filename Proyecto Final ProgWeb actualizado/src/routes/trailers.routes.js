const {Router} = require('express');
const router = Router();
const {infoTrailers,RenderTrailersForm, CreateNewTrailer, GetAllTrailers, RenderEditForm, EditTrailer, deleteTrailer} = require('../controllers/trailers.controller')
const {isAdmin} = require('../helpers/auth')

//Ver Trailers
router.get('/infoTrailers/:id',infoTrailers);

//Obtener Todos Los Trailers
router.get('/trailers',GetAllTrailers);

//Obtener Formulario Para Agregar New Trailers
router.get('/trailers/add',isAdmin,RenderTrailersForm);
//Agregar Formulario a la Base De Datos
router.post('/trailers/add',isAdmin,CreateNewTrailer);

//Obtener Formulario lleno Mediante El Id Para Editar un Trailers
router.get('/trailers/edit/:id',isAdmin,RenderEditForm);
//Editar Formulario y enviar a la Base De Datos
router.put('/trailers/edit/:id',isAdmin,EditTrailer);


//Eliminar un trailer de la Base de Datos
router.delete('/trailers/delete/:id',isAdmin,deleteTrailer);


module.exports = router;