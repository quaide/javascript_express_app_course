const Blog = require('../models/blog');
const dayjs = require('dayjs');
var localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);

//blogIndex, blogDetails, blogCreate, blogCreateGet, blogCreatePost, blogDelete

const blogIndex = (req, res) => {
    Blog.find().sort({createdAt: -1})
    .then((result) => {
        res.render('index', { title: 'All Blogs', blogs: result})
    })
    .catch((err) => {
        console.log(err);
    })
}

const blogDetails = (req, res) => {
    const id = req.params.id;

    Blog.findById(id)
    .then(result => {
        const time = dayjs(result.createdAt).format('LLL');
        res.render('details', { blog: result, title: 'Post Details', time});
    })
    .catch(err => {
        res.status(404).render('404', {title: 'Blog not Found'});
    });
}

const blogCreateGet = (req, res) => {
    res.render('create', { title: 'Create a New Blog'});
}

const blogCreatePost = (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        })
}

const blogDelete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs'});
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = {
    blogIndex,
    blogDetails,
    blogCreateGet,
    blogCreatePost,
    blogDelete
}