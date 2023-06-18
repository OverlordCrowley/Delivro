import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {createOrder} from "../../http/restaurantAPI";
import InputMask from 'react-input-mask';
import jwt_decode from "jwt-decode";

const CreateOrder = ({show, onHide}) => {
    const [value, setValue] = useState('')


    const addOrder = () => {
        createOrder({'phone': value, userId: jwt_decode(localStorage.getItem('token')).id }).then((data) => {
            alert('Заказ успешно оформлен')
        })
            .catch(err=>{
                alert('Оформление заказа невозможно')
            });
    }


    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Оформление заказа
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <InputMask
                        mask='(+7) (999)-999-9999'
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите ваш номер телефона"}
                    />

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addOrder}>Оформить заказ</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateOrder;
