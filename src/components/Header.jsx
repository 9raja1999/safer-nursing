import React, {
    useState,
    useEffect
} from 'react';
import {
    useHistory
} from 'react-router-dom'
import logo from '../assets/images/logo.svg';
import mobileLogo from '../assets/images/logo-mobile.svg';
import searchIcon from '../assets/images/search-icon.svg';
import loginIcon from '../assets/images/login-icon.svg';
import menuIcon from '../assets/images/menu-icon.svg';
import crossIcon from '../assets/images/crose-icon.svg';
import facebookIcon from '../assets/images/facebook-icon.svg'



export default function Header() {
    const [isOpenSideBar, setIsOpenSideBar] = useState(false);

    const history = useHistory();

    const ToggleSidebar = () => {
        isOpenSideBar === true ? setIsOpenSideBar(false) : setIsOpenSideBar(true);
        console.log(isOpenSideBar);
    }

    const goToLogin = () => {
        history.push('/Login');
    }
    
    return (
        <>
            <header>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="navigation">
                                <div className="logo">
                                    <span onClick={()=>history.push('/')} style={{cursor : 'pointer'}}>
                                        <img src={logo} alt="" className="img-fluid d-none d-sm-block" />
                                    </span>
                                </div>
                                <div className="header-right">
                                    <form className="d-none d-md-block">
                                        <input type="text" className="form-control" placeholder="Search Hospitals" />
                                        <span className="Search-btn">
                                            <img src={searchIcon} alt="" />
                                        </span>
                                    </form>
                                    <ul>
                                        <li>
                                            <span className="login-btn" onClick={() => goToLogin()}>
                                                <img src={loginIcon} alt="" />
                                                <span>Login</span>
                                            </span>
                                        </li>
                                        <li>
                                            <span className="register-btn">Register</span>
                                        </li>
                                    </ul>
                                    <span className="menu-btn" onClick={ToggleSidebar}><img src={menuIcon} alt="" /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            
            <div className={`sidebar ${isOpenSideBar == true ? 'active' : ''}`}>
                <div className="sd-header">
                    <h4 className="mb-0">Navigation Menu</h4>
                    <div className="crose-btn" onClick={ToggleSidebar}>
                        <img src={crossIcon} alt="" />
                    </div>
                </div>
                <div className="sd-body">
                    <ul>
                        <li><span className="sd-link" onClick={()=>history.push('/About')}>About</span></li>
                    </ul>
                </div>
                <div className='sd-footer'>
                    <p className='sd-footerTagline1'>Drop us a line, and we'll get in touch</p>
                    <p className='sd-footerTagline2'>hello@safernursing.com</p>
                    <div className='footerIconsHolder'>
                        <img className='sd-footersocialicons' src={facebookIcon} alt="" />
                        <img className='sd-footersocialicons' src={facebookIcon} alt="" />
                        <img className='sd-footersocialicons' src={facebookIcon} alt="" />
                        <img className='sd-footersocialicons' src={facebookIcon} alt="" />
                    </div>
                </div>
            </div>
            <div className={`sidebar-overlay ${isOpenSideBar == true ? 'active' : ''}`} onClick={ToggleSidebar}></div>
        
        </>
    )
}
