import /*React, */{useState, useEffect} from 'react'
import axios from 'axios';

function UserApi(token) {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if(token) {
            const getUser = async () => {
                try{
                    const res = await axios.get('/buyer/infor', {
                        headers: {Authorization: token}
                    });

                    setIsLogged(true);
                    res.data.buyer.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

                    console.log(res);
                }
                catch (err) {
                    alert(err.rsponse.data.msg);
                }
            }
            getUser();
        };
    }, [token])

    const addCart = async (product) => {
        if(!isLogged) return alert("Please login to continue buying");

        const check = cart.every(item => {
            return item._id !== product._id
        });

        if(check) {
            setCart([...cart, {...product, quantity: 1}]);

            await axios.patch('/buyer/addcart', {cart: [...cart, {...product, quantity: 1}]},{
                headers: {Authorization: token}
            })
        }
        else {
            alert("This product has already been added to the cart.")
        }
    }

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
    }
}

export default UserApi