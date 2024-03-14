import { useState } from 'react'
// import './LoginSignup.css';
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'
import './signup.css'
// import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
// import Validation from './Loginvalidation';


export default function LoginSignup() {
  const [values, setvalues] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate();
  const [errors, setErrors] = useState({})
  const handleInput = (event) => {
    setvalues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    // setErrors(Validation(values));
    const err = Validation(values);
    setErrors(err);
    if (errors.email === "" && errors.password === "") {
      axios.post('http://localhost:3002/LoginSignup', values)
        .then(res => {
          if (res.data === "Successful") {
            navigate('/home');
          }else{
            alert("No record existed");
          }
        })
        .catch(err => console.log(err));
    }
  }
  function Validation(values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    if (values.email === "") {
      error.email = "Email should not be empty";
    }
    else if (!email_pattern.test(values.email)) {
      error.email = "Email is invalid"
    }
    else {
      error.email = ""
    }
    if (values.password === "") {
      error.password = "password should not be empty"
    }
    else if (!password_pattern.test(values.password)) {
      error.password = "Password didn't match"
    } else {
      error.password = ""
    }
    return error;
  }
  return (
    <div className='container' >
      <form action="" onSubmit={handleSubmit}>
        <div className="header" >
          <div className="text"></div>
          <div className='text'>
            Login
          </div>

          <div className="input">
            <img src={email_icon} alt="" />
            <input type="email"
              name='email'
              placeholder='Email Id'
              className='form-control'
              onChange={handleInput} />
            {errors.email && <span className='text-danger'>{errors.email}</span>}
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input type="password"
              name='password'
              placeholder='Password'
              className='form-control'
              onChange={handleInput}
            />
            {errors.password && <span className='text-danger'>{errors.password}</span>}
          </div>
          <div className="forgot-password">Lost Password?<span>Click Here!</span></div>
          <button type='submit' className='loginbtn'>Login</button>

          <footer> Already have a account?<Link to='/Signup'>SignUp</Link></footer>
        </div>
      </form>
    </div>



  )
}
