const router  = require('express').Router();
const usersController = require('../controllers/admin/users');

router.get('/', (req, res) => {
    res.send("Welcome to Omega website !");
})

router.get('/login', usersController.login);
router.post('/login', usersController.loginSession);
router.get('/logout', usersController.logout);

module.exports = router;