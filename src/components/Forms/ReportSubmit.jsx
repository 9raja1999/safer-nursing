import React, {
    useState,
    useEffect
} from 'react'
import {
    useHistory
} from 'react-router-dom'
import { getAllQuestions, generateReportID, addReport, addAnswersToReport } from '../../store/actions/reportActions';
import Select from 'react-select';
import _ from 'lodash'
import { ToastContainer, toast } from 'react-toastify';
import dotsToggleImage from '../../assets/images/dotsToggle.svg';




function ReportSubmit({ hospitalDatatoSubmit, fetchIsCloseReport }) {
    const history = useHistory();
    const [formIndex, setFormIndex] = useState(0);
    const [reportQuestions, setReportQuestions] = useState([]);
    const [reportAnswers, setReportAnswers] = useState({});
    const [reportError, setReportError] = useState({
        error: false,
        message: ''
    })

    useEffect(() => {
        getAllQuestions()
            .then(res => {
                if (res.success == 1) {
                    setReportQuestions(res.data)
                }
            })
            .catch(err => {
                console.log('ERROR !!', err)
            })
    }, [])

    const handleChange = _.debounce((event, type, isInput) => {
        // Check is event is Multi value
        let isMultiValue = Array.isArray(event);
        if (isMultiValue == true) {
            let multiAnswers = [];
            event.forEach((item) => {
                multiAnswers.push(item.value)
            })
            setReportAnswers({
                ...reportAnswers,
                [event[0].name]: multiAnswers
            })
        }
        if (isMultiValue == false) {
            setReportAnswers({
                ...reportAnswers,
                [event.name]: event.value
            })
        }
    }, 500)

    const handleInputChange = _.debounce((event, type) => {
        event.preventDefault();
        setReportAnswers({
            ...reportAnswers,
            [event.target.name]: event.target.value
        })
    }, 500);

    const goNext = (e) => {
        // e.preventDefault();
        let count = formIndex;
        count = count + 1;
        if (count < 5) {
            setFormIndex(formIndex + 1);
        }
    }

    const cancelReport = () => {
        setFormIndex(0);
        setReportAnswers({});
        fetchIsCloseReport(false);
    }

    const submitReport = () => {
        console.log('Report Asnswers : ', reportAnswers)
        const uuid = localStorage.getItem("nurseAccess");
        const userID = JSON.parse(uuid);
        const reportId = generateReportID();
        const facilityId = hospitalDatatoSubmit.address.FacilityID;
        const user = uuid === null ? 'anonymous' : userID.id;
        const isAllQuestionsAnswered = Object.keys(reportAnswers).length;
        if (isAllQuestionsAnswered !== reportQuestions.length) {
            setReportError({
                ...reportError,
                error: true,
                message: 'All feilds are mandatory'
            })

            toast.error('All feilds are mandatory', {
                position: toast.POSITION.TOP_RIGHT
            });

            setFormIndex(0);
        } else {
            addReport(reportId, facilityId, user)
                .then(res => {
                    console.log(res)
                    if (res.success == 1) {
                        addAnswersToReport(reportId, facilityId, reportAnswers)
                            .then(res => {
                                if (res.success == 1) {
                                    toast.success('Thanks for your valuable feedback', {
                                        position: toast.POSITION.TOP_RIGHT
                                    })

                                    setReportAnswers({});
                                    setFormIndex(0);
                                    setTimeout(() => {
                                        window.location.reload()
                                    }, 3000);
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
    }

    const getForm = (data, type) => {
        return <form>
            {
                data.map((item, idx) => {
                    let options = [];
                    item.options.forEach(element => {
                        let op = {
                            value: element.Choice,
                            label: element.Choice,
                            name: item.QuestionID
                        }
                        options.push(op);
                    })
                    if (item.options.length !== 0) {
                        return <div className="searchformfld" key={item.QuestionID}>
                            <Select
                                isMulti={false}
                                name=""
                                options={options}
                                onChange={(event) => handleChange(event, type, false)}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                components={{
                                    IndicatorSeparator: () => null
                                }}
                                styles={{
                                    container: (provided, state) => ({
                                        ...provided,
                                        border: '2px solid #52B788',
                                        borderRadius: '14px',
                                    }),
                                    control: (provided, state) => ({
                                        ...provided,
                                        border: 'none',
                                        borderRadius: '15px',
                                        ':active': {
                                            border: 'none'
                                        }
                                    }),


                                }}
                            />
                            <label htmlFor="candidateName">{item.question}</label>
                        </div>
                    }
                    return <div className="searchformfld" key={item.QuestionID}>
                        <input type="text" className="candidateName" id="candidateName" name={item.QuestionID} placeholder=" " onChange={(event) => handleInputChange(event, type)} />
                        <label htmlFor="candidateName">{item.question}</label>
                    </div>
                })
            }
            <div className='report-drawer-footer'>
                <div className='report-submit-buttons-holder'>
                    <div className='cancel-button' onClick={() => cancelReport()}>
                        <p>Cancel</p>
                    </div>
                    {
                        formIndex == 4 ? (
                            <div className='next-button' onClick={() => submitReport()}>
                                <p>Finish</p>
                            </div>
                        ) : (
                            <div className='next-button' onClick={goNext}>
                                <p>Next Step</p>
                            </div>
                        )
                    }
                </div>
                <p className='report-footer-tagline'>
                    Submit Report as a user,
                    <span onClick={() => history.push('/Login')}> Login</span> or <span onClick={() => history.push('/Registration')}>Register</span></p>
            </div>
        </form>
    }

    const getReport = (idx) => {
        if (idx == 0) {
            let data = reportQuestions.filter(({ CategoryName }) => CategoryName === "demographics")
            return getForm(data, "demographics");
        }
        else if (idx == 1) {
            let data = reportQuestions.filter(({ CategoryName }) => CategoryName === "staffing")
            return getForm(data, "staffing");
        }
        else if (idx == 2) {
            let data = reportQuestions.filter(({ CategoryName }) => CategoryName === "assignment")
            return getForm(data, "assignment");
        }
        else if (idx == 3) {
            let data = reportQuestions.filter(({ CategoryName }) => CategoryName === "facility")
            return getForm(data, "facility");
        }
        else if (idx == 4) {
            let data = reportQuestions.filter(({ CategoryName }) => CategoryName === "experience")
            return getForm(data, "experience");
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
                        <h1>Basic</h1>
                        <div className='status' style={formIndex == 0 ? { background: '#52B788' } : { background: '#081C15', opacity: '0.2' }}></div>
                    </div>
                </div>
                <div className='stage1'>
                    <div>
                        <h1>Staffing</h1>
                        <div className='status' style={formIndex == 1 ? { background: '#52B788' } : { background: '#081C15', opacity: '0.2' }}></div>
                    </div>
                </div>
                <div className='stage1'>
                    <div>
                        <h1>Assignment</h1>
                        <div className='status' style={formIndex == 2 ? { background: '#52B788' } : { background: '#081C15', opacity: '0.2' }}></div>
                    </div>
                </div>
                <div className='stage1'>
                    <div>
                        <h1>Facility</h1>
                        <div className='status' style={formIndex == 3 ? { background: '#52B788' } : { background: '#081C15', opacity: '0.2' }}></div>
                    </div>
                </div>
                <div className='stage1'>
                    <div>
                        <h1>Experience</h1>
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