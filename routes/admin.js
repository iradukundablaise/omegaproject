const router = require('express').Router();

const busesController = require('../controllers/admin/buses');
const ticketsController = require('../controllers/admin/tickets');
const usersController = require('../controllers/admin/users');

router.get('/', (req, res) => {
    res.render('admin/index');
});

// buses
router.get('/buses', busesController.index);
router.get('/buses/create', busesController.create);
router.get('/buses/:id', busesController.show);
router.get('/buses/:id/edit', busesController.edit);
router.post('/buses', busesController.new);
router.put('/buses/:id', busesController.update);
router.delete('/buses/:id', busesController.delete);


// tickets
router.get('/tickets', ticketsController.index);
router.get('/tickets/:id', ticketsController.show);
router.get('/tickets/:id/edit', ticketsController.edit);
router.post('/tickets', ticketsController.new);
router.put('/tickets/:id', ticketsController.update);
router.delete('/tickets/:id', ticketsController.delete);

module.exports = router;