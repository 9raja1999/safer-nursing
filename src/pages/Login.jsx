import React, { useEffect, useState } from 'react'
import {
  useHistory
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { login } from '../store/actions/userActions';
import leftArrow from '../assets/images/left-arrow.svg';
import eyeIcon from '../assets/images/eyes-icon.svg';
import eyeSlash from '../assets/images/eye-slash.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPass, setShowPass] = useState(false);

  const history = useHistory();

  const goToRegistration = () => {
    history.push('/Registration');
  }

  const goBack = () => {
    history.goBack();
  }

  const handleLogin = (e) => {
    console.log(email, password)
    e.preventDefault()
    login(email, password)
      .then(res => {
        if (res.success == 1 && res.message == "Login successful") {
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT
          });
          localStorage.setItem("nurseAccess", JSON.stringify({ token: res.token, id: res.userID }));
          setTimeout(() => {
            history.push('/')
          }, 3000);
        } else {
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT
          });
        }
      })
      .catch(err => {
        console.log(err)
      })
  }


  return (
    <div className="login-sec">
      <div>
        <ToastContainer />
      </div>
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
                type={showPass == true ? "text" : "password"}
                className="form-control"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="eye-icon" onClick={() => setShowPass(!showPass)}>
                <img src={showPass == true ? eyeSlash : eyeIcon} alt="" width='24px' />
              </span>
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
