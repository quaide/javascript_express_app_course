const User = require('../models/User');
const jwt = require('jsonwebtoken');

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {email: '', password: ''};

    //incorrect email while logging in
    if(err.message === 'User does not exist') {
        errors.email = 'That email does not have an account';
    }

    //incorrect password while logging in
    if(err.message === 'Incorrect password') {
        errors.password = 'Incorrect password';
    }

    //duplicate email
    if (err.code === 11000) {
        errors.email = 'That email has already signed up'
        return errors;
    }

    //validation errors, creating custom messages by cycling through values of errors, finding the message, and updating errors object
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'quaide test secret', {
        expiresIn: maxAge
    });
}

module.exports.signupGet = (req, res) => {
    res.render('signup', {title: 'Sign Up'})
};

module.exports.loginGet = (req, res) => {
    res.render('login', {title: 'Log in'})
};

module.exports.signupPost = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        const user = await User.create({ email, password, firstName, lastName});
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({user: user._id });
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
};

module.exports.loginPost = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
        res.status(200).json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports.logoutGet = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
};