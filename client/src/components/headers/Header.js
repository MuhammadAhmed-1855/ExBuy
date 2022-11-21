import React, {/*useState , */useContext} from 'react';
import {GlobalState} from '../../GlobalState'; 
import Menu from './icons/menu.svg';
import Close from './icons/close.svg';
import Cart from './icons/cart.svg';
import {Link} from 'react-router-dom';
import axios from 'axios';

function Header() {
    const state = useContext(GlobalState);
    console.log(state);
    const [isLogged, setIsLogged] = state.userAPI.isLogged;
    const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
    const [cart] = state.userAPI.cart;

    const logoutUser = async () => {
        await axios.get('/buyer/buyerlogout');
        localStorage.clear();
        setIsAdmin(false);
        setIsLogged(false);
    };
    
    const adminRouter = () => {
        return (
            <>
                <li>
                    <Link to="/create_product">Create Product</Link>
                </li>

                <li>
                    <Link to="/category">Categories</Link>
                </li>
            </>
        )
    };

    const loggedRouter = () => {
        return (
            <>
                <li>
                    <Link to="/history">History</Link>
                </li>
                
                <li>
                    <Link to="/" onClick={logoutUser}>Logout</Link>
                </li>
            </>
        )
    };

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
                    <Link to='/'>{isAdmin ? 'Products': 'Shop'}</Link>
                </li>

                {isAdmin && adminRouter()}
                {
                    isLogged ? loggedRouter()
                    : <li>
                        <Link to='/buyerlogin'>Login ☯ Regsiter</Link>
                    </li>
                }
                
                <li>
                    <img src={Close} alt="" width="30" className='Menu' />
                </li>
            </ul>
            
            {
                isAdmin ? '' 
                : <div className="Cart">
                    <span>{cart.length}</span>
                    <Link to='/cart'>
                        <img src={Cart} alt="" width="30" />
                    </Link>
                </div>
            }

        </header>
    )
};

export default Header;