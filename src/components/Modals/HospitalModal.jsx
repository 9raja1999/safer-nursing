import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import _ from 'lodash'
import { ToastContainer, toast } from 'react-toastify';
import { getHospitalByID, getUnitScores, getHospitalSummary } from '../../store/actions/hospitalActions';
import { getAllQuestions, generateReportID, addReport, addAnswersToReport } from '../../store/actions/reportActions';
import HospitalImage from '../../assets/images/bedford-img.png';
import ReportSubmit from '../Forms/ReportSubmit';
import dotsToggleImage from '../../assets/images/dotsToggle.svg';
import { useEffect } from 'react';

export default function HospitalModal({ hospitalDatatoSubmit, name, address, reportQuestions, fetchIsScroll, isUser, isLoggedIn, reportsPerFacility, staffing, assignment, facility, experience }) {

    const history = useHistory()
    const [openReport, setOpenReport] = useState(false);



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
                    {

                        (staffing !== 0 && assignment !== 0 && facility !== 0 && experience !== 0) ? (

                            <ul>
                                <li>

                                    <span style={{
                                        background:
                                            (staffing >= 4.5 && staffing <= 5) ?
                                                'blue' :
                                                (staffing >= 3.6 && staffing <= 4.4) ?
                                                    '#52B788' :
                                                    (staffing >= 2.6 && staffing <= 3.5) ?
                                                        '#E0D16C' :
                                                        (staffing >= 1.6 && staffing <= 2.5) ?
                                                            'orange' : '#E46870'
                                    }}>
                                        {/* {staffing.toFixed(1)} */}
                                    </span>
                                    <p> STAFFING</p>
                                </li>
                                <li>
                                    <span style={{
                                        background:
                                            (assignment >= 4.5 && assignment <= 5) ?
                                                'blue' :
                                                (assignment >= 3.6 && assignment <= 4.4) ?
                                                    '#52B788' :
                                                    (assignment >= 2.6 && assignment <= 3.5) ?
                                                        '#E0D16C' :
                                                        (assignment >= 1.6 && assignment <= 2.5) ?
                                                            'orange' : '#E46870'
                                    }}>
                                        {/* {assignment.toFixed(1)} */}
                                    </span>
                                    <p> ASSIGNMENT</p>
                                </li>
                                <li>
                                    <span style={{
                                        background:
                                            (facility >= 4.5 && facility <= 5) ?
                                                'blue' :
                                                (facility >= 3.6 && facility <= 4.4) ?
                                                    '#52B788' :
                                                    (facility >= 2.6 && facility <= 3.5) ?
                                                        '#E0D16C' :
                                                        (facility >= 1.6 && facility <= 2.5) ?
                                                            'orange' : '#E46870'
                                    }}>
                                        {/* {facility.toFixed(1)} */}
                                    </span>
                                    <p>FACILITY</p>
                                </li>
                                <li>
                                    <span style={{
                                        background:
                                            (experience >= 4.5 && experience <= 5) ?
                                                'blue' :
                                                (experience >= 3.6 && experience <= 4.4) ?
                                                    '#52B788' :
                                                    (experience >= 2.6 && experience <= 3.5) ?
                                                        '#E0D16C' :
                                                        (experience >= 1.6 && experience <= 2.5) ?
                                                            'orange' : '#E46870'
                                    }}>
                                        {/* {experience.toFixed(1)} */}
                                    </span>
                                    <p>EXPERIENCE</p>
                                </li>
                            </ul>
                        ) : (
                            <ul>
                                <li>
                                    <span style={{ background: '#081C15', opacity: '0.5' }}></span>
                                    <p> STAFFING</p>
                                </li>
                                <li>
                                    <span style={{ background: '#081C15', opacity: '0.5' }}></span>
                                    <p> ASSIGNMENT</p>
                                </li>
                                <li>
                                    <span style={{ background: '#081C15', opacity: '0.5' }}></span>
                                    <p>FACILITY</p>
                                </li>
                                <li>
                                    <span style={{ background: '#081C15', opacity: '0.5' }}></span>
                                    <p>EXPERIENCE</p>
                                </li>
                            </ul>
                        )
                    }
                    {
                        isUser && <span className="report-btn" onClick={() => onOpenReport()} >
                            Submit Report
                        </span>
                    }

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
