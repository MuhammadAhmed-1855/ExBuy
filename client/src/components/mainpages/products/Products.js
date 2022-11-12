import React, {useContext} from "react";
import {GlobalState} from '../../../GlobalState';
import ProductItem from '../utils/ProductItem/ProductItem';
import Loading from '../utils/Loading/Loading';

function Products() {
    const state = useContext(GlobalState);
    const [products] = state.productsAPI.products;

    return(
        <>
            <div className="Products">
                {
                    products.map(product => {
                        return(<ProductItem key={product._id} product={product}/>)
                    })
                }
            </div>
            {products.length === 0 && <Loading />}
        </>
    )
};

export default Products;