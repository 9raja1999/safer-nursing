import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import _ from 'lodash'
import { ToastContainer, toast } from 'react-toastify';
import { getHospitalByID, getUnitScores } from '../../store/actions/hospitalActions';
import { getAllQuestions, generateReportID, addReport, addAnswersToReport } from '../../store/actions/reportActions';
import HospitalImage from '../../assets/images/bedford-img.png';
import ReportSubmit from '../Forms/ReportSubmit';
import dotsToggleImage from '../../assets/images/dotsToggle.svg';
import { useEffect } from 'react';

export default function HospitalModal({ hospitalDatatoSubmit, name, address, reportQuestions, fetchIsScroll, isUser, isLoggedIn, reportsPerFacility }) {

    const history = useHistory()
    const [openReport, setOpenReport] = useState(false);
    const [unitScores, setUnitScores] = useState({});
    const [formIndex, setFormIndex] = useState(0);
    const [reportAnswers, setReportAnswers] = useState({});
    const [reportError, setReportError] = useState({
        error: false,
        message: ''
    })

    useEffect(() => {
        console.log('RP_ID :', hospitalDatatoSubmit.geolocations.report_id)
        getUnitScores(hospitalDatatoSubmit.geolocations.report_id, hospitalDatatoSubmit.geolocations.FacilityID)
            .then(response => {
                if (response.message == 'data found') {
                    setUnitScores(response.data)
                }
            })
            .catch(err => {
                console.log('ERR')
            })
        console.log('jhgjhg')
    }, [hospitalDatatoSubmit])

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
                    {

                        (Object.keys(unitScores).length !== 0) ? (

                            <ul>
                                <li>
                                    <span style={{
                                        background: unitScores.staffing.toLowerCase() == 'great' ? (
                                            'blue'
                                        ) : unitScores.staffing.toLowerCase() == 'good' ? (
                                            '#52B788'
                                        ) : unitScores.staffing.toLowerCase() == 'ok' ? (
                                            '#E0D16C'
                                        ) : unitScores.staffing.toLowerCase() == 'bad' ? (
                                            'orange'
                                        ) : unitScores.staffing.toLowerCase() == 'terrible' ? (
                                            '#E46870'
                                        ) : 'pink'
                                    }}></span>
                                    <p> STAFFING</p>
                                </li>
                                <li>
                                    <span style={{
                                        background: unitScores.assignment.toLowerCase() == 'great' ? (
                                            'blue'
                                        ) : unitScores.assignment.toLowerCase() == 'good' ? (
                                            '#52B788'
                                        ) : unitScores.assignment.toLowerCase() == 'ok' ? (
                                            '#E0D16C'
                                        ) : unitScores.assignment.toLowerCase() == 'bad' ? (
                                            'orange'
                                        ) : unitScores.assignment.toLowerCase() == 'terrible' ? (
                                            '#E46870'
                                        ) : 'pink'
                                    }}></span>
                                    <p> ASSIGNMENT</p>
                                </li>
                                <li>
                                    <span style={{
                                        background: unitScores.facility.toLowerCase() == 'great' ? (
                                            'blue'
                                        ) : unitScores.facility.toLowerCase() == 'good' ? (
                                            '#52B788'
                                        ) : unitScores.facility.toLowerCase() == 'ok' ? (
                                            '#E0D16C'
                                        ) : unitScores.facility.toLowerCase() == 'bad' ? (
                                            'orange'
                                        ) : unitScores.facility.toLowerCase() == 'terrible' ? (
                                            '#E46870'
                                        ) : 'pink'
                                    }}></span>
                                    <p>FACILITY</p>
                                </li>
                                <li>
                                    <span style={{
                                        background: unitScores.experience.toLowerCase() == 'great' ? (
                                            'blue'
                                        ) : unitScores.experience.toLowerCase() == 'good' ? (
                                            '#52B788'
                                        ) : unitScores.experience.toLowerCase() == 'ok' ? (
                                            '#E0D16C'
                                        ) : unitScores.experience.toLowerCase() == 'bad' ? (
                                            'orange'
                                        ) : unitScores.experience.toLowerCase() == 'terrible' ? (
                                            '#E46870'
                                        ) : 'pink'
                                    }}></span>
                                    <p>EXPERIENCE</p>
                                </li>
                            </ul>
                        ) : (
                            <ul>
                                <li>
                                    <span></span>
                                    <p> STAFFING</p>
                                </li>
                                <li>
                                    <span></span>
                                    <p> ASSIGNMENT</p>
                                </li>
                                <li>
                                    <span></span>
                                    <p>FACILITY</p>
                                </li>
                                <li>
                                    <span></span>
                                    <p>EXPERIENCE</p>
                                </li>
                            </ul>
                        )
                    }
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
