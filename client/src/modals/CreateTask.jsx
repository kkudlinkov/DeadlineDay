import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {createTask} from "../http/tasksApi";
import {useDispatch, useSelector} from "react-redux";
import {addNewTask} from "../store/taskSlice";
import CreateCategory from "./CreateCategory";
import {deleteUserCategory} from "../store/categorySlice";
import {deleteCategory} from "../http/categoriesApi";

const CreateTask = ({show, onHide}) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState(1)
    const [deadline, setDeadline] = useState('')
    const [category, setCategory] = useState(null)
    const [categoryVisible, setCategoryVisible] = useState(false)


    const categories = useSelector(state => state.userCategories.categories)

    const addTask = async () => {
        try {
            const task = {
                title: title,
                description: description,
                priority: priority,
                deadline_at: new Date(deadline),
                categoryId: category
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
                setCategory(null);
            }
        } catch (e) {
            alert(e.response.data.message);
        }
    };


    const deleteSelectCategory = async () => {
        if (window.confirm('Вы уверены что хотите удалить категорию?')) {
            try {
                await deleteCategory(category);
                const categoryId = parseInt(category);
                const index = categories.findIndex((t) => t.id === categoryId);
                dispatch(deleteUserCategory(index));
                alert('Task deleted successfully');
            } catch (error) {
                console.error(error);
                alert('Error deleting task');
            }
        }
    }


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
                    <Form.Group>
                        <Form.Label>Категория</Form.Label>
                        <Form.Control as="select" value={category || "Select Category"}
                                      onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Control>
                        <Button variant="primary" className="mr-2" onClick={() => setCategoryVisible(true)}>Добавить
                            категорию</Button>
                        <Button variant="danger" className="m-2" onClick={deleteSelectCategory} disabled={!category}>Удалить
                            категорию</Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='success' disabled={!title || !deadline} onClick={addTask}>Создать задачу</Button>
                <Button variant='danger' onClick={onHide}>Отмена</Button>
            </Modal.Footer>
            <CreateCategory show={categoryVisible} onHide={() => setCategoryVisible(false)}/>
        </Modal>
    );
};

export default CreateTask;