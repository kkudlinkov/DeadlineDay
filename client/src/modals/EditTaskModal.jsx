import React, {useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {changeTask} from "../http/tasksApi";
import {updateTask} from "../store/taskSlice";
import FormGroup from "react-bootstrap/FormGroup";

const EditTaskModal = ({show, onHide, editingTask}) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState(1)
    const [deadline, setDeadline] = useState('')
    const [category, setCategory] = useState(null);
    const categories = useSelector(state => state.userCategories.categories)

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description);
            setPriority(editingTask.priority);
            setDeadline(moment(editingTask.deadline_at).format('YYYY-MM-DDTHH:mm'));
            setCategory(editingTask.categoryId);
        }
    }, [editingTask]);

    const editTaskFunc = async () => {
        try {
            const task = {
                title: title,
                description: description,
                priority: priority,
                deadline_at: new Date(deadline),
                categoryId: parseInt(category)
            };

            if (!categories.some(category => category.id === task.categoryId)) {
                task.categoryId = null;
            }

            const response = await changeTask(task, editingTask.id);

            if (response) {
                console.log('Task changed successfully:', response);
                dispatch(updateTask(response));
                onHide();
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
                    <FormGroup>
                        <Form.Label>Категория</Form.Label>
                        <Form.Control as="select" value={category || ''} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Control>
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='success' disabled={!title || !deadline} onClick={editTaskFunc}>Изменить</Button>
                <Button variant='danger' onClick={onHide}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditTaskModal;