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

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    const tasks = useSelector(state => state.userTasks.tasks)

    const [taskVisible, setTaskVisible] = useState(false)
    const [editTaskVisible, setEditTaskVisible] = useState(false)

    const activeTasksCount = tasks.length;

    const [editingTask, setEditingTask] = useState(null)


    const handleDeleteTask = async (task) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await deleteTask(task.id);
                const index = tasks.findIndex((t) => t.id === task.id);
                dispatch(deleteUserTask(index));
                alert('Task deleted successfully');
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
                <Col md="8">
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
                    <Button variant="primary">Изменить свои данные</Button>
                    <Button onClick={() => setTaskVisible(true)} variant="secondary">Создать задачу</Button>
                    <Button variant="success">Создать категорию</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Задачи</h2>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Priority</th>
                            <th>Deadline</th>
                            <th>Created At</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sortedTasks.map((task) => (
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.priority}</td>
                                <td>{moment(task.deadline_at).format('YYYY-MM-DD HH:mm')}</td>
                                <td>{moment(task.createdAt).format('YYYY-MM-DD HH:mm')}</td>
                                <td>{task.status}</td>
                                <td className='d-flex gap-2'>
                                    <Button
                                        onClick={() => {
                                            setEditTaskVisible(true);
                                            setEditingTask(task)
                                        }}
                                        variant="primary">Изменить</Button>
                                    <Button onClick={() => handleDeleteTask(task)} variant="danger">
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <CreateTask show={taskVisible} onHide={() => setTaskVisible(false)}/>
            <EditTaskModal show={editTaskVisible} onHide={() => {
                setEditTaskVisible(false);
                setEditingTask(null)
            }
            } editingTask={editingTask}/>
        </Container>
    );
};

export default Profile;