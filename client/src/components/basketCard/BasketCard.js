import React, {useContext, useEffect, useState} from 'react';
import './basketCard.css';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {fetchBasketCards} from "../../http/deviceAPI";
import jwt_decode from "jwt-decode";
const BasketCard = observer((props) => {
    let [device ,setDevice] = useState(props.device);
    useEffect(()=>{
        setDevice(props.device);
    }, [props])
    return (
        <tr>
            <td className={'RowImage'}><img src={process.env.REACT_APP_API_URL + device.device.img} alt={device.device.img}/></td>
            <td><span className='whiteText'>{device.device.name}</span></td>
            <td><span className='whiteText'>{device.count}</span></td>
            <td><span className='whiteText'>{device.device.discount_price > device.device.price ? device.device.discount_price : device.device.price}</span></td>
            <td><span className='whiteText'>{device.device.discount_price > device.device.price ? device.device.discount_price * device.count : device.device.price * device.count}</span></td>
        </tr>
    );
});

export default BasketCard;