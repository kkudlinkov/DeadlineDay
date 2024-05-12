const Router = require('express')
const router = new Router()
const reminderController = require('../controllers/reminderController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, reminderController.create)
router.get('/',authMiddleware, reminderController.getAll)
router.get('/:id',authMiddleware, reminderController.getOne)
router.put('/:id',authMiddleware, reminderController.update)
router.delete('/:id',authMiddleware, reminderController.delete)


module.exports = router