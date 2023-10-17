const usersCtrl = {};
const User = require('../models/User');
const Movie = require('../models/Movie');
const passport = require('passport');

usersCtrl.GetAllTrailersByCategory = async (req, res) => {
    const errors = [];
    const { Categoria } = req.query;
    let trailers;
    trailers = await Movie.find({ Categoria: Categoria }).lean();
    if (trailers.length === 0) {
        errors.push({ Text: `Hasta ahora no tenemos peliculas de: ${Categoria}` });
        trailers = await Movie.find().lean();
    }
    res.render('trailers', { errors,trailers });
};


usersCtrl.RenderSignUpForm = (req, res) => {
    res.render('users/signup')
}
usersCtrl.addSignUp = async (req, res) => {
    const errors = [];
    const { ImgUrl, Usuario, Correo, Contraseña, ConfirmarClave } = req.body;
    if (Contraseña != ConfirmarClave) {
        errors.push({ Text: 'Las Contraseñas No Coinciden.' });
    }
    if (Contraseña.length < 4) {
        errors.push({ Text: 'La Contraseña Debe de tener almenos 4 caracteres.' });
    }
    // const correoUser = User.findOne({Correo});
    // console.log(correoUser)
    // if (correoUser > 0 || correoUser != null) {
    //     errors.push({ Text: 'El Correo ya existe en la BD.' });
    // }
    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            Usuario,
            Correo,
            Contraseña,
            ConfirmarClave
        })
    } else {
        const correoUser = await User.findOne({ Correo: Correo });
        if (correoUser) {
            req.flash('errors_msg', 'El Correo ya existe en la BD.');
            res.render("users/signup",
                {
                    Usuario,
                    ImgUrl,
                    Contraseña,
                    ConfirmarClave
                });
        } else {
            const NewUser = await new User({  Usuario, ImgUrl, Correo, Contraseña })
            await NewUser.save();
            req.flash('success_msg', 'Estas Registrado!!')
            res.redirect("/users/login");
        }

    }
}

usersCtrl.loginForm = (req, res) => {
    res.render('users/login')
}
usersCtrl.login = passport.authenticate("local", {
    successRedirect: "/trailers",
    failureRedirect: "/users/login",
    failureFlash: true,
});

usersCtrl.logout = async (req, res, next) => {
    await req.logout((err) => {
      if (err) return next(err);
      req.flash("success_msg", "Session Cerrada Exitosamente!!");
      res.redirect("/users/login");
    });
  };
module.exports = usersCtrl;