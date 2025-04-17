const express= require('express')
const userController = require('../controllers/userController')
const eventController = require('../controllers/eventController')
const boysController = require('../controllers/boysController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const eventMiddleware = require('../middleware/eventMiddleware')
const multerMidleware = require('../middleware/multerMidleware')
const router = new express.Router()

router.post('/login',boysController.boysLoginController)
router.post('/add-event',jwtMiddleware,eventController.addEventsController)
router.get('/status/:id/update', eventController.updateStatusController);
router.get('/get-event',jwtMiddleware, eventController.getEventsController);
// add boys
router.post('/add-boys',jwtMiddleware,multerMidleware.single('imgUrl'),boysController.addBoysController)
router.post('/login-boys',boysController.boysLoginController)
router.post('/scan-boys',eventMiddleware,boysController.scanAndAddBoysController)
router.get('/workers',eventMiddleware,boysController.scannedBoysController)
// get all boys that added by the user getAllBoysController
router.get('/all-boys',jwtMiddleware,boysController.getAllBoysController)
// work done existing boy
router.put('/exit-boy',eventMiddleware,boysController.scanAndExistController)
router.get('/event/:id/detail',eventController.getEventsByIdController)
router.get('/service/:id',eventController.individualServiceController)
router.post('/events',eventController.boysEventsController)
router.post('/current-events',eventController.currentEventConttroller)

module.exports = router 