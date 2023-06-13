import React, {useContext, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchDevices, fetchTypes} from "../http/deviceAPI";
import {fetchRestaurant} from "../http/restaurantAPI";
import Search from "../components/search/Search";

const Shop = observer(() => {
    const {restaurant} = useContext(Context)
    let [searchText, setSearchText] = useState('');

    let textChangeHandler = (val) =>{
        setSearchText(val);
    }


    useEffect(() => {
        fetchRestaurant().then(data => restaurant.setRestaurant(data))
        fetchTypes().then(data => restaurant.setTypes(data))
        fetchDevices().then(data => restaurant.setDevices(data))
    }, [])

    useEffect(() => {
        fetchRestaurant(searchText).then(data => {
            restaurant.setRestaurant(data)
        })
    }, [searchText])


    return (
        <Container>
            <Row>
                <Col>
                    <Search fc={textChangeHandler}/>
                    <DeviceList />
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
