import React, {
    useState,
    useEffect
} from 'react';
import {
    useHistory
} from 'react-router-dom'
import { getAllHospitals } from '../store/actions/hospitalActions';
import logo from '../assets/images/logo.svg';
import mobileLogo from '../assets/images/logo-mobile.svg';
import eyeIcon from '../assets/images/eyes-icon.svg';
import searchIcon from '../assets/images/search-icon.svg';
import loginIcon from '../assets/images/login-icon.svg';
import menuIcon from '../assets/images/menu-icon.svg';
import crossIcon from '../assets/images/crose-icon.svg';
import facebookIcon from '../assets/images/facebook-icon.svg'
import googleIcon from '../assets/images/google-icon.svg'
import linkedInIcon from '../assets/images/linkdin-icon.svg'
import twitterIcon from '../assets/images/twitter-icon.svg'



export default function Header(props) {
    const [isOpenSideBar, setIsOpenSideBar] = useState(false);
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [searchResult, setSearchResult] = useState([]);

    const history = useHistory();

    useEffect(() => {
        getAllHospitals()
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    const ToggleSidebar = () => {
        isOpenSideBar === true ? setIsOpenSideBar(false) : setIsOpenSideBar(true);
        console.log(isOpenSideBar);
    }

    const handleSearch = (event) => {
        setSearch(event.target.value);
        const result = data.filter(hospital => {
            if (event.target.value === "") {
                return data
            }
            return hospital.FacilityName.toLowerCase().includes(event.target.value.toLowerCase());
        })


        setSearchResult(result);
    }

    const goToHospital = (item,isOpen) => {
        localStorage.setItem("facilityId" , JSON.stringify({id : item.FacilityID , isOpen : isOpen}));
        setSearch('')
        history.push('/Hospital')
    }

    const goToLogin = () => {
        history.push('/Login');
    }

    const goToRegister = () => {
        history.push('/Registration');
    }

    return (
        <>
            <header>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="navigation">
                                <div className="logo">
                                    <span onClick={() => history.push('/')} style={{ cursor: 'pointer' }}>
                                        <img src={logo} alt="" className="img-fluid d-none d-sm-block" />
                                    </span>
                                </div>
                                <div className="header-right">
                                    <form className="d-none d-md-block">
                                        <input type="text" className="form-control" placeholder="Search Hospitals" onChange={handleSearch} />
                                        <span className="Search-btn">
                                            <img src={searchIcon} alt="" />
                                        </span>
                                        {
                                            search !== "" ? (
                                                <ul className='search-list'>
                                                    {
                                                        searchResult.filter((item, idx) => idx < 4).map((item, idx) => {
                                                            return <li key={idx}>
                                                                <div className='search-name' onClick={() => goToHospital(item,false)}>{item.FacilityName}</div>
                                                                <div className='gotoHospital'>
                                                                    <img src={eyeIcon}  alt="" onClick={() => goToHospital(item, true)}/>
                                                                </div>
                                                            </li>
                                                        })
                                                    }
                                                </ul>
                                            ) : ""
                                        }
                                    </form>
                                    <ul>
                                        <li>
                                            <span className="login-btn" onClick={() => goToLogin()}>
                                                <img src={loginIcon} alt="" />
                                                <span>Login</span>
                                            </span>
                                        </li>
                                        <li>
                                            <span className="register-btn" onClick={()=> goToRegister()}>Register</span>
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
                        <li><span className="sd-link" onClick={() => history.push('/About')}>About</span></li>
                    </ul>
                </div>
                <div className='sd-footer'>
                    <p className='sd-footerTagline1'>Drop us a line, and we'll get in touch</p>
                    <p className='sd-footerTagline2'>hello@safernursing.com</p>
                    <div className='footerIconsHolder'>
                        <img className='sd-footersocialicons' src={facebookIcon} alt="" />
                        <img className='sd-footersocialicons' src={googleIcon} alt="" />
                        <img className='sd-footersocialicons' src={linkedInIcon} alt="" />
                        <img className='sd-footersocialicons' src={twitterIcon} alt="" />
                    </div>
                </div>
            </div>
            <div className={`sidebar-overlay ${isOpenSideBar == true ? 'active' : ''}`} onClick={ToggleSidebar}></div>

        </>
    )
}
