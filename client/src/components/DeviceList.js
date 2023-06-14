import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import './styles.css';
import DeviceItem from "./DeviceItem";

const DeviceList = observer((props) => {
    const {restaurant} = useContext(Context)


    return (
        <Row className="d-flex">
            <main>
                <div className="container">
                    <h2 className="main_title">Все предложения</h2>
                    <div className="row" style={{alignItems: "stretch"}}>
                        {restaurant.restaurant.length > 0 ?
                            restaurant.restaurant.map(cafe=>(
                            <DeviceItem cafe={cafe} key={cafe.id}/>
                        )) : 'Нет ресторанов с данным названием'
                        }
                    </div>
                </div>

            </main>
        </Row>
    );
});

export default DeviceList;
