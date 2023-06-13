import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {createRestaurantType, createType, fetchRestaurant, fetchTypes} from "../../http/deviceAPI";
import {Context} from "../../index";

const CreateType = ({show, onHide}) => {
    const {restaurant} = useContext(Context)
    const [value, setValue] = useState('')
    const [restauran, setRestauran] = useState('')


    useEffect(() => {
        fetchRestaurant().then(data => restaurant.setRestaurant(data))
    }, [])

    const addRestaurantType = () => {
        createRestaurantType({'name': value, 'restaurantId': restauran}).then(data => {
            setValue('')
            onHide()
        })
    }

    function changeRestaurant(e) {
        setRestauran(e.target.value);
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
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название типа"}
                    />
                    <select className="lang lang-b" value={restauran} onChange={changeRestaurant}>
                        {restaurant.restaurant.map(restaurants =>
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
                <Button variant="outline-success" onClick={addRestaurantType}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;
