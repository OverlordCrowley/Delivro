import React from 'react';
import '../styles.css';
const Search = (props) => {

    return (
        <div className="search">
            <div className="container">
                <form className="form_search">
                    <input type="search" onChange={(e)=>{
                        props.fc(e.target.value);
                    }} placeholder="Поиск по ресторанам и кухням"/>
                </form>
            </div>
        </div>
    );
};

export default Search;