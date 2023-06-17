import React, { useState, useEffect } from 'react';
import { deleteBasketCard, updateBasketCard } from '../../http/deviceAPI';
import jwt_decode from 'jwt-decode';

const BasketCard = ({ count, device, updateTotalPricePlus, updateTotalPriceMinus, devicePrice, id }) => {
    const [currentCount, setCurrentCount] = useState(count);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [img, setImg] = useState('');
    const [discountPrice, setDiscountPrice] = useState(0);
    const [total, setTotal] = useState(0);
    const [devPrice, setDevPrice]=  useState(devicePrice);
    const [deviceId, setDeviceId]=  useState(id);


    useEffect(()=>{
        setTotal(devicePrice)
    }, [])

    useEffect(() => {
        setName(device.name);
        setPrice(device.price);
        setImg(device.img);
        setDiscountPrice(device.discount_price);
        setDeviceId(id)
        if(device.discount_price < device.price){
            setTotal(device.discount_price * count)
        }
        else {
            setTotal(device.price * count)
        }
    }, [device, devicePrice, id]);

    useEffect(()=>{
        calculateTotal();

    }, [currentCount])

    const calculateTotal = () => {
        let calculatedTotal = 0;
        if (discountPrice < price) {
            calculatedTotal = discountPrice * currentCount;
        } else {
            calculatedTotal = price * currentCount;
        }
        setTotal(calculatedTotal);

    };

    const handleIncrement = () => {
        if (currentCount < 10) {
            setCurrentCount((prevCount) => prevCount + 1);

            updateBasketCard({ 'userId': jwt_decode(localStorage.getItem('token')).id,'deviceId': deviceId, 'count': currentCount+1}).then()
            if(price > discountPrice){
                updateTotalPricePlus(discountPrice)
            }
            else{
                updateTotalPricePlus(price)
            }
        }
    };

    const handleDecrement = () => {
        if (currentCount > 1) {
            setCurrentCount((prevCount) => prevCount - 1);
            updateBasketCard({ 'userId': jwt_decode(localStorage.getItem('token')).id,'deviceId': deviceId, 'count': currentCount-1}).then()
            if(price > discountPrice){
                updateTotalPriceMinus(discountPrice)
            }
            else{
                updateTotalPriceMinus(price)
            }

        }
        else{
            deleteBasketCard({ 'userId': jwt_decode(localStorage.getItem('token')).id,'deviceId': deviceId}).then(
                window.location.reload()
            )
        }

    };

    return (
        <tr>
            <td className="RowImage">
                <img src={img ? process.env.REACT_APP_API_URL + img : ''} alt={img ? img : ''} />
            </td>
            <td>
                <span className="whiteText">{name ? name : ''}</span>
            </td>
            <td>
        <span className="whiteText">
          <button className={'btnEvent'} onClick={handleIncrement}>+</button>
            <span className={'number'}>{currentCount}</span>
            <button className={'btnEvent'} onClick={handleDecrement}>-</button>
        </span>
            </td>
            <td>
                <span className="whiteText">{discountPrice < price ? discountPrice : price}</span>
            </td>
            <td className={'tdTotal'}>
                <span className="whiteText total">{total > 0 ? total : devPrice}</span>
            </td>
        </tr>
    );
};

export default BasketCard;
