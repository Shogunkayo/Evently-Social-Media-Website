import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import FormInput from './signup_input';
import { login } from "./features/auth/authSlice";

import home_btn from './images/home.png'
import signup_btn from './images/signup.png'
import login_btn from './images/login.png'

export default function Login() {

    const navigate = useNavigate()
    const {user} = useSelector((state)=> state.auth)
    const dispatch = useDispatch();

    useEffect(()=>{
        if(user){
            navigate('/explore')
        }
    }, [user, navigate])

    const [values, setValues] = useState({
        username: "",
        password: ""
    });

    const [loginError, setLoginError] = useState(false);    

    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Username",
            label: "Username",
            required: "true"
        },

        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Password",
            label: "Password",
            required: "true"
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoginError(false);

        const user_name = values.username;
        const user_password = values.password;

        fetch('http://localhost:4000/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user_name, user_password})
        }).then((response) => {
            response.json().then((body) => {
                if(body.accessToken){
                    console.log(body);
                    dispatch(login({user_name: user_name, user_id: body.user_id , accessToken: body.accessToken}))
                    localStorage.setItem('user', JSON.stringify({user_name: user_name, user_id: body.user_id, accessToken: body.accessToken}));
                    setTimeout(()=>{
                        navigate('/explore');
                      }, 1000);
                }
                else{
                    setLoginError(true);
                }
            })
        })
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
    <div className="App">
        <div className='homenav-signup'>
            <h1>Evently</h1>
            <div className='links'> 
                <a href='/'><div className='links-first'><img src={home_btn} alt='navbar'></img></div></a>
                <a href='/signup'><div className='links-signup'><img src={signup_btn} alt='navbar'></img></div></a>
                <a href='/login'><div className='links-login'><img src={login_btn} alt='navbar'></img></div></a>
            </div>
        </div>

        <form onSubmit={handleSubmit}>
            <h1>Evently</h1>
            <br />
            <br />
            <h3>Login</h3>
            <br />
            {inputs.map((input) => (
                <FormInput
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                />
            ))}
            <br />
            <button>Login</button>
            {loginError && <span className='user-duplicate'>Username or Password is incorrect!</span>}
        </form>
    </div>
    );
}
