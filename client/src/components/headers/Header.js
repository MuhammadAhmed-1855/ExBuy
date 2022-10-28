import React, {useState, useContext} from 'react';
import {GlobalState} from '../../GlobalState'; 
//import Menu from './icons/menu.svg';
import Close from './icons/close.svg';
import Cart from './icons/cart.svg';
import {Link} from 'react-router-dom';

function Header() {
    const value = useContext(GlobalState);
    return(
        <header>
            {/* <div className="Menu">
                <img src={Menu} alt="" width="30" />
            </div> */}

            <div className="Logo">
                <Link to='/'>ExBuy</Link>
            </div>

            <ul>
                <li>
                    <Link to='/'>Products</Link>
                </li>
                <li>
                    <Link to='/buyerlogin'>Login ☯ Regsiter</Link>
                </li>
                <li>
                    <img src={Close} alt="" width="30" className='Menu' />
                </li>
            </ul>

            <div className="Cart">
                <span>0</span>
                <Link to='/cart'>
                    <img src={Cart} alt="" width="30" />
                </Link>
            </div>
        </header>
    )
};

export default Header;