import React from 'react';
import './Main.scss';

const Main = ({ data: {name, surname} }) => {
    return (
        <div className="main">{name + ' ' + surname}</div>
    );
};

export default Main;