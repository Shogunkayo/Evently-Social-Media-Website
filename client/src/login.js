import React from "react";
import { useState } from "react";
import FormInput from './signup_input';

export default function Login() {
  const [values, setValues] = useState({
    username: "",
    password: ""
  });

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
      </form>
    </div>
  );
}
