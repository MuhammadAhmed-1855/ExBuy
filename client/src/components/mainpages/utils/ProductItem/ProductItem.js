import React from 'react';
import BtnRender from './BtnRender';

function ProductItem({product, isAdmin}) {
    return(
        <div className='Product-Card'>
            {
                isAdmin && <input type="checkbox" checked={product.checked} />
            }
            <img src={product.images.url} alt='' />

            <div className='Product-Box'>
                <h2 title={product.title}>{product.title}</h2>
                <span>Rs. {product.price}</span>
                <p>${product.description}</p>
            </div>

            <BtnRender product={product}></BtnRender>
        </div>
    )
}

export default ProductItem;