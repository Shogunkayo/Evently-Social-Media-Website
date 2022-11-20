import React from 'react';
import { useNavigate } from 'react-router-dom';

import FormInput from './signup_input';

export default function SignUp() {
  const [values, setValues] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

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
        "Password should be 8-20 characters long, and should include at least 1 special character, 1 number and 1 capital letter.",
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
    console.log(values)
    const user_name = values.username;
    const user_password = values.password;
    const user_email = values.email;
    let user_followers = [];
    let user_following = [];
    let user_posts = [];
    let user_interested = [];
    let user_message_rooms = [];

    const user_data = {user_name, user_password, user_email, user_followers, user_following, user_posts, user_interested, user_message_rooms};

    fetch('http://localhost:4000/api/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user_data)
    }).then(()=>{
      console.log("USER CREATED");
      console.log(JSON.stringify(user_data));
      navigate('/login')
    })

  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  console.log(values);
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
        <button>Submit</button>
      </form>
    </div>
  );
}
