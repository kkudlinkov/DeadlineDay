import React, {useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import moment from "moment";
import CreateTask from "../modals/CreateTask";
import {deleteUserTask} from "../store/taskSlice";
import {deleteTask} from "../http/tasksApi";
import EditTaskModal from "../modals/EditTaskModal";
import Image from "react-bootstrap/Image";
import {deleteReminder} from "../http/reminderApi";
import {deleteUserReminder} from "../store/remindersSlice";
import CreateReminder from "../modals/CreateReminder";

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    const tasks = useSelector(state => state.userTasks.tasks)
    const categories = useSelector(state => state.userCategories.categories)
    const reminders = useSelector(state => state.userReminders.reminders)

    const [taskVisible, setTaskVisible] = useState(false)
    const [editTaskVisible, setEditTaskVisible] = useState(false)
    const [reminderVisible, setReminderVisible] = useState(false)

    const activeTasksCount = tasks.length;

    const [editingTask, setEditingTask] = useState(null)

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

    const sortedTasks = useMemo(() => {
        return tasks.slice().sort((a, b) => {
            if (a.deadline_at < b.deadline_at) {
                return -1;
            } else if (a.deadline_at > b.deadline_at) {
                return 1;
            } else {
                return 0;
            }
        });
    }, [tasks]);

    return (
        <Container>
            <Row className="align-items-center pt-5">
                <Col>
                    <h2>Данные пользователя</h2>
                    <p>
                        <strong>Никнейм:</strong> {user.username}
                    </p>
                    <p>
                        <strong>Почта:</strong> {user.email}
                    </p>
                    <p>
                        <strong>Active Tasks:</strong> {activeTasksCount}
                    </p>
                </Col>
                <Col md="auto" className="flex-column d-flex gap-2 justify-content-center">
                    <Button onClick={() => setTaskVisible(true)} variant="secondary">Создать задачу</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Задачи</h2>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Описание</th>
                            <th>Приоритет</th>
                            <th>Дедлайн</th>
                            <th>Категория</th>
                            <th>Напоминание в</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sortedTasks.map((task) => (
                            <tr key={task.id}>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.priority}</td>
                                <td>{moment(task.deadline_at).format('YYYY-MM-DD HH:mm')}</td>
                                <td>
                                    <div className={'d-flex gap-2 align-items-center'}>
                                        {categories.find((category) => category.id === task.categoryId) ? (
                                            <>
                                                <p className={'m-0'}>{categories.find((category) => category.id === task.categoryId).name}</p>
                                                <div style={{
                                                    paddingTop: '0',
                                                    height: '18px',
                                                    width: '18px',
                                                    borderRadius: '50%',
                                                    backgroundColor: categories.find((category) => category.id === task.categoryId).color,
                                                }}></div>
                                            </>
                                        ) : (
                                            <p className={'m-0'}>Не назначано</p>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    {reminders.filter((reminder) => reminder.taskId === task.id).length > 0 ? (
                                        <div className={'d-flex align-items-center'}>
                                            <p className={'m-0'} style={{width: '75%'}}>
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
                                        }} className={'d-flex align-items-center'}>
                                            <p className={'m-0'} style={{width: '75%'}}>Не назначано</p>
                                            <Image
                                                style={{width: '35px', cursor: 'pointer'}}
                                                src={'https://icon-icons.com/icons2/916/PNG/512/Plus_icon-icons.com_71848.png'}/>
                                        </div>
                                    )}
                                </td>
                                <td className='gap-2'>
                                    <Button
                                        onClick={() => {
                                            setEditTaskVisible(true);
                                            setEditingTask(task)
                                        }}
                                        variant="primary">Изменить</Button>
                                    <Button onClick={() => handleDeleteTask(task)} variant="danger">
                                        Удалить
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <CreateTask
                show={taskVisible}
                onHide={() => setTaskVisible(false)}
            />

            <EditTaskModal
                show={editTaskVisible}
                onHide={() => {
                    setEditTaskVisible(false);
                    setEditingTask(null)
                }
                } editingTask={editingTask}/>

            <CreateReminder
                show={reminderVisible}
                onHide={() => setReminderVisible(false)}
                editingTask={editingTask}
            />

        </Container>
    );
};

export default Profile;