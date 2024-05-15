const ApiError = require('../error/ApiError')
const {User, Task, Category} = require('../models/models')

class TaskController {
    async create(req, res, next) {
        try {
            console.log(req)
            const {title, description, deadline_at, priority, categoryId} = req.body;
            const userId = req.user.id; // assuming req.user is set in the middleware
            const task = await Task.create({title, description, deadline_at, priority, categoryId, userId});
            return res.json(task);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const tasks = await Task.findAll({where: {userId: req.user.id}});
            return res.json(tasks);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const id = req.params.id;
            const task = await Task.findOne({where: {id, userId: req.user.id}});
            if (!task) {
                return next(ApiError.badRequest('Task not found'));
            }
            return res.json(task);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async update(req, res, next) {
        try {
            const id = req.params.id;
            const {title, description, deadline_at, priority, categoryId} = req.body;
            const task = await Task.findOne({where: {id, userId: req.user.id}});
            if (!task) {
                return next(ApiError.badRequest('Task not found'));
            }
            await task.update({title, description, deadline_at, priority, categoryId});
            return res.json(task);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async delete(req, res, next) {
        try {
            const id = req.params.id;
            const task = await Task.findOne({where: {id, userId: req.user.id}});
            if (!task) {
                return next(ApiError.badRequest('Task not found'));
            }
            await task.destroy();
            return res.json({message: 'Task deleted successfully'});
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

}

module.exports = new TaskController()