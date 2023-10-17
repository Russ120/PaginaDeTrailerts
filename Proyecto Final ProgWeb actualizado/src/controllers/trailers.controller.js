const trailersCtrl = {};
const Movie = require('../models/Movie');


trailersCtrl.infoTrailers = async (req,res) =>{
    const id = req.params.id;
    const {_id,Categoria, Titulo, Año, Director, Actores, Reseña, ImgUrl, LinkVideo, User} = await Movie.findById(id).lean();
    res.render('trailers/infoTrailers', {_id,Categoria,Titulo, Año, Director, Actores, Reseña, ImgUrl, LinkVideo, User});
};


trailersCtrl.RenderTrailersForm = (req,res) => {
    res.render('trailers/newtrailer')
};
trailersCtrl.CreateNewTrailer = async (req,res) => {

    try {
        const movie = Movie(req.body)
        await movie.save() 
        // req.flash('success_msg', 'Pelicula Agregada Correctamente!!') 
        res.redirect("/trailers");
    } catch (error) {
        console.log(error);
    }
};
trailersCtrl.GetAllTrailers = async (req,res) => {
    const trailers = await Movie.find().lean();
    res.render('trailers', {trailers})
};

trailersCtrl.RenderEditForm = async (req,res) =>{
    const id = req.params.id;
    const {_id,Categoria, Titulo, Año, Director, Actores, Reseña, ImgUrl, LinkVideo, User} = await Movie.findById(id).lean();
    res.render('trailers/updatetrailer', {_id,Categoria,Titulo, Año, Director, Actores, Reseña, ImgUrl, LinkVideo, User});
};
trailersCtrl.EditTrailer = async (req,res) =>{
    const movie = req.body;
    await Movie.findByIdAndUpdate(req.params.id, movie);
    req.flash('success_msg', 'Pelicula Editada Correctamente!!');
    res.redirect('/trailers');
};

trailersCtrl.deleteTrailer = async (req,res) =>{
    const movie = req.body;
    await Movie.findByIdAndRemove(req.params.id, movie);
    req.flash('success_msg', 'Pelicula Eliminada Correctamente!!');
    res.redirect('/trailers');
};

module.exports = trailersCtrl;