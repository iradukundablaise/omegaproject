const Parse = require('../../parse-server');

module.exports = {
    index: (req, res) => {
        let Ticket = Parse.Object.extend("Ticket");
        let query = new Parse.Query(Ticket);
        query.limit(20);
        query.include("createdBy");
        query.include("bus");

        if(req.query.query == null){

            query.find().then((tickets) => {
                res.render('admin/tickets/index', {error: false, tickets: tickets});
            }).catch((error) => {
                console.log(error);
                res.render('admin/tickets/index', {error: false, tickets: []});
            });
        }else{
            let User = Parse.Object.extend("_User");
            let queryUser = new Parse.Query(User);
            
            queryUser.equalTo("email", req.query.query);
            queryUser.find().then((results) => {
                query.equalTo("createdBy", results[0]);
                query.find().then((tickets) => {
                    res.render('admin/tickets/index', {error: false, tickets: tickets});
                }).catch((error) => {
                    console.log(error);
                    res.render('admin/tickets/index', {error: false, tickets: []});
                });
            })
        }
    },

    create: (req, res) => {
        res.render('admin/tickets/create');
    },

    show: (req, res) => {
        res.render('admin/tickets/show');
    },

    new: (req, res) => {

    },

    edit: (req, res) => {
        
    },

    update: (req, res) => {

    },

    delete: (req, res) => {

    }
}