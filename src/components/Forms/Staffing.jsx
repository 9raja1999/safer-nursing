import React from 'react'
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useHistory } from 'react-router-dom';

const selectStyle = {
    container: (provided, state) => ({
        ...provided,
        border: '2px solid #52B788',
        borderRadius: '14px',
        textTransform: 'Capitalize'
    }),
    control: (provided, state) => ({
        ...provided,
        border: 'none',
        borderRadius: '15px',
        border: '0',
        // This line disable the blue border
        boxShadow: 'none',
        ':active': {
            border: 'none'
        }
    }),
    multiValue: (provided, state) => ({
        ...provided,
        backgroundColor: '#EEFCF5',
        textTransform: 'Capitalize',
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

function Staffing({ handleChange, prevStep, nextStep, values, isUser, logout }) {
    const history = useHistory();

    const [reportError, setReportError] = useState([])

    // useEffect(() => {
    //     console.log('RP ERROR Staffing: ', reportError)
    // }, [reportError])

    useEffect(() => {
        console.log('Scrolling')
    }, [])

    useEffect(() => {
        if (reportError.length !== 0) {
            let isNext = reportError.some(obj => obj.e === 'null');

            if (isNext == true && reportError.length !== 0) {
                // nextStep()
                console.log('I am not going next', reportError)
            } else {
                nextStep()
            }
        }
    }, [reportError])


    const ValidateDemographic = () => {
        let validated = [];
        Object.keys(values).forEach(function (key, idx) {
            if (idx >= 10 && idx <= 17) {
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


    const Continue = e => {
        console.log('clicked')
        e.preventDefault();
        ValidateDemographic();

    }

    const Previous = e => {
        e.preventDefault();
        prevStep();

    }

    return (
        <form>
            <div className="searchformfld">
                <input
                    type="text" className="candidateName"
                    id="candidateName"
                    placeholder="1:1"
                    value={values["11"]}
                    onChange={handleChange('11', 'text')}
                />
                <label htmlFor="candidateName">What is the ideal nurse:patient ratio for your units acuity</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[0].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <input
                    type="text" className="candidateName"
                    id="candidateName"
                    placeholder="1:1"
                    value={values["12"]}
                    onChange={handleChange('12', 'text')}
                />
                <label htmlFor="candidateName">What is the ideal nurse:patient ratio usually assigned</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[1].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={false}
                    value={values["13"]}
                    onChange={handleChange('13', 'no')}
                    options={[{ value: 'always', label: 'always' }, { value: 'usually', label: 'usually' }, { value: 'sometimes', label: 'sometimes' }, { value: 'never', label: 'never' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">Are there special ratios for hight acuity patient or devices</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[2].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={false}
                    value={values["14"]}
                    onChange={handleChange('14', 'no')}
                    options={[{ value: 'always', label: 'always' }, { value: 'usually', label: 'usually' }, { value: 'sometimes', label: 'sometimes' }, { value: 'never', label: 'never' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">are ratios generally safe and appropriate</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[3].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={false}
                    value={values["15"]}
                    onChange={handleChange('15', 'no')}
                    options={[{ value: 'always', label: 'always' }, { value: 'usually', label: 'usually' }, { value: 'sometimes', label: 'sometimes' }, { value: 'never', label: 'never' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">is acuity distributed among the staff fairly</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[4].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={false}
                    value={values["16"]}
                    onChange={handleChange('16', 'no')}
                    options={[{ value: 'very experiences', label: 'very experiences' }, { value: 'mostly experienced', label: 'mostly experienced' }, { value: 'some experienced', label: 'some experienced' }, { value: 'inexperienced', label: 'inexperienced' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">whats the average staff experience level</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[5].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <input
                    type="text" className="candidateName"
                    id="candidateName"
                    placeholder=" "
                    value={values["17"]}
                    onChange={handleChange('17', 'text')}
                />
                <label htmlFor="candidateName">Staffing Freetext Subjective</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[6].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={false}
                    value={values["18"]}
                    onChange={handleChange('18', 'no')}
                    options={[{ value: 'Great', label: 'Great' }, { value: 'Good', label: 'Good' }, { value: 'OK', label: 'OK' }, { value: 'Bad', label: 'Bad' }, { value: 'Terrible', label: 'Terrible' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    required={true}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">Staffing Subjective Score</label>
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

export default Staffing