import React, {useContext, useEffect} from 'react';
import './basketCard.css';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {fetchBasketCards} from "../../http/deviceAPI";
import jwt_decode from "jwt-decode";
const BasketCard = observer(() => {
    useEffect(() => {
        fetchBasketCards(jwt_decode(localStorage.getItem('token')).id).then()
    }, [])

    return (
        <tr>
            <td><img src={process.env.REACT_APP_API_URL} alt="1"/></td>
            <td><span className='whiteText'>1</span></td>
            <td><span className='whiteText'>2</span></td>
            <td><span className='whiteText'>3</span></td>
            <td><span className='whiteText'>4</span></td>
        </tr>
    );
});

export default BasketCard;