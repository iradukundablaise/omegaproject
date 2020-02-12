const Parse = require('../../parse-server');

module.exports = {
    index: (req, res) => {

    },

    create: (req, res) => {
        let user = new Parse.User();
        user.set("username", req.body.email);
        user.set("password", req.body.password);
        user.set("email", req.body.email);
        user.signUp().then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    },

    update: (req, res) => {

    },

    delete: (req, res) => {

    },

    login: (req, res) => {
        res.render('login.ejs', { error: ""});
    },

    loginSession: (req, res) => {
        let user = Parse.User.logIn(req.body.email, req.body.password);
        user.then((account) => {
            req.session.user = account;
            res.redirect('/admin');
        }).catch((error) => {
            res.render('login.ejs', { error: "Email or Password is incorrect !"});
        })
    },

    logout: (req, res) => {
        delete req.session.user;
        res.redirect('/login');
    },

    signup: (req, res) => {

    }
}