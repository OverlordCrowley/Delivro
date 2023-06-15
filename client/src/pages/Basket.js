import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { fetchBasketCards, fetchRestaurant, fetchTypes } from '../http/deviceAPI';
import jwt_decode from 'jwt-decode';
import BasketCard from '../components/basketCard/BasketCard';

const Basket = observer(() => {
    const { restaurant } = useContext(Context);
    const { user } = useContext(Context);
    const [cards, setCard] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const updateTotalPrice = (price) => {
        setTotalPrice((prevTotal) => prevTotal + price);
    };

    useEffect(() => {
        fetchBasketCards({ userId: jwt_decode(localStorage.getItem('token')).id }).then((data) => {
            setCard(data);
            const total = data.reduce((sum, el) => {
                if (el.discount_price > el.price) {
                    return sum + el.discount_price * el.count;
                } else {
                    return sum + el.price * el.count;
                }
            }, 0);
            setTotalPrice(total);
        });
    }, []);

    return (
        <Container className="mt-3">
            <nav className="nav_menu" id="nav_menu">
                <div className="container">
                    <div className="row col-lg-8 col-md-12 col-xs-0 main_menu">
                        {cards && cards.length > 0 ? (
                            <>
                                <table>
                                    <thead>
                                    <tr>
                                        <th className="green">Изображение</th>
                                        <th className="green">Название</th>
                                        <th className="green">Количество</th>
                                        <th className="green">Цена за 1шт</th>
                                        <th className="green">Цена</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {cards.map((el) => (
                                        <BasketCard
                                            key={el.id}
                                            count={el.count}
                                            device={el.device}
                                            updateTotalPrice={updateTotalPrice}
                                        />
                                    ))}
                                    </tbody>
                                </table>

                                <p className="TotalPrice">Итоговая цена: {totalPrice}</p>
                                <br />
                                <button className="headerMap green OrderBtn" onClick={(e) => {}}>
                                    Перейти к оформлению
                                </button>
                            </>
                        ) : (
                            <p style={{ color: '#fff', fontSize: 26 }}>У вас нет товаров в корзине</p>
                        )}
                    </div>
                </div>
            </nav>
        </Container>
    );
});

export default Basket;
