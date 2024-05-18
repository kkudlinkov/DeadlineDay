require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const sendMail = require('./mailSend/sendMail');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors())
app.use(express.json())
app.use('/api', router)

// Обработчик ошибок
app.use(errorHandler)

const start = async () =>{
    try{
        await sequelize.authenticate() // Подключение к БД
        await sequelize.sync() // Сверяем БД со схемой БД
        sendMail()
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    } catch (e){
        console.log(e)
    }
}

start()

