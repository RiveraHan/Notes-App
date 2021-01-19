const User = require('../models/User');
const passport = require('passport');

const usersCtrl = {

    renderSignUpForm: (req, res) => {
        res.render('users/signup');
    },
    signup: async(req, res) => {

        const { name, email, password, confirm_password } = req.body;
        const errors = [];

        if (!name) errors.push({ text: 'Please, Insert your Name' });
        if (!email) errors.push({ text: 'Please, Insert your Email' });
        if (!password) errors.push({ text: 'Please, Insert your Password' });
        if (!confirm_password) errors.push({ text: 'Please, Insert your Confirm Password' });
        if (password.length < 6) errors.push({ text: 'Password must be least 6 characters' });
        if (password !== confirm_password) errors.push({ text: 'Password do not match' });

        if (errors.length > 0) {

            res.render('users/signup', {
                errors,
                name,
                email
            });
        } else {
            // Look for email coincidence
            const emailUser = await User.findOne({ email: email });
            if (emailUser) {
                req.flash("error_msg", "The Email is already in use.");
                res.redirect("/users/signup");
            } else {
                // Saving a New User
                const newUser = new User({ name, email, password });
                newUser.password = await newUser.encryptPassword(password);
                await newUser.save();
                req.flash("success_msg", "You are registered.");
                res.redirect("/users/signin");
            }
        }
    },
    renderSignInForm: (req, res) => {
        res.render("users/signin");
    },

    signin: passport.authenticate('local', {
        failureRedirect: '/users/signin',
        successRedirect: '/notes',
        failureFlash: true
    }),
    logout: (req, res) => {
        req.logout();
        req.flash('success_msg', 'You are logged out now.');
        res.redirect('/users/signin');
    }

}

module.exports = usersCtrl;