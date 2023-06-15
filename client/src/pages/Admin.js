import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateRestaurant from "../components/modals/CreateRestaurant";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";
import CreateRestaurantType from "../components/modals/CreateRestaurantType";

const Admin = () => {
    const [restaurantVisible, setRestaurantVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [restaurantTypeVisible, setRestaurantTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)

    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setTypeVisible(true)}
            >
                Добавить тип
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setRestaurantVisible(true)}
            >
                Добавить ресторан
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setDeviceVisible(true)}
            >
                Добавить блюдо
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setRestaurantTypeVisible(true)}
            >
                Добавить тип ресторана
            </Button>


            <CreateRestaurant show={restaurantVisible} onHide={() => setRestaurantVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateRestaurantType show={restaurantTypeVisible} onHide={() => setRestaurantTypeVisible(false)}/>
        </Container>
    );
};

export default Admin;
