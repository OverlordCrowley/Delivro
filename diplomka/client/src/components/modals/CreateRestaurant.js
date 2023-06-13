import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {createDevice, createType} from "../../http/deviceAPI";
import {createRestaurant} from "../../http/restaurantAPI";

const CreateRestaurant = ({show, onHide}) => {
    const [value, setValue] = useState('')
    const [time, setTime] = useState('')
    const [file, setFile] = useState(null)


    const addRestaurant = () => {
        const formData = new FormData()
        formData.append('name', value)
        formData.append('time', time)
        formData.append('img', file)
        createRestaurant(formData).then(data => onHide())
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить ресторан
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название ресторана"}
                    />
                    <Form.Control
                        value={time}
                        onChange={e => setTime(e.target.value)}
                        placeholder={"Введите время готовки"}
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addRestaurant}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateRestaurant;
