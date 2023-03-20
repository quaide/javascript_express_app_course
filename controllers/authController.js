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

module.exports.signupGet = (req, res) => {
    res.render('signup', {title: 'Sign Up'})
};

module.exports.loginGet = (req, res) => {
    res.render('login', {title: 'Log in'})
};

module.exports.accountGet = (req, res) => {
    res.render('account', {title: 'Account Management'})
}

module.exports.logoutGet = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
};

module.exports.signupPost = async (req, res) => {
    
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

module.exports.loginPost = async (req, res) => {
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

module.exports.accountPut = async (req, res) => {
    jwt.verify(token, 'quaide test secret', async (err, decodedToken) => {
        if(err) {
            res.redirect('/login');
        }
        else {
            try {
                const updateUser = req.body;
        
                User.forEach(user => {
                if (user.id === parseInt(req.params.id)) {
                    user.email = updateUser.email ? updateUser.email : user.email;
                    res.json({ msg: "User updated", user });
                }
            });
          } catch (err) {
            res.sendStatus(400);
          };
        }
    });
}