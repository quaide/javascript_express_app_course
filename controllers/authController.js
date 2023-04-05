const User = require('../models/User');
const jwt = require('jsonwebtoken');

//handle errors
const handleErrors = (err) => {
    //this is where console is outputting user validation failed
    console.log(err.message, err.code);
    let errors = {email: '', password: '', firstName: '', lastName: ''};

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
    //this is for errors to display on sign up page
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}

const createToken = (id) => {
    return jwt.sign({ id }, 'quaide test secret', {
        expiresIn: '1h'
    });
}

const signupGet = (req, res) => {
    res.render('signup', {title: 'Sign Up'})
};

const loginGet = (req, res) => {
    res.render('login', {title: 'Log in'})
};

const accountGet = (req, res) => {
    const id = req.params.id;
    User.findById(id)
    .then(result => {
        res.render('account', {account: result, title: 'Account Management'});
    })
    .catch(err => {
        res.status(404).render('404', {title: 'Account not found'});
    });
};

const logoutGet = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
};

const signupPost = async (req, res) => {
    
    const { firstName, lastName, email, password } = req.body;

    try {
        const user = await User.create({ firstName, lastName, email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, expiresIn: '1h'});
        res.status(201).json({user: user._id });
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
};

const loginPost = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, expiresIn: '1h'});
        res.status(200).json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

const accountPost = async (req, res) => {
    
    const id = req.params.id;
    const {newEmail} = req.body;
    let user = await User.findById(id);
    user.updateOne({
        '_id': id,
        'email': newEmail
    })
    .then(result => {
        res.redirect('/');
    })
}

module.exports = {
    signupGet,
    loginGet,
    accountGet,
    logoutGet,
    signupPost,
    loginPost,
    accountPost
}