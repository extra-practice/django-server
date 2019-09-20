import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";


const Login = (props) => {
  const [inputValue, setInputValue] = useState({ username: "Lambda School", password: "i<3Lambd4" })
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const handleChange = e => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth().post("/login", inputValue)
      .then(res => {
        console.log(res)
        localStorage.setItem("token", res.data.payload)
        props.history.push("/bubbles")
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={inputValue.username}
          onChange={handleChange}
        />
        <input
          type="text"
          name="password"
          value={inputValue.password}
          onChange={handleChange}
        />
        <button>login</button>
      </form>
    </>
  );
};

export default Login;
