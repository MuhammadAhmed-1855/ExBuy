import React, {/*useState , */useContext} from 'react';
import {GlobalState} from '../../GlobalState'; 
import Menu from './icons/menu.svg';
import Close from './icons/close.svg';
import Cart from './icons/cart.svg';
import {Link} from 'react-router-dom';

function Header() {
    const state = useContext(GlobalState);
    // const [isLogged, setIsLogged] = state.userAPI.isLogged;
    const [isAdmin/*, setIsAdmin*/] = state.userAPI.isAdmin;

    // const adminRouter = () => {
    //     return (
    //         <>
    //             <li><Link to="/create_product">Create Product</Link></li>
    //             <li><Link to="/category"></Link>Categories</li>
    //         </>
    //     )
    // };

    // const loggedRouter = () => {
    //     return (
    //         <>
    //             <li><Link to="/history">History</Link></li>
    //             <li><Link to="/"></Link>Logout</li>
    //         </>
    //     )
    // };

    return(
        <header>
            <div className="Menu">
                <img src={Menu} alt="" width="30" />
            </div>

            <div data-testid="LogoChecker" className="Logo">
                <Link to='/'>{isAdmin ? 'Admin': 'ExBuy'}</Link>
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