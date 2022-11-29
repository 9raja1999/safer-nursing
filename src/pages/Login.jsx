import React, { useEffect, useState } from 'react'
import {
  useHistory
} from 'react-router-dom';
import leftArrow from '../assets/images/left-arrow.svg';
import eyeIcon from '../assets/images/eyes-icon.svg';

export default function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const history = useHistory();

  const goToRegistration = () => {
    history.push('/Registration');
  }
  
  const goBack = () => {
    history.goBack();
  }

  const handleLogin = () => {
    alert('Login')
  }


  return (
    <div className="login-sec">
      <div className="login-box">
        <div className="back-arrowٖ">
          <a onClick={() => goBack()}><img src={leftArrow} alt="" /></a>
        </div>
        <div className="login-title">
          <h3>
            Login to your Account
          </h3>
          <p>Please enter your account information</p>
        </div>
        <div className="login-form">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="eye-icon"><img src={eyeIcon} alt="" /></span>
            </div>
            <div className="form-group">
              <a className="forget" href="#">Forget your Password?</a>
            </div>
            <div className="form-group">
              <input
                type="submit"
                className="btn-default"
                value="Login"
              />
            </div>
            <div className="form-group">
              <p>Don’t have an Account? <span onClick={() => goToRegistration()}>Register</span></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
