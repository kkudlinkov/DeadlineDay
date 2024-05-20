const Router = require('express')
const router = new Router()
const taskController = require('../controllers/taskController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware ,taskController.create)
router.get('/', authMiddleware, taskController.getAll)
router.get('/:id', authMiddleware, taskController.getOne)
router.put('/:id', authMiddleware, taskController.update)
router.delete('/:id', authMiddleware, taskController.delete)

module.exports = router