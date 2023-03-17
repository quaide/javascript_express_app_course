const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { checkUser } = require('./middleware/authMiddleware');
require('dotenv').config();

//express app
const app = express();

//mongoDB connection string
const dbURI = `mongodb+srv://${process.env.blog_username}:${process.env.blog_password}@nodecourse.h4qkmfb.mongodb.net/nodeCourse?retryWrites=true&w=majority`;

mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

app.get('*', checkUser);

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
});

app.use('/blogs', blogRoutes);
app.use(authRoutes);

//404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
})