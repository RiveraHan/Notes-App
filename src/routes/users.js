const express = require('express');
const User = require('../models/User');
const router = express.Router();
const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}))

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});


router.post('/users/signup', async(req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];

    if (!name) errors.push({ text: 'Please, Insert your Name' });
    if (!email) errors.push({ text: 'Please, Insert your Email' });
    if (!password) errors.push({ text: 'Please, Insert your Password' });
    if (!confirm_password) errors.push({ text: 'Please, Insert your Confirm Password' });
    if (password.length < 6) errors.push({ text: 'Password must be least 6 characters' });
    if (password !== confirm_password) errors.push({ text: 'Password do not match' });

    if (errors.length > 0) {

        res.render('users/signup', { errors, name, email, password, confirm_password });
    } else {
        const emailUser = await User.findOne({ email });
        if (emailUser) {

            req.flash('error_msg', 'A user with that email already exists');
            return res.redirect('/users/signup');
        }

        const newUser = new User({ name, email, password });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'You are registered');
        res.redirect('/users/signin');

    }


});

router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})
module.exports = router;