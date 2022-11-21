import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {GlobalState} from '../../../../GlobalState';

function BtnRender({product}) {
    const state = useContext(GlobalState);
    const [isAdmin] = state.userAPI.isAdmin;
    const addCart = state.userAPI.addCart;

    return (
        <div className='Row-Buttons'>
            {
                isAdmin ?
                <>
                    <Link id='Buy-Button' to='#!'>
                        Delete
                    </Link>

                    <Link id='View-Button' to={`/edit_product/${product._id}`}>
                        Edit
                    </Link>
                </>
                : <>
                    <Link id='Buy-Button' to='#!' onClick={() => addCart(product)}>
                        Buy
                    </Link>

                    <Link id='View-Button' to={`/detail/${product._id}`}>
                        View
                    </Link>
                </>
            }
        </div>
    )
}

export default BtnRender;