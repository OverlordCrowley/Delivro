import React, { useState, useEffect } from 'react';
import { deleteBasketCards } from '../../http/deviceAPI';
import jwt_decode from 'jwt-decode';

const BasketCard = ({ count, device, updateTotalPrice }) => {
    const [currentCount, setCurrentCount] = useState(count);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [img, setImg] = useState('');
    const [discountPrice, setDiscountPrice] = useState(0);
    const [total, setTotal] = useState(0);



    useEffect(() => {
        setName(device.name);
        setPrice(device.price);
        setImg(device.img);
        setDiscountPrice(device.discount_price);

        if(discountPrice < price){
            setTotal(discountPrice * count)
        }
        else {
            setTotal(price * count)
        }
    }, [device]);



    useEffect(()=>{
        calculateTotal();
        updateTotalPrice(total);
    }, [currentCount])

    const calculateTotal = () => {
        let calculatedTotal = 0;
        if (discountPrice > price) {
            calculatedTotal = discountPrice * currentCount;
        } else {
            calculatedTotal = price * currentCount;
        }
        setTotal(calculatedTotal);

    };

    const handleIncrement = () => {
        if (currentCount < 10) {
            setCurrentCount((prevCount) => prevCount + 1);
        }
    };

    const handleDecrement = () => {
        if (currentCount > 1) {
            setCurrentCount((prevCount) => prevCount - 1);
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
          <button onClick={handleIncrement}>+</button>
            {currentCount}
            <button onClick={handleDecrement}>-</button>
        </span>
            </td>
            <td>
                <span className="whiteText">{discountPrice > price ? discountPrice : price}</span>
            </td>
            <td>
                <span className="whiteText">{total ? total : 0}</span>
            </td>
        </tr>
    );
};

export default BasketCard;
