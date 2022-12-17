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


function Facility({ handleChange, prevStep, nextStep, values,isUser, logout  }) {
    const history = useHistory();

    const [reportError, setReportError] = useState([])

    // useEffect(() => {
    //     console.log('RP ERROR Facility : ', reportError)
    // }, [reportError])


    const ValidateDemographic = () => {
        let validated = [];
        Object.keys(values).forEach(function (key, idx) {
            if (idx >= 29 && idx <= 36) {
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


    const Continue = e => {
        console.log('clicked')
        e.preventDefault();
        let isValidated = ValidateDemographic();
        if (isValidated) {
            let isNext = canGoNext();

            if (isNext && reportError.length !== 0) {
                nextStep()
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
                    value={values["30"]}
                    onChange={handleChange('30', 'no')}
                    options={[{ value: 'Great', label: 'Great' }, { value: 'Good', label: 'Good' }, { value: 'OK', label: 'OK' }, { value: 'Bad', label: 'Bad' }, { value: 'Terrible', label: 'Terrible' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    required={true}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">How would you rate the management in charge</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[0].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={true}
                    value={values["31"]}
                    onChange={handleChange('31', 'yes')}
                    options={[{ value: 'Communication', label: 'Communication' }, { value: 'Respect', label: 'Respect' }, { value: 'Teamwork', label: 'Teamwork' }, { value: 'Professionalism', label: 'Professionalism' }, { value: 'Competence', label: 'Competence' }, { value: 'Compasiion', label: 'Compasiion' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">What factors influence your management rating</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[1].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={false}
                    value={values["32"]}
                    onChange={handleChange('32', 'no')}
                    options={[{ value: 'Great', label: 'Great' }, { value: 'Good', label: 'Good' }, { value: 'OK', label: 'OK' }, { value: 'Bad', label: 'Bad' }, { value: 'Terrible', label: 'Terrible' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    required={true}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">How would you rate the nurse leader ship</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[2].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={true}
                    value={values["33"]}
                    onChange={handleChange('33', 'yes')}
                    options={[{ value: 'Communication', label: 'Communication' }, { value: 'Respect', label: 'Respect' }, { value: 'Teamwork', label: 'Teamwork' }, { value: 'Professionalism', label: 'Professionalism' }, { value: 'Competence', label: 'Competence' }, { value: 'Compasiion', label: 'Compasiion' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">What factors influence your leadership rating</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[3].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={false}
                    value={values["34"]}
                    onChange={handleChange('34', 'no')}
                    options={[{ value: 'Epic, Cerner, Meditech', label: 'Epic, Cerner, Meditech' }, { value: 'Easy, Difficult', label: 'Easy, Difficult' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">What EHR do you use and how is it to work with</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[4].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={false}
                    value={values["35"]}
                    onChange={handleChange('35', 'no')}
                    options={[{ value: 'New, Adaquate, Old', label: 'New, Adaquate, Old' }, { value: 'Working, Broken', label: 'Working, Broken' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">What is the condition and state of the most equipment in the hospital</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[5].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <input
                    type="text" className="candidateName"
                    id="candidateName"
                    placeholder=" "
                    value={values["36"]}
                    onChange={handleChange('36', 'text')}
                />
                <label htmlFor="candidateName">Facility Freetext Subjective</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[6].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={false}
                    value={values["37"]}
                    onChange={handleChange('37', 'no')}
                    options={[{ value: 'Great', label: 'Great' }, { value: 'Good', label: 'Good' }, { value: 'OK', label: 'OK' }, { value: 'Bad', label: 'Bad' }, { value: 'Terrible', label: 'Terrible' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    required={true}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">Facility Subjective Score</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[7].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className='report-drawer-footer'>
                <div className='report-submit-buttons-holder'>
                    <div className='cancel-button' onClick={Previous}>
                        <p>Cancel</p>
                    </div>
                    <button className='next-button' onClick={Continue}>
                        <p>Next Step</p>
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

export default Facility