const jwt = require('jsonwebtoken')

module.exports = function (req, res, next){
    if (req.method === "OPTIONS"){
        next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1]  //Bearer dsadasd - Так выглядит наш токен
        if (!token){
            res.status(401).json({message: "Пользователь не авторизован"})
        }
        req.user = jwt.verify(token, process.env.SECRET_KEY)
        next()
    } catch (e){
        res.status(401).json({message: "Пользователь не авторизован"})
    }
}