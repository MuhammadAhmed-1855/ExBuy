import React, {useState} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [user, setUser] = useState({
        email:'', password:''
    });

    const OnChangeInput = e => {
        const {name, value} = e.target;
        setUser({...user, [name]:value});
    };

    const loginSubmit = async e => {
        e.preventDefault();
        try{
            await axios.post('./buyer/buyerlogin', {...user});

            localStorage.setItem('FirstLogin', true);

            window.location.href = "/";
        }
        catch(err) {
            alert(err.response.data.msg);
        }
    };

    return(
        <div className="Login-Page">
            <h2>Login</h2>
            <form onSubmit={loginSubmit}>
                <input type="email" name="email" required placeholder="Email" value={user.email} onChange={OnChangeInput} />
                <input type="password" name="password" required placeholder="Password" autoComplete="on" value={user.password} onChange={OnChangeInput} />

                <div className="Row">
                    <button type="submit">Login</button>
                    <Link to="/buyerregister">Register</Link>
                </div>

            </form>
        </div>
    )
};

export default Login;