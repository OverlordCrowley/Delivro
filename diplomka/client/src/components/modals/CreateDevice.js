import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import {Context} from "../../index";
import {createDevice, fetchRestaurant, fetchTypes} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";

const CreateDevice = observer(({show, onHide}) => {
    const {restaurant} = useContext(Context)
    const [name, setName] = useState('')
    const [composition, setComposition] = useState('')
    const [price, setPrice] = useState(0)
    const [discountPrice, setDiscountPrice] = useState(0)
    const [weight, setWeight] = useState(0)
    const [file, setFile] = useState(null)
    const [type, setType] = useState(null)
    const [restauran, setResrauran] = useState(null)

    useEffect(() => {
        fetchTypes().then(data => restaurant.setTypes(data))
        fetchRestaurant().then(data => restaurant.setRestaurant(data))
    }, [])


    const selectFile = e => {
        setFile(e.target.files[0])
    }

    function changeType(e) {
        setType(e.target.value);
    }

    function changeRestaurant(e) {
        setResrauran(e.target.value);
    }


    const addDevice = () => {

        const formData = new FormData()
        formData.append('name', name)
        formData.append('composition', composition)
        formData.append('price', `${price}`)
        formData.append('weight', `${weight}`)
        formData.append('discount_price', `${discountPrice}`)
        formData.append('img', file)
        formData.append('restaurantId', restauran)
        formData.append('foodTypeId', type)
        createDevice(formData).then(data => onHide())
    }


    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить блюдо
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3 adminInput"
                        placeholder="Введите название блюда"
                    />
                    <Form.Control
                        value={composition}
                        onChange={e => setComposition(e.target.value)}
                        className="mt-3 adminInput"
                        placeholder="Введите состав блюда"
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
                    <select className="lang lang-b" value={type} onChange={changeType}>
                        {restaurant.types.map(type =>
                            <option
                                value={type.id}
                                key={type.id}>
                                {type.name}
                            </option>
                        )}
                    </select>
                    <Form.Control

                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите стоимость блюда"
                        type="number"
                    />
                    <Form.Control

                        onChange={e => setDiscountPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите стоимость блюда с скидкой"
                        type="number"
                    />
                    <Form.Control

                        onChange={e => setWeight(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите вес блюда"
                        type="number"
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
                <Button variant="outline-success" onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;
