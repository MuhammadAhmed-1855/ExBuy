import /*React, */{useState, useEffect} from 'react'
import axios from 'axios';

function UserApi(token) {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if(token) {
            const getUser = async () => {
                try{
                    const res = await axios.get('/buyer/infor', {
                        headers: {Authorization: token}
                    });

                    setIsLogged(true);
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

                    console.log(res);
                }
                catch (err) {
                    alert(err.rsponse.data.msg);
                }
            }
            getUser();
        };
    }, [token])

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
    }
}

export default UserApi