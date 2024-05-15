import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {HexColorPicker} from 'react-colorful'
import FormControl from "react-bootstrap/FormControl";
import {createCategory} from "../http/categoriesApi";
import {addNewCategory} from "../store/categorySlice";
import {useDispatch} from "react-redux";

const CreateCategory = ({show, onHide}) => {
    const dispatch = useDispatch();
    const [categoryName, setCategoryName] = useState('')
    const [selectedColor, setSelectedColor] = useState('#7ED321')

    const addCategory = async () => {
        try {
            const category = {
                name: categoryName,
                color: selectedColor
            };
            const response = await createCategory(category);

            if (response) {
                console.log('Category created successfully:', response);
                onHide();
                dispatch(addNewCategory(response));
                setCategoryName('');
                setSelectedColor('#7ED321')
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
                    Создание Категории
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="d-flex flex-column gap-2">
                    <Form.Group controlId="formTitle">
                        <Form.Label className={'fs-4'}>Название задачи</Form.Label>
                        <Form.Control
                            required={'Введите имя'}
                            type="text" placeholder="Введите имя вашей задачи"
                            value={categoryName}
                            onChange={e => setCategoryName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formColor">
                        <Form.Label className={'fs-4 pb-5'}>Цвет категории</Form.Label>
                        <div className="d-flex justify-content-evenly align-items-center">
                            <HexColorPicker color={selectedColor} onChange={setSelectedColor}/>
                            <div className='d-flex align-items-center gap-2'>
                                <p className='fs-3 m-0 p-0'>Моя задача</p>
                                <div
                                    style={{
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '50%',
                                        backgroundColor: `${selectedColor}`
                                    }
                                    }></div>
                            </div>
                        </div>
                        <FormControl
                            className='mt-5'
                            style={{color: `${selectedColor}`}}
                            onChange={e => setSelectedColor(e.target.value)}
                            value={selectedColor}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='success' disabled={!categoryName} onClick={addCategory}>Создать Категорию</Button>
                <Button variant='danger' onClick={onHide}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateCategory;