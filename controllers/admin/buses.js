const Parse = require('../../parse-server');

module.exports = {
    index: (req, res) => {
        let buses = Parse.Object.extend("Bus");
        let query = new Parse.Query(buses);
        query.descending('updatedAt');
        query.limit(20);
        query.find().then((results) => {
            res.render('admin/buses/index', { error: false, buses : results });
        }).catch((error) => {
            res.render('admin/buses/index', { error: true, buses: [] });
        })

    },

    create: (req, res) => {
        res.render('admin/buses/create');
    },

    show: (req, res) => {

    },

    new: (req, res) => {
        let Buses = Parse.Object.extend("Bus");
        let bus = new Buses();
        let params = req.session.user;
        params['className'] = "_User";

        let user = Parse.Object.fromJSON(params);

        let seats = [];

        for(let i=0; i<29; i++){
            seats.push(true)
        }

        bus.set('from', req.body.from);
        bus.set('to', req.body.to);
        bus.set('time', req.body.time);
        bus.set('date', req.body.date);
        bus.set('createdBy', user);
        bus.set('updatedBy', user);
        bus.set('published', true);
        bus.set('seats', seats);

        bus.save().then((result) => {
            res.redirect("/admin/buses");
        }).catch((error) => {
            res.redirect("/admin/buses");
        });
    },

    edit: (req, res) => {
        let Buses = Parse.Object.extend("Bus");
        let query = new Parse.Query(Buses);
        query.get(req.params.id)
        .then((bus) => {
            res.render('admin/buses/edit', { error: false, bus: bus.toJSON()});
        }).catch((error) => {
            console.log(error);
        });
    },

    update: (req, res) => {

        let Bus = Parse.Object.extend("Bus");
        let query = new Parse.Query(Bus);

        let params = req.session.user;
        params['className'] = "_User";

        let user = Parse.Object.fromJSON(params);

        query.get(req.params.id).then((bus) => {
            bus.set('time', req.body.time);
            bus.set('date', req.body.date);
            bus.set('updatedBy', user);
            bus.save().then((result) => { 
                res.redirect("/admin/buses");
            }).catch((error) => {
                res.redirect("/admin/buses");
            });
        });
    },

    delete: (req, res) => {
        let Bus = Parse.Object.extend("Bus");
        let query = new Parse.Query(Bus);
        query.get(req.params.id).then((bus) => {
            bus.destroy().then((result) => { 
                res.redirect('/admin/buses');
            }).catch((error) => {
                res.redirect('/admin/buses');
            });
        });
    }
}