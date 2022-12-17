import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import _ from 'lodash'
import { ToastContainer, toast } from 'react-toastify';

import { getAllQuestions, generateReportID, addReport, addAnswersToReport } from '../../store/actions/reportActions';
import HospitalImage from '../../assets/images/bedford-img.png';
import ReportSubmit from '../Forms/ReportSubmit';
import dotsToggleImage from '../../assets/images/dotsToggle.svg';
import { useEffect } from 'react';

export default function HospitalModal({ hospitalDatatoSubmit, name, address, reportQuestions, fetchIsScroll, isUser, isLoggedIn }) {

    const history = useHistory()
    const [openReport, setOpenReport] = useState(false);
    const [formIndex, setFormIndex] = useState(0);
    const [reportAnswers, setReportAnswers] = useState({});
    const [reportError, setReportError] = useState({
        error: false,
        message: ''
    })

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('facilityId'));
        let isOpen = data.isOpen;
        setOpenReport(isOpen)
    }, [localStorage.getItem("facilityId")])


    const fetchIsCloseReport = (isClose) => {
        setOpenReport(isClose)
    }


    const onOpenReport = () => {
        console.log(';WOW')
        openReport == true ? setOpenReport(false) : setOpenReport(true);

        // Promise.resolve()
        //     .then(() => {
        //         setOpenReport(check => !check);
        //         new Promise((resolve, reject) => {
        //             setTimeout(() => {
        //                 resolve(openReport)
        //             }, 1);
        //         })
        //     })
        //     .then(() => {
        //         fetchIsScroll(true);
        //     })
    }


    return (
        <>
            <div>
                <ToastContainer />
            </div>
            <div className="hospital-popup">
                <div className="image-holder">
                    <img src={HospitalImage} alt="" className="img-fluid" />
                </div>
                <div className="text-box">
                    <h3>{name}</h3>
                    <p>{address}</p>
                    <ul>
                        <li>
                            <span className="red-bg" ></span>
                            <p> STAFFING </p>
                        </li>
                        <li>
                            <span className="yellow-bg"></span> <p> ASSIGNMENT</p>
                        </li>
                        <li>
                            <span></span><p>FACILITY</p>
                        </li>
                        <li>
                            <span className="red-bg"></span><p>EXPERIENCE</p>
                        </li>
                    </ul>
                    <span className="report-btn" onClick={() => onOpenReport()} >Submit
                        Report
                    </span>
                </div>
            </div>
            <div className={`reportsidebar ${openReport == true ? 'active' : ''}`}>
                <ReportSubmit
                    hospitalDatatoSubmit={hospitalDatatoSubmit}
                    fetchIsCloseReport={fetchIsCloseReport}
                    isUser={isUser}
                    isLoggedIn={isLoggedIn}
                />
            </div>
        </>
    )
}
