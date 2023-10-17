const passport = require('passport');
const Strategy = require('passport-local');
const User = require('../models/User');

passport.use(new Strategy({
    usernameField: 'Correo',
    passwordField: 'Contraseña',

}, async (Correo, Contraseña, done) => {
    
    const user = await User.findOne({ Correo: Correo });
    if (!user) {
        return done(null, false, { message: 'Este Usuario no existe' })
    }
    else {
        if (user.Contraseña == Contraseña) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Contraseña incorrecta' })
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id).lean();
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});