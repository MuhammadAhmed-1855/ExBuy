import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Products from './products/Products';
import Login from './auth/Login';
import Register from './auth/Register';
import Cart from './cart/Cart';
import DetailProduct from './detailProduct/DetailProduct';
import NotFound from './utils/NotFound/NotFound';

function Pages() {
    return(
        <Routes>
            <Route path="/" exact element={<Products />} />
            <Route path="/detail/:id" exact element={<DetailProduct />} />
            <Route path="/buyerregister" exact element={<Register />} />
            <Route path="/buyerlogin" exact element={<Login />} />
            <Route path="/cart" exact element={<Cart />} />

            <Route path="*" exact component={NotFound} />
        </Routes>
    )
};

export default Pages;