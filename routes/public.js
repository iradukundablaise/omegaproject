const router  = require('express').Router();
const usersController = require('../controllers/admin/users');

router.get('/', (req, res) => {
    res.redirect('/admin');
})

router.get('/login', usersController.login);
router.post('/login', usersController.loginSession);
router.get('/logout', usersController.logout);

module.exports = router;