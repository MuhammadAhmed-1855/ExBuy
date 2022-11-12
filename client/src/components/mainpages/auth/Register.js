import React, {useState} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [user, setUser] = useState({
        name:"", email:'', password:''
    });

    const OnChangeInput = e => {
        const {name, value} = e.target;
        setUser({...user, [name]:value});
    };

    const registerSubmit = async e => {
        e.preventDefault();
        try{
            await axios.post('./buyer/buyerregister', {...user});

            localStorage.setItem('FirstLogin', true);

            window.location.href = "/buyerlogin";
        }
        catch(err) {
            alert(err.response.data.msg);
        }
    };

    return(
        <div className="Login-Page">
            <h2>Register</h2>
            <form onSubmit={registerSubmit}>
                <input type="name" name="name" required placeholder="Name" value={user.name} onChange={OnChangeInput} />
                <input type="email" name="email" required placeholder="Email" value={user.email} onChange={OnChangeInput} />
                <input type="password" name="password" required placeholder="Password" autoComplete="on" value={user.password} onChange={OnChangeInput} />

                <div className="Row">
                    <button type="submit">Register</button>
                    <Link to="/buyerlogin">Login</Link>
                </div>

            </form>
        </div>
    )
};

export default Register;