import React from 'react';
import Container from "react-bootstrap/Container";

const Basket = () => {
    return (
        <Container className="mt-3">
            <nav className="nav_menu" id="nav_menu">
                <div className="container">
                    <div className="row col-lg-8 col-md-12 col-xs-0 main_menu">

                        <table>
                            <thead>
                              <tr>
                                  <th className='green'>Изображение</th>
                                  <th className='green'>Название</th>
                                  <th className='green'>Количество</th>
                                  <th className='green'>Цена за 1шт</th>
                                  <th className='green'>Цена</th>
                              </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                            <button className={"headerMap green"} onClick={(e)=>{
                            }}>6</button>

                    </div>
                </div>
            </nav>
        </Container>
            );
};

export default Basket;
