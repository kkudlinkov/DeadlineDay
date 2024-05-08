const sequelize = require("../config/db");
const {DataTypes} = require("sequelize");

const User = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
})

const Task = sequelize.define('tasks', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    status: {type: DataTypes.STRING, allowNull: false, defaultValue: 'New'},
    created_at: {type: DataTypes.DATE, allowNull: false},
    deadline_at: {type: DataTypes.DATE, allowNull: false},
    priority: {type: DataTypes.INTEGER, allowNull: false},
})

const Category = sequelize.define('categories', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    color: {type: DataTypes.STRING, allowNull: false, defaultValue: '36d174'},
    name: {type: DataTypes.STRING, allowNull: false},
})

const Reminder = sequelize.define('reminders', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    info: {type: DataTypes.STRING, allowNull: false},
    remind_at: {type: DataTypes.DATE, allowNull: false},
})

User.hasMany(Task)
Task.belongsTo(User)

User.hasMany(Reminder)
Reminder.belongsTo(User)

User.hasMany(Category)
Category.belongsTo(User)

Task.hasMany(Reminder)
Reminder.belongsTo(Task)

Category.hasMany(Task)
Task.belongsTo(Category)

module.exports = {
    User, Task, Category, Reminder
}