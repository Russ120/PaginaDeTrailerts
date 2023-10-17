//Imports
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const flash = require('connect-flash')
const session = require('express-session');
const passport = require('passport');
const exphbs = require('express-handlebars');
const methodOverride =require('method-override')



// Initializations
const app = express();
require('./config/passport');


// Settings
app.set('port', process.env.PORT || 1313);
app.set('views', path.join(__dirname, 'views'));
const hbs = exphbs.create({    
    defaultLayout: "MainLayout", 
    layoustDir: path.join(app.get("views"), "layouts"), 
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs"
});
app.engine('.hbs', hbs.engine);
app.set("view engine", ".hbs");

// Helper personalizado para verificar si el usuario es administrador
hbs.handlebars.registerHelper('isAdmin', function(user, options) {
    if (user && user.Admin) {
        return options.fn(this);
    }
    return options.inverse(this);
});

// Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(methodOverride('_method'));



//Global Variables
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.errors_msg = req.flash('errors_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null;
    next();
});

//Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/trailers.routes'));
app.use(require('./routes/users.routes'));



//Static Files
app.use(express.static(path.join(__dirname, 'public')));
module.exports = app;