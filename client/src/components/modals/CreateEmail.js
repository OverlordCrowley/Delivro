import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {addEmail, createType} from "../../http/deviceAPI";

const CreateEmail = ({show, onHide}) => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const createEmail = () => {
        addEmail({'email': email, 'message': message}).then(data => {
            onHide()
        })
    }

    const updateEmail = (val)=>{
        setEmail(val)
    }

    const updateMessage = (val)=>{
        setMessage(val)
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        type="email"
                        onChange={e => updateEmail(e.target.value)}
                        placeholder="Введите ваш email"
                        minLength={6}
                        maxLength={240}
                        required
                    />

                    <Form.Control
                        className="mt-4"
                        onChange={e => updateMessage(e.target.value)}
                        placeholder="Введите ваш текст"
                        minLength={25}
                        maxLength={240}
                        required
                    />

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={createEmail}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateEmail;
