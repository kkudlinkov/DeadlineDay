import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {createTask} from "../http/tasksApi";
import {useDispatch} from "react-redux";
import {addNewTask} from "../store/taskSlice";

const CreateTask = ({show, onHide}) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState(1)
    const [deadline, setDeadline] = useState('')
    const [category, setCategory] = useState('')

    const addTask = async () => {
        try {
            const task = {
                title: title,
                description: description,
                priority: priority,
                deadline_at: new Date(deadline),
                category: category,
            };

            const response = await createTask(task);

            if (response) {
                console.log('Task created successfully:', response);
                onHide();
                dispatch(addNewTask(response));
                setTitle('');
                setDescription('');
                setPriority(1);
                setDeadline('');
                setCategory('');
            }
        } catch (e) {
            alert(e.response.data.message);
        }
    };


    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Создание задача
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="d-flex flex-column gap-2">
                    <Form.Group controlId="formTitle">
                        <Form.Label>Название задачи</Form.Label>
                        <Form.Control type="text" placeholder="Введите имя вашей задачи"
                                      value={title}
                                      onChange={e => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control as="textarea" rows="3"
                                      value={description}
                                      onChange={e => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPriority">
                        <Form.Label>Приоритет: {priority}</Form.Label>
                        <Form.Range type="number" min="1" max="10"
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formDeadline">
                        <Form.Label>Дедлайн</Form.Label>
                        <Form.Control type="datetime-local"
                                      value={deadline}
                                      onChange={e => setDeadline(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formCategory">
                        <Form.Label>Категория</Form.Label>
                        <Form.Control as="select"
                                      value={category}
                                      onChange={e => setCategory(e.target.value)}>
                            <option value="cat1">Категория 1</option>
                            <option value="cat2">Категория 2</option>
                            <option value="cat3">Категория 3</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='success' onClick={addTask}>Создать задачу</Button>
                <Button variant='danger' onClick={onHide}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateTask;