import React, {
    useState,
    useEffect
} from 'react'
import {
    useHistory
} from 'react-router-dom'
import validationFormat from '../../assets/JSON/answerFormat.json'
import { getAllQuestions, generateReportID, addReport, addAnswersToReport } from '../../store/actions/reportActions';
import Demographics from './Demographics';
import Staffing from './Staffing';
import Assignment from './Assignment';
import Facility from './Facility';
import Experience from './Experience';

import Select from 'react-select';
import _, { forEach } from 'lodash'
import { ToastContainer, toast } from 'react-toastify';
import dotsToggleImage from '../../assets/images/dotsToggle.svg';





function ReportSubmit({ hospitalDatatoSubmit, fetchIsCloseReport }) {
    const history = useHistory();
    const [formIndex, setFormIndex] = useState(0);
    const [reportQuestions, setReportQuestions] = useState([]);
    const [reportAnswers, setReportAnswers] = useState({
        "1": "",
        "2": "",
        "3": "",
        "4": "",
        "5": "",
        "6": "",
        "7": "",
        "8": "",
        "9": "",
        "10": "",
        "11": "",
        "12": "",
        "13": "",
        "14": "",
        "15": "",
        "16": "",
        "17": "",
        "18": "",
        "19": "",
        "20": "",
        "21": "",
        "22": "",
        "23": "",
        "24": "",
        "25": "",
        "26": "",
        "27": "",
        "28": "",
        "29": "",
        "30": "",
        "31": "",
        "32": "",
        "33": "",
        "34": "",
        "35": "",
        "36": "",
        "37": "",
        "38": "",
        "39": "",
        "40": "",
        "41": "",
        "42": "",
        "43": "",
        "44": "",
        "45": "",
        "46": ""
    });


    const nextStep = () => {
        setFormIndex(formIndex + 1)
    }
    const prevStep = () => {
        setFormIndex(formIndex - 1)
    }

    const closeReport = (isClose) => {
        fetchIsCloseReport(isClose);
    }

    const finishReport = () => {
        const uuid = localStorage.getItem("nurseAccess");
        const userID = JSON.parse(uuid);

        const reportId = generateReportID();
        const facilityId = hospitalDatatoSubmit.address.FacilityID;
        const user = uuid === null ? 'anonymous' : userID.id;

        addReport(reportId, facilityId, user)
            .then(res => {
                if (res.success == 1) {
                    addAnswersToReport(reportId, facilityId, reportAnswers)
                        .then(res => {
                            if (res.success == 1) {
                                toast.success('Thanks for your valuable feedback', {
                                    position: toast.POSITION.TOP_RIGHT
                                })

                                setReportAnswers({});
                                setFormIndex(0);
                            }
                        })
                        .catch(err => {
                            console.log('Error !!', err)
                        })
                }
            })
            .catch(err => {
                console.log('Error !!', err)
            })


    }

    const handleChange = (input, isMulti) => (e) => {
        if (isMulti == 'yes') {
            let multiAnswers = [];
            e.forEach((item) => {
                multiAnswers.push(item)
            })

            setReportAnswers({
                ...reportAnswers,
                [input]: multiAnswers
            })
        }

        if (isMulti == 'no') {
            setReportAnswers({
                ...reportAnswers,
                [input]: e
            })
        }

        if (isMulti == 'text') {
            setReportAnswers({
                ...reportAnswers,
                [input]: e.target.value
            })
        }
    }


    const getReport = (idx) => {
        if (idx == 0) {
            let data = reportQuestions.filter(({ CategoryName }) => CategoryName === "demographics")
            return <Demographics
                handleChange={handleChange}
                prevStep={prevStep}
                nextStep={nextStep}
                closeReport={closeReport}
                values={reportAnswers}
            />
        }
        else if (idx == 1) {
            let data = reportQuestions.filter(({ CategoryName }) => CategoryName === "staffing")
            return <Staffing
                handleChange={handleChange}
                prevStep={prevStep}
                nextStep={nextStep}
                values={reportAnswers}
            />
        }
        else if (idx == 2) {
            let data = reportQuestions.filter(({ CategoryName }) => CategoryName === "assignment")
            return <Assignment
                handleChange={handleChange}
                prevStep={prevStep}
                nextStep={nextStep}
                values={reportAnswers}
            />
        }
        else if (idx == 3) {
            let data = reportQuestions.filter(({ CategoryName }) => CategoryName === "facility")
            return <Facility
                handleChange={handleChange}
                prevStep={prevStep}
                nextStep={nextStep}
                values={reportAnswers}
            />
        }
        else if (idx == 4) {
            let data = reportQuestions.filter(({ CategoryName }) => CategoryName === "experience")
            return <Experience
                handleChange={handleChange}
                prevStep={prevStep}
                finishReport={finishReport}
                values={reportAnswers}
            />
        }
    }
    return (
        <>
            <div>
                <ToastContainer />
            </div>
            <div className='report-drawer-header'>
                <div className='hospital-title-holder'>
                    <div className='tileVerticle'>

                    </div>
                    <div className='hospital-title-name'>
                        <h3>{hospitalDatatoSubmit !== null ? hospitalDatatoSubmit.address.FacilityName : 'null'}</h3>
                        <span>{hospitalDatatoSubmit !== null ? hospitalDatatoSubmit.address.Address : 'null'}</span>
                    </div>
                    <div className='toggleHolder'>
                        <img
                            src={dotsToggleImage}
                            className='three-dots-toggle'
                            onClick={() => {
                                setFormIndex(0);
                                fetchIsCloseReport(false)
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className='form-status-bar'>
                <div className='stage1'>
                    <div>
                        <h1 style={{ cursor: 'pointer' }} onClick={() => setFormIndex(0)}>Basic</h1>
                        <div className='status' style={formIndex == 0 ? { background: '#52B788' } : { background: '#081C15', opacity: '0.2' }}></div>
                    </div>
                </div>
                <div className='stage1'>
                    <div>
                        <h1 style={{ cursor: 'pointer' }} onClick={() => setFormIndex(1)}>Staffing</h1>
                        <div className='status' style={formIndex == 1 ? { background: '#52B788' } : { background: '#081C15', opacity: '0.2' }}></div>
                    </div>
                </div>
                <div className='stage1'>
                    <div>
                        <h1 style={{ cursor: 'pointer' }} onClick={() => setFormIndex(2)}>Assignment</h1>
                        <div className='status' style={formIndex == 2 ? { background: '#52B788' } : { background: '#081C15', opacity: '0.2' }}></div>
                    </div>
                </div>
                <div className='stage1'>
                    <div>
                        <h1 style={{ cursor: 'pointer' }} onClick={() => setFormIndex(3)}>Facility</h1>
                        <div className='status' style={formIndex == 3 ? { background: '#52B788' } : { background: '#081C15', opacity: '0.2' }}></div>
                    </div>
                </div>
                <div className='stage1'>
                    <div>
                        <h1 style={{ cursor: 'pointer' }} onClick={() => setFormIndex(4)}>Experience</h1>
                        <div className='status' style={formIndex == 4 ? { background: '#52B788' } : { background: '#081C15', opacity: '0.2' }}></div>
                    </div>
                </div>
            </div>
            <div className='form-holder'>
                {
                    getReport(formIndex)
                }
                <div className="searchformfld"></div>
            </div>
        </>
    )
}

export default ReportSubmit