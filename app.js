const express = require('express');
const morgan = require('morgan');

//express app
const app = express();

//register view engine
app.set('view engine', 'ejs');
//app.set('views', 'myviews');

//listen for requests
app.listen(3000);

//hard code alternative to the morgan library
// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log('host: ', req.hostname);
//     console.log('path: ', req.path);
//     console.log('method: ', req.method);
//     next();
// });

//middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    //res.send('<p>home page</p>');
    //res.sendFile('./views/index.html', { root: __dirname });
    const blogs = [
        {title: 'Dev Study', snippet: 'Quaide is using this course to study JavaScript web apps.'},
        {title: 'Best Dog in the World', snippet: 'In a new article written by the New York Times, it has been determined that Quaide\'s dog Razz is the goodest dog in history.'},
        {title: 'What is Node.js?', snippet: 'Originally, JavaScript (JS) was designed to run in browsers, using JS engines. In 2009, it was then embedded in a C++ program known as Node, using Google\'s V8 JS engine. It can now be run outside of a browser!'},
      ];
    res.render('index', { title: 'Home', blogs});
});

app.get('/about', (req, res) => {
    //res.send('<p>about page</p>');
    //res.sendFile('./views/about.html', { root: __dirname });
    res.render('about', { title: 'About'});
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a New Blog'});
})

//404 page
//position is important - app.get "breaks"
app.use((req, res) => {
    //res.status(404).sendFile('./views/404.html', {root: __dirname});
    res.status(404).render('404', {title: '404'});
})