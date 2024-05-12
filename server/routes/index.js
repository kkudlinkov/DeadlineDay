const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const taskRouter = require('./taskRouter')
const reminderRouter = require('./reminderRouter')


router.use('/user', userRouter)
router.use('/task', taskRouter)
router.use('/category', categoryRouter)
router.use('/reminder', reminderRouter)


module.exports = router