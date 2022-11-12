import React, {createContext, useState, useEffect} from 'react';
import ProductsAPI from './api/ProductsAPI';
import UserAPI from './api/UserApi';
import axios from 'axios';

export const GlobalState = createContext();

export const DataProvider = ({children}) => {
    const [token, setToken] = useState(false);

    const refresh_Token = async () => {
        const token = await axios.get('/buyer/refresh_token')

        setToken(token.data.accessToken);
    };

    useEffect(() => {
        const firstLogin = localStorage.getItem('FirstLogin');
        if(firstLogin) refresh_Token()
    },[]);

    ProductsAPI()

    const state = {
      token: [token, setToken],
      productsAPI: ProductsAPI(),
      userAPI: UserAPI(token),
    };
    return(
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
};