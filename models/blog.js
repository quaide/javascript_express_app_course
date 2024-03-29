const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({ 
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author_email: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;