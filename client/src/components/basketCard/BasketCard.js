import React from 'react';
import './basketCard.css';
const BasketCard = () => {
    return (
        <tr>
            <td><img src={process.env.REACT_APP_API_URL} alt="1"/></td>
            <td><span className='whiteText'>1</span></td>
            <td><span className='whiteText'>2</span></td>
            <td><span className='whiteText'>3</span></td>
            <td><span className='whiteText'>4</span></td>
        </tr>
    );
};

export default BasketCard;