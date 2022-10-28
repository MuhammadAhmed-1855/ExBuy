import React from 'react';
import {Link} from 'react-router-dom';

function ProductItem({product}) {
    return(
        <div className='Product-Card'>
            <img src={product.images.url} alt=''/>

            <div className='Product-Box'>
                <h2 title={product.title}>{product.title}</h2>
                <span>Rs. {product.price}</span>
                <p>${product.description}</p>
            </div>

            <div className='Row-Buttons'>
                <Link id='Buy-Button' to='#!'>Buy</Link>
                <Link id='View-Button' to={`/detail/${product._id}`}>View</Link>
            </div>
        </div>
    )
}

export default ProductItem;