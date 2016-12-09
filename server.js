const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


//heroku port
const port = process.env.PORT || 3000;

var app = express();

// partials footer , header
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', hbs);

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

//setting static page with middleware
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
        pageTitle: 'About Page',
    });
});


//1. project page challenge
//2. add view portfolia at middle text
//3. partials header add porfolio a href
// push to github and heroku

app.get('/project', (req,res) => {
    res.render('project.hbs', {
        pageTitle: 'Project Page',

    })
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'Error'
    });
});


app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});