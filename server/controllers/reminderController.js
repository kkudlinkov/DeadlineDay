const ApiError = require('../error/ApiError')
const {Reminder, User, Task} = require('../models/models')


class ReminderController {
    async create(req, res, next) {
        try {
            const {info, remind_at, taskId} = req.body;
            const userId = req.user.id;
            const task = await Task.findOne({where: {id: taskId, userId}});
            if (!task) {
                return next(ApiError.badRequest('Task not found'));
            }
            const reminder = await Reminder.create({info, remind_at, userId, taskId});
            return res.json(reminder);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const reminders = await Reminder.findAll({where: {userId: req.user.id}});
            return res.json(reminders);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const id = req.params.id;
            const reminder = await Reminder.findOne({where: {id, userId: req.user.id}});
            if (!reminder) {
                return next(ApiError.badRequest('Reminder not found'));
            }
            return res.json(reminder);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async update(req, res, next) {
        try {
            const id = req.params.id;
            const {info, remind_at} = req.body;
            const reminder = await Reminder.findOne({where: {id, userId: req.user.id}});
            if (!reminder) {
                return next(ApiError.badRequest('Reminder not found'));
            }
            await reminder.update({info, remind_at});
            return res.json(reminder);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async delete(req, res, next) {
        try {
            const id = req.params.id;
            const reminder = await Reminder.findOne({where: {id, userId: req.user.id}});
            if (!reminder) {
                return next(ApiError.badRequest('Reminder not found'));
            }
            await reminder.destroy();
            return res.json({message: 'Reminder deleted successfully'});
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
}

module.exports = new ReminderController();