import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {createReminder} from "../http/reminderApi";
import {addNewReminder} from "../store/remindersSlice";
import {useDispatch} from "react-redux";

const CreateReminder = ({show, onHide, editingTask}) => {
    const [info, setInfo] = useState('')
    const [remindAt, setRemindAt] = useState('')
    const dispatch = useDispatch();

    const addReminder = async () => {
        try {
            const reminder = {
                info: info,
                remind_at: new Date(remindAt),
                taskId: editingTask.id
            };

            const response = await createReminder(reminder);

            if (response) {
                console.log('Reminder created successfully:', response);
                onHide();
                dispatch(addNewReminder(response));
                setInfo('');
                setRemindAt('');
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
                    Создание напоминания
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="d-flex flex-column gap-2">
                    <Form.Group controlId="formTitle">
                        <Form.Label>Придумайте описание вашего напоминание</Form.Label>
                        <Form.Control type="text" placeholder="Введите имя вашей задачи"
                                      value={info}
                                      onChange={e => setInfo(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDeadline">
                        <Form.Label>Дата напоминания</Form.Label>
                        <Form.Control type="datetime-local"
                                      value={remindAt}
                                      onChange={e => setRemindAt(e.target.value)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='success' disabled={!info || !remindAt} onClick={addReminder}>Создать задачу</Button>
                <Button variant='danger' onClick={onHide}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateReminder;