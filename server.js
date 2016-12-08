const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

// partials footer , header
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', hbs);
//setting static page with middleware
//express middleware that keep track how server is working
app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n');
    console.log(log);
    next();
});

// app.use((req,res,next) => {
//    res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));


// helper for footer date
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screameIt',(text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('<h1>Hello express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home page',
        WelcomeMessage: 'Welcome to my website'
    });
});


// creating about page (new route)
app.get('/about', (req, res) => {
    //send data to page
    res.render('about.hbs', {
        pageTitle: 'AboutPage',
    });
});


app.get('/bad', (req, res) => {
    res.send({
        error: 'Error'
    });
});


app.listen(3000);