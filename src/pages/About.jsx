import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import Header from '../components/Header';
import UserHeader from '../components/UserHeader';
import Request from '../components/Forms/Request';
import Banner from '../components/Banner';
import ExploreInsidhts from '../components/ExploreInsidhts';
import MobileSearchIcon from '../assets/images/search-icon.svg'
import NurseImage from '../assets/images/nurse.png';

export default function About() {
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("nurseAccess") === null) {
      setIsUser(false)
    } else {
      setIsUser(true)
    }
  }, [])

  const isLoggedIn = (isUser) => {
    setIsUser(isUser)
  }

  return (
    <>
      <div class="wrapper">
        {
          isUser == true ? (
            <UserHeader
              isLoggedIn={isLoggedIn}
            />
          ) : (
            <Header
            />
          )
        }
        <div class="mobile-search">
          <form>
            <input type="text" class="form-control" placeholder="Search Hospitals" />
            <a class="Search-btn" href="#"><img src={MobileSearchIcon} alt="" /></a>
          </form>
        </div>
        <section class="about-banner-sec">
          <div class="container">
            <div class="row">
              <div class="col-lg-6">
                <div class="text-box">
                  <h2><span>Hey!</span>
                    Learn More. </h2>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                    has been the industry's standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a type specimen book. It has
                    survived not only five centuries,</p>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="about-banner-right">
                  <div class="about-form">
                    <div class="login-form">
                      <Request />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="about-safe-sec">
          <Banner
            leftSectionImage={NurseImage}
          />
        </section>
        <section class="generate-insight-sec generate-about">
          <ExploreInsidhts
            background='#081C15'
            color='white'
          />
        </section>
        <footer class="green-bg">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <div class="text-box">
                  <p>Copyright | 2023 SAFE NURSING. All right reserved</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
