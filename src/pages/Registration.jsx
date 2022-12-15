import React, { useState } from 'react';
import {
  useHistory
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import { registration } from '../store/actions/userActions';
import leftArrow from '../assets/images/left-arrow.svg';
import eyeIcon from '../assets/images/eyes-icon.svg';
import eyeSlash from '../assets/images/eye-slash.png';
import { useEffect } from 'react';

export default function Registration() {
  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nurse: '',
  })
  const [showPass, setShowPass] = useState(false);
  const [showConPass, setShowConPass] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: ''
  })


  // For Hide and Show Password Icons 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  }



  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputValues({
      ...inputValues,
      [name]: value
    })
  }


  const handleRegistration = (e) => {
    e.preventDefault();

    if (inputValues.email == '' || inputValues.password == '' || inputValues.confirmPassword == '' || inputValues.nurse == '') {
      setError({
        ...error,
        status: true,
        message: 'All feilds Are Mandatory'
      })
    } else if (inputValues.password.length == 6) {
      setError({
        ...error,
        status: true,
        message: 'Password must be atleast six characters long'
      })
    } else if (inputValues.password !== inputValues.confirmPassword) {
      console.log(inputValues.password.length)
      setError({
        ...error,
        status: true,
        message: 'Password Doesnot matches'
      })
    } else {
      setError({
        ...error,
        status: false,
        message: ''
      })

      registration(inputValues.email, inputValues.password, inputValues.nurse)
        .then(response => {
          console.log(response)
          if (response.success == 1 && response.message == 'registration successful') {
            toast.success(response.message, {
              position: toast.POSITION.TOP_RIGHT
            });
            setTimeout(() => {
              history.push('/Login')
            }, 3000);
          } else {
            toast.error(response.message, {
              position: toast.POSITION.TOP_RIGHT
            });
          }
        })
        .catch(err => {
          console.log("ERROR !", err)
        })
    }
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
            Create New Account
          </h3>
          <p>Inorder to create new account please fill the detials</p>
          {
            error.status && <p style={{ color: 'red' }}>{error.message}</p>
          }
        </div>
        <div className="login-form">
          <form onSubmit={handleRegistration}>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Email Address" name='email' onChange={(e) => handleUserInput(e)} />

            </div>
            <div className="form-group">
              <input type={showPass == true ? "text" : "password"} className="form-control" placeholder="Password" name='password' onChange={(e) => handleUserInput(e)} />
              <span className="eye-icon"
                onClick={()=>setShowPass(!showPass)}
              ><img src={showPass == true ? eyeSlash : eyeIcon} alt="" style={{ cursor: 'pointer' }} width='24px'/></span>

            </div>
            <div className="form-group">
              <input type={showConPass == true ? "text" : "password"} className="form-control" placeholder="Confirm Password" name='confirmPassword' onChange={(e) => handleUserInput(e)} />
              <span className="eye-icon" style={{ cursor: 'pointer' }}
              onClick={()=>setShowConPass(!showPass)}
              ><img src={showConPass == true ? eyeSlash : eyeIcon} alt="" style={{ cursor: 'pointer' }}  width='24px' /></span>

            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Nurse ID" name='nurse' onChange={(e) => handleUserInput(e)} />
            </div>
            <div className="form-group">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
                <label className="form-check-label" for="flexCheckChecked">
                  I agree with the terms & Conditions.
                </label>
              </div>
            </div>
            <div className="form-group">
              <input type="submit" className="btn-default" value="Create an Account" />
            </div>
            <div className="form-group">
              <p>Already have an Account? <span onClick={() => history.push('/Login')}>Login</span></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
