const ApiError = require('../error/ApiError')
const {Category, User} = require('../models/models')

class CategoryController {
    async create(req, res, next) {
        try {
            const {name, color } = req.body;
            const userId = req.user.id
            const category = await Category.create({name, color, userId});
            return res.json(category);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const categories = await Category.findAll({where: {userId: req.user.id}});
            return res.json(categories);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const id = req.params.id;
            const category = await Category.findOne({where: {id, userId: req.user.id}});
            if (!category) {
                return next(ApiError.badRequest('Category not found'));
            }
            return res.json(category);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async update(req, res, next) {
        try {
            const id = req.params.id;
            const {name, color} = req.body;
            const category = await Category.findOne({where: {id, userId: req.user.id}});
            if (!category) {
                return next(ApiError.badRequest('Category not found'));
            }
            await category.update({name, color});
            return res.json(category);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }

    async delete(req, res, next) {
        try {
            const id = req.params.id;
            const category = await Category.findOne({where: {id, userId: req.user.id}});
            if (!category) {
                return next(ApiError.badRequest('Category not found'));
            }
            await category.destroy();
            return res.json({message: 'Category deleted successfully'});
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }
}

module.exports = new CategoryController();