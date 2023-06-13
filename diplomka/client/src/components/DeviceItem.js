import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom"
import './styles.css';
import {DEVICE_ROUTE} from "../utils/consts";
import {fetchRestaurant, fetchRestaurantTypes, fetchRestaurantTypesById} from "../http/deviceAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const DeviceItem = observer(({cafe}) => {
    const history = useHistory();
    const {restaurant} = useContext(Context)
    useEffect(() => {
        fetchRestaurantTypes().then(data => restaurant.setRestaurantTypes(data))
    }, [])
    return (
        <button className="restaurantItem" onClick={() => history.push(DEVICE_ROUTE + "/" + cafe.id)}>
            <div >
                <div className="card_restaurants">
                    <img src={process.env.REACT_APP_API_URL + cafe.img} className="card_img"
                         alt={cafe.name + " img"}/>

                    <div className="card_top">
                        <p style={{textAlign: "left"}}>{cafe.name}</p>
                        <p style={{textAlign: "left"}} className="card_text">₸₸
                            {
                                restaurant.restaurantTypes.map((el)=>(
                                    el.restaurantId === cafe.id ? " • " + el.name: ''
                                ))
                            }

                        </p>
                        <p style={{textAlign: "left"}} className="card_time">{cafe.time} мин</p>
                    </div>
                </div>
            </div>
        </button>
    );
});

export default DeviceItem;
