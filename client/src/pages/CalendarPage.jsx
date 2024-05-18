import React, {useState} from 'react';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"
import {useDispatch, useSelector} from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import CreateTask from "../modals/CreateTask";
import moment from "moment/moment";
import Image from "react-bootstrap/Image";
import {deleteReminder} from "../http/reminderApi";
import {deleteUserReminder} from "../store/remindersSlice";
import CreateReminder from "../modals/CreateReminder";
import {deleteTask} from "../http/tasksApi";
import {deleteUserTask} from "../store/taskSlice";
import EditTaskModal from "../modals/EditTaskModal";

const CalendarPage = () => {
    const dispatch = useDispatch();

    const tasks = useSelector(state => state.userTasks.tasks)
    const categories = useSelector(state => state.userCategories.categories)
    const reminders = useSelector(state => state.userReminders.reminders)

    const [editingTask, setEditingTask] = useState(null)

    const [taskVisible, setTaskVisible] = useState(false)
    const [editTaskVisible, setEditTaskVisible] = useState(false)
    const [reminderVisible, setReminderVisible] = useState(false)


    const handleDeleteTask = async (task) => {
        if (window.confirm('Вы точно хотите удалить задачу?')) {
            try {
                let reminder = reminders.find((r) => r.taskId === task.id);
                if (reminder) {
                    await deleteReminder(reminder.id);
                }
                await deleteTask(task.id);
                const index = tasks.findIndex((t) => t.id === task.id);
                dispatch(deleteUserTask(index));
                alert('Задача успешно удалена');
            } catch (error) {
                console.error(error);
                alert('Error deleting task');
            }
        }
    };

    const handeDeleteReminder = async (reminder) => {
        if (window.confirm('Вы дейвстительно хотите удалить напоминание?')) {
            try {
                await deleteReminder(reminder.id)
                console.log(reminder.taskId)
                const index = reminders.findIndex((r) => r.id === reminder.id);
                console.log(index)
                dispatch(deleteUserReminder(index));
                alert("Напоминание успешно удалено");
            } catch (error) {
                console.error(error);
                alert('Error deleting task');
            }
        }
    };


    const [selectedDay, setSelectedDay] = useState(new Date())

    const dayInfo = () => {
        const taskList = tasks.filter(t => {
            const taskDate = new Date(t.deadline_at);
            return taskDate.getFullYear() === selectedDay.getFullYear() &&
                taskDate.getMonth() === selectedDay.getMonth() &&
                taskDate.getDate() === selectedDay.getDate();
        });

        return (
            <div className={'w-100'}>
                <h2>Выбранная дата: {selectedDay.toLocaleDateString()}</h2>
                <ul
                className={'fs-5 d-flex flex-column gap-3'}
                style={{listStyleType:'numeric'}}
                >
                    {taskList.map((task) => (
                        <li key={task.id}>
                            {task.name}
                            <ul
                                style={{listStyleType: 'none', padding:'0'}}
                            >
                                <li>Задача: {task.title}</li>
                                <li>Описание: {task.description}</li>
                                <li>Приоритет задачи: {task.priority}</li>
                                <li className={'d-flex gap-2 align-items-center'}>
                                    Категория:
                                    {categories.find((category) => category.id === task.categoryId) ? (
                                        <>
                                            <p style={{color: `${categories.find((category) => category.id === task.categoryId).color}`}}
                                               className={'m-0'}>{categories.find((category) => category.id === task.categoryId).name}</p>
                                        </>
                                    ) : (
                                        <p className={'m-0'}>Не назначано</p>
                                    )}
                                </li>
                                <li className={"d-flex gap-2 align-items-center"}>
                                    Напоминание:
                                    {reminders.filter((reminder) => reminder.taskId === task.id).length > 0 ? (
                                        <div className={'d-flex gap-2 align-items-center w-100'}>
                                            <p className={'m-0'}>
                                                {moment(reminders.find((reminder) => reminder.taskId === task.id).remind_at).format('YYYY-MM-DD HH:mm')}
                                            </p>
                                            <Image
                                                onClick={() => handeDeleteReminder(reminders.find((reminder) => reminder.taskId === task.id))}
                                                style={{width: '35px', cursor: 'pointer',}}
                                                src={'https://icon-icons.com/icons2/1150/PNG/512/1486504830-delete-dustbin-empty-recycle-recycling-remove-trash_81361.png'}/>
                                        </div>
                                    ) : (
                                        <div onClick={() => {
                                            setReminderVisible(true);
                                            setEditingTask(task)
                                        }} className={'d-flex gap-2 align-items-center w-100'}>
                                            <p className={'m-0'}>Не назначано</p>
                                            <Image
                                                style={{width: '35px', cursor: 'pointer'}}
                                                src={'https://icon-icons.com/icons2/916/PNG/512/Plus_icon-icons.com_71848.png'}/>
                                        </div>
                                    )}
                                </li>
                                <li>Задача создана: ({moment(task.createdAt).format('YYYY-MM-DD HH:mm')})</li>
                                <li>Срок выполнения: ({moment(task.deadline_at).format('YYYY-MM-DD HH:mm')})</li>

                                <Button
                                    onClick={() => {
                                        setEditTaskVisible(true);
                                        setEditingTask(task)
                                    }}
                                    variant="primary">Изменить</Button>
                                <Button onClick={() => handleDeleteTask(task)} variant="danger">
                                    Delete
                                </Button>
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };


    return (
        <Container>
            <Row className={'align-items-center justify-content-center fs-5'}
                 style={{height: '100vh'}}>
                <Col md={7}>
                    <Calendar
                        className="calendar w-100"
                        value={selectedDay}
                        onChange={(value) => setSelectedDay(value)}
                        tileContent={({date, view}) => {
                            const taskDots = tasks.filter(t => {
                                const taskDate = new Date(t.deadline_at);
                                return taskDate.getFullYear() === date.getFullYear() &&
                                    taskDate.getMonth() === date.getMonth() &&
                                    taskDate.getDate() === date.getDate();
                            }).map((task) => {
                                const category = categories.find((category) => category.id === task.categoryId)
                                const color = category ? category.color : '#000000'
                                return <div
                                    key={task.id}
                                    style={{
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%',
                                        backgroundColor: color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>

                                </div>;
                            });
                            return taskDots.length > 0 ? (
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    {taskDots}
                                </div>
                            ) : null;
                        }}
                    />
                    <Button onClick={() => setTaskVisible(true)} variant="success w-100">Создать задачу</Button>
                </Col>
                <Col md={5} className={'h-100 pt-5 d-flex justify-content-center'}>
                    {dayInfo()}
                </Col>
            </Row>
            <CreateTask
                show={taskVisible}
                onHide={() => setTaskVisible(false)}
            />
            <CreateReminder
                show={reminderVisible}
                onHide={() => setReminderVisible(false)}
                editingTask={editingTask}
            />
            <EditTaskModal
                show={editTaskVisible}
                onHide={() => {
                    setEditTaskVisible(false);
                    setEditingTask(null)
                }
                } editingTask={editingTask}/>
        </Container>
    );
};

export default CalendarPage;