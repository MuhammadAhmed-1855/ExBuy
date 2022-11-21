import React, {useContext} from "react";
import {GlobalState} from '../../../GlobalState';
import ProductItem from '../utils/ProductItem/ProductItem';
import Loading from '../utils/Loading/Loading';

function Products() {
    const state = useContext(GlobalState);
    const [products] = state.productsAPI.products;
    const [isAdmin] = state.userAPI.isAdmin;

    return(
        <>
            <div className="Products">
                {
                    products.map(product => {
                        return(
                            <ProductItem key={product._id} product={product} isAdmin={isAdmin} />
                        )
                    })
                }
            </div>
            {products.length === 0 && <Loading />}
        </>
    )
};

export default Products;