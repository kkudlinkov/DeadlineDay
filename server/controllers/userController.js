const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Task} = require("../models/models")

const generateJWT = (id, username, email, role) => {
    return jwt.sign(
        {id, username, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {username, email, password, role} = req.body
        if (!email || !password || !username) {
            return next(ApiError.badRequest('Неверный mail, пароль или логин'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь стаким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 4)
        const user = await User.create({username, email, role, password: hashPassword})
        const token = generateJWT(user.id, user.username, user.email, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {username, email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.badRequest('Пользователь с таким email не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword){
            return next(ApiError.badRequest('Неверный пароль'))
        }
        const token = generateJWT(user.id, user.username, user.email, user.role)
        return res.json({token})

    }

    async check(req, res, next) {
        const token = generateJWT(req.user.id,  req.user.username, req.user.email, req.user.role)
        return res.json({token})
    }

    async getUserById(id) {
        return await User.findOne({where: {id}});
    }
}

module.exports = new UserController()