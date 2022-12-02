import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import FormInput from './signup_input';

export default function SignUp() {

    const navigate = useNavigate()
    const {user} = useSelector((state)=> state.auth)

    useEffect(()=>{
        if(user){
            navigate('/explore')
        }
    }, [user, navigate])

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });


    const [userPending, setUserPending] = useState(false)
    const [isUserDuplicate, setUserDuplicate] = useState(false)
    const [isUserCreated, setUserCreated] = useState(false)

    const inputs = [
        {
          id: 1,
          name: "username",
          type: "text",
          placeholder: "Username",
          errorMessage: "Username should be 3-16 characters long",
          label: "Username",
          pattern: "^[A-Za-z0-9]{3,16}$",
          required: "true"
        },

        {
          id: 2,
          name: "email",
          type: "email",
          placeholder: "Email ID",
          errorMessage: "Email address entered should be valid",
          label: "Email ID",
          required: "true"
        },

        {
          id: 3,
          name: "password",
          type: "password",
          placeholder: "Password",
          errorMessage:
            "Password should be 8-20 characters long, and should include at least 1 special character and 1 number",
          pattern:
            "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
          label: "Password",
          required: "true"
        },

        {
          id: 4,
          name: "confirmPassword",
          type: "password",
          placeholder: "Confirm Password",
          errorMessage: "Passwords don't match",
          label: "Confirm Password",
          pattern: values.password,
          required: "true"
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault()
      
        const user_name = values.username;

        setUserPending(true);
        setUserDuplicate(false);
        setUserCreated(false);

        fetch('http://localhost:4000/api/signup/check',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user_name})
        }).then((response) => {
          response.json().then((body) => {
            let userDuplicate = false;
            if(body.userExists){
                setUserPending(false);
                userDuplicate = true;
            }
            setUserDuplicate(userDuplicate);

            if(!userDuplicate){
              const user_password = values.password;
              const user_email = values.email;
            
              const user_data = {user_name, user_password, user_email};
        
              fetch('http://localhost:4000/api/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(user_data)
              }).then(()=>{
                  setUserPending(false);
                  setUserCreated(true);
                  setTimeout(()=>{
                    navigate('/login');
                  }, 3000);
              })
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
            <a href='/'>Home</a>
            <a href='/signup'>Sign-Up</a>
            <a href='/login'>Login</a>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <h1>Evently</h1>
        <br />
        <br />
        <h3>Sign up</h3>
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
        {!userPending && <button>Create User!</button> }
        {userPending && <button>Creating User...</button> }
        {isUserDuplicate && <span className='user-duplicate'>Username already in use!</span>}
        {isUserCreated && <div><br/><span className='user-created'>Welcome aboard! Please use the login page to log into your account. Redirecting shortly</span></div>}
      </form>
    </div>
    );
}
