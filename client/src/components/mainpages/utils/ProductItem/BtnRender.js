import React from 'react';
import {Link} from 'react-router-dom';

function BtnRender({product}) {
    return (
        <div className='Row-Buttons'>
            <Link id='Buy-Button' to='#!'>Buy</Link>
            <Link id='View-Button' to={`/detail/${product._id}`}>View</Link>
        </div>
    )
}

export default BtnRender;