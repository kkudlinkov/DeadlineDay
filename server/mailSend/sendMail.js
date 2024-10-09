// sendMail.js
const reminderController = require('../controllers/reminderController');
const userController = require('../controllers/userController')
const taskController = require('../controllers/taskController')
const {createTransport} = require("nodemailer");


function isReminderTime(reminder) {
    const now = new Date();
    const remindAt = new Date(reminder.remind_at);

    // Устанавливаем секунды и миллисекунды в 0
    now.setSeconds(0, 0);
    remindAt.setSeconds(0, 0);

    return now.getTime()  === remindAt.getTime();
}

async function sendMail() {
    try {
        const reminders = await reminderController.getAllMailReminder();
        for (const reminder of reminders) {
            if (isReminderTime(reminder)) {
                const user = await userController.getUserById(reminder.userId);
                const email = user.email;
                const task = await taskController.getTaskById(reminder.taskId);

                const taskData = {
                    id: task.id,
                    title: task.title,
                    description: task.description
                };

                // Создаем транспорт для отправки сообщений
                const transporter = createTransport({
                    service:'gmail',
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD
                    }
                });

                // Создаем сообщение
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: `Напоминание о: ${reminder.info}`,
                    html: `
                        <p>Вы должны сделать задачу: ${taskData.title}</p>
                        <p>Содержание вашей задачи: ${taskData.description}</p>
                        <p>Задача должна быть выполнена не позднее: ${task.deadline_at}</p>
                        <p>Важость задачи: ${task.priority}</p>`};

                // Отправляем сообщение
                await transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Error sending email:', error.message);
                    } else {
                        console.log('Email sent:', info.response);
                        reminderController.deleteReminder(reminder.id);
                    }
                });
            }
        }
    } catch (error) {
        console.error('Error fetching reminders:', error.message);
    }
}

setInterval(sendMail, 60000);

module.exports = sendMail;