import React, { useState } from 'react';
import {
  useHistory
} from 'react-router-dom';
import leftArrow from '../assets/images/left-arrow.svg';
import eyeIcon from '../assets/images/eyes-icon.svg';
import eyeSlashIcon from '../assets/images/search-icon.svg';

export default function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nurseId, setNurseId] = useState('');

  // For Hide and Show Password Icons 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  }

  const handleRegistration = () => {
    alert('Registration')
  }


  return (
    <div className="login-sec">
      <div className="login-box">
        <div className="back-arrowٖ">
          <a onClick={() => goBack()}><img src={leftArrow} alt="" /></a>
        </div>
        <div className="login-title">
          <h3>
            Create New Account
          </h3>
          <p>Inorder to create new account please fill the detials</p>
        </div>
        <div className="login-form">
          <form onSubmit={handleRegistration}>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Email Address" />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Password" />
              <span className="eye-icon"><img src={eyeIcon} alt="" /></span>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Confirm Password" />
              <span
                className="eye-icon"
              ><img src={eyeIcon} alt="" /></span>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Nurse ID" />
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
