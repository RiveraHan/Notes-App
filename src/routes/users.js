const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});


router.post('/users/signup', async(req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];

    if (name <= 0) errors.push({ text: 'Please, Insert your Name' });
    if (email <= 0) errors.push({ text: 'Please, Insert your Email' });
    if (password <= 0) errors.push({ text: 'Please, Insert your Password' });
    if (confirm_password <= 0) errors.push({ text: 'Please, Insert your Confirm Password' });
    if (password.length < 6) errors.push({ text: 'Password must be least 6 characters' });
    if (password !== confirm_password) errors.push({ text: 'Password do not match' });

    if (errors.length > 0) {

        res.render('users/signup', { errors, name, email, password, confirm_password });
    } else {
        try {
            const newUser = new User({ name, email, password, confirm_password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'You are registered');
            res.redirect('/users/signin');

        } catch (e) {
            // FIXME: Resolv problem with message error
            req.flash('error_msg', 'The Email is already in use');
            res.render('users/signup', { errors, name, email, password, confirm_password });
        }
    }


})
module.exports = router;