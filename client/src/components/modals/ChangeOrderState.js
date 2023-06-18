import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {
    changeOrder,
    createRestaurantType,
    createType,
    fetchOrder,
    fetchRestaurant,
    fetchTypes
} from "../../http/deviceAPI";
import {Context} from "../../index";
import jwt_decode from "jwt-decode";

const ChangeOrderState = ({show, onHide}) => {
    const {restaurant} = useContext(Context)
    const [value, setValue] = useState('')
    const [order, setOrder] = useState('')
    let [custom, setCustom] = useState([]);

    useEffect(() => {
        fetchOrder().then(data => {
            setCustom(data)
            console.log(data)
        })
    }, [])

    const changeRestaurantType = () => {
        changeOrder({'name': value, 'restaurantId': order}).then(data => {
            setValue('')
            onHide()
        })
    }

    function changeUserBasket(e) {
        setOrder(e.target.value);
    }

    function changeUserStatus(e) {
        setValue(e.target.value);
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
                    <select className="lang lang-b" value={value} onChange={changeUserStatus}>
                            <option
                                value='Не обработан'>
                                Не обработан
                            </option>
                        <option
                            value='В процессе'>
                            В процессе
                        </option>
                        <option
                            value='Завершен'>
                            Завершен
                        </option>
                    </select>

                    <select className="lang lang-b" value={order} onChange={changeUserBasket}>
                        {custom.map(restaurants =>
                            <option
                                value={restaurants.id}
                                key={restaurants.id}>
                                {restaurants.name}
                            </option>
                        )}
                    </select>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={changeRestaurantType}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ChangeOrderState;
