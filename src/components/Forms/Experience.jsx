import React from 'react'
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useHistory } from 'react-router-dom';


const selectStyle = {
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
    multiValue: (provided, state) => ({
        ...provided,
        backgroundColor: '#EEFCF5',
    }),
    multiValueRemove: (provided, state) => ({
        ...provided,
        backgroundColor: '#52B788',
        color: 'white',
        ':hover': {
            backgroundColor: '#EEFCF5',
            color: '#52B788',
        },
    })
}

function Experience({ handleChange, prevStep, finishReport, values, isUser, logout }) {
    const history = useHistory();
    const [reportError, setReportError] = useState([])

    // useEffect(() => {
    //     console.log('RP ERROR Experience : ', reportError)
    // }, [reportError])


    const ValidateDemographic = () => {
        let validated = [];
        Object.keys(values).forEach(function (key, idx) {
            if (idx >= 37 && idx <= 45) {
                if (values[key] == "") {
                    validated.push({ e: 'null' })
                } else {
                    validated.push({ e: 'not' })
                    // Object.assign(validted, {key: "Not Empty"});
                }
            }
        });
        setReportError(validated)
        return true
    }

    const canGoNext = () => {
        if (reportError.some(obj => obj.e === 'null')) {
            return false
        } else {
            return true
        }
    }


    const Finish = e => {
        console.log('clicked')
        e.preventDefault();
        let isValidated = ValidateDemographic();
        if (isValidated) {
            let isNext = canGoNext();

            if (isNext && reportError.length !== 0) {
                finishReport()
            }

        } else {
            alert('all feilds are mandatory')
        }
    }

    const Previous = e => {
        e.preventDefault();
        prevStep();

    }

    return (
        <form>
            <div className="searchformfld">
                <Select
                    isMulti={false}
                    value={values["38"]}
                    onChange={handleChange('38', 'no')}
                    options={[{ value: 'Always', label: 'Always' }, { value: 'Usually', label: 'Usually' }, { value: 'Sometimes', label: 'Sometimes' }, { value: 'Rarely', label: 'Rarely' }, { value: 'Never', label: 'Never' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    required={true}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">Are you able to adjust your schedule if needed</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[0].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={false}
                    value={values["39"]}
                    onChange={handleChange('39', 'no')}
                    options={[{ value: 'Always', label: 'Always' }, { value: 'Usually', label: 'Usually' }, { value: 'Sometimes', label: 'Sometimes' }, { value: 'Rarely', label: 'Rarely' }, { value: 'Never', label: 'Never' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    required={true}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">Are your time of request honoured</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[1].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={false}
                    value={values["40"]}
                    onChange={handleChange('40', 'no')}
                    options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    required={true}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">Does your workplace makes you feel burned out</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[2].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={false}
                    value={values["41"]}
                    onChange={handleChange('41', 'no')}
                    options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    required={true}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">Would you recommend your unit role to a friend</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[3].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={false}
                    value={values["42"]}
                    onChange={handleChange('42', 'no')}
                    options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    required={true}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">Would you recommend your unit Hospital to a friend</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[4].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={false}
                    value={values["43"]}
                    onChange={handleChange('43', 'no')}
                    options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    required={true}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">Are you actively looking for a different job</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[5].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={false}
                    value={values["44"]}
                    onChange={handleChange('44', 'no')}
                    options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    required={true}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">Are you actively looking to change careere</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[6].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <input
                    type="text" className="candidateName"
                    id="candidateName"
                    placeholder=" "
                    value={values["45"]}
                    onChange={handleChange('45', 'text')}
                />
                <label htmlFor="candidateName">Experience Freetext Subjective</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[7].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={false}
                    value={values["46"]}
                    onChange={handleChange('46', 'no')}
                    options={[{ value: 'Great', label: 'Great' }, { value: 'Good', label: 'Good' }, { value: 'OK', label: 'OK' }, { value: 'Bad', label: 'Bad' }, { value: 'Terrible', label: 'Terrible' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    required={true}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">Experience Subjective Score</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[8].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className='report-drawer-footer'>
                <div className='report-submit-buttons-holder'>
                    <div className='cancel-button' onClick={Previous}>
                        <p>Cancel</p>
                    </div>
                    <button className='next-button' onClick={Finish}>
                        <p>Finish</p>
                    </button>
                </div>
                {
                    isUser == true ? (
                        <p className='report-footer-tagline'>
                            You are already log in
                            <span onClick={() => logout()}> Logout</span>
                        </p>
                    ) : (
                        <p className='report-footer-tagline'>
                            Submit Report as a user,
                            <span onClick={() => history.push('/Login')}> Login</span> or <span onClick={() => history.push('/Registration')}>
                                Register
                            </span>
                        </p>
                    )
                }
            </div>
        </form>
    )
}

export default Experience