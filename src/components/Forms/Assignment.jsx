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


function Assignment({ handleChange, prevStep, nextStep, values, isUser, logout }) {
    const history = useHistory();

    const [reportError, setReportError] = useState([])

    // useEffect(() => {
    //     console.log('RP ERROR Assignment : ', reportError)
    // }, [reportError])


    const ValidateDemographic = () => {
        let validated = [];
        Object.keys(values).forEach(function (key, idx) {
            if (idx >= 18 && idx <= 28) {
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
                    isMulti={true}
                    value={values["19"]}
                    onChange={handleChange('19', 'yes')}
                    options={[{ value: 'Burn', label: 'Burn' }, { value: 'Cardiac', label: 'Cardiac' }, { value: 'Cardiothoraric', label: 'Cardiothoraric' }, { value: 'CardioVascular', label: 'CardioVascular' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">What is your Unit Speciality</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[0].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={true}
                    value={values["20"]}
                    onChange={handleChange('20', 'yes')}
                    options={[{ value: 'ICU', label: 'ICU' }, { value: 'Intermediate', label: 'Intermediate' }, { value: 'Floor', label: 'Floor' }, { value: 'Float', label: 'Float' }, { value: 'ER', label: 'ER' }, { value: 'OR', label: 'OR' }, { value: 'Resource', label: 'Resource' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">What type of unit it is</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[1].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={false}
                    value={values["21"]}
                    onChange={handleChange('21', 'no')}
                    options={[{ value: 'Great', label: 'Great' }, { value: 'Good', label: 'Good' }, { value: 'OK', label: 'OK' }, { value: 'Bad', label: 'Bad' }, { value: 'Terrible', label: 'Terrible' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">How well do you work with providers on your unit</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[2].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={true}
                    value={values["22"]}
                    onChange={handleChange('22', 'yes')}
                    options={[{ value: 'Communication', label: 'Communication' }, { value: 'Respect', label: 'Respect' }, { value: 'Teamwork', label: 'Teamwork' }, { value: 'Professionalism', label: 'Professionalism' }, { value: 'Competence', label: 'Competence' }, { value: 'Compasiion', label: 'Compasiion' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">What factors influence your provider rating</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[3].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={false}
                    value={values["23"]}
                    onChange={handleChange('23', 'no')}
                    options={[{ value: 'Great', label: 'Great' }, { value: 'Good', label: 'Good' }, { value: 'OK', label: 'OK' }, { value: 'Bad', label: 'Bad' }, { value: 'Terrible', label: 'Terrible' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">how well do you work with other nurses on your unit</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[4].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={true}
                    value={values["24"]}
                    onChange={handleChange('24', 'yes')}
                    options={[{ value: 'Communication', label: 'Communication' }, { value: 'Respect', label: 'Respect' }, { value: 'Teamwork', label: 'Teamwork' }, { value: 'Professionalism', label: 'Professionalism' }, { value: 'Competence', label: 'Competence' }, { value: 'Compasiion', label: 'Compasiion' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">What factors influence your nurse rating</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[5].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={false}
                    value={values["25"]}
                    onChange={handleChange('25', 'no')}
                    options={[{ value: 'Great', label: 'Great' }, { value: 'Good', label: 'Good' }, { value: 'OK', label: 'OK' }, { value: 'Bad', label: 'Bad' }, { value: 'Terrible', label: 'Terrible' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">how well do you work with nurse aides on your unit</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[6].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={true}
                    value={values["26"]}
                    onChange={handleChange('26', 'yes')}
                    options={[{ value: 'Communication', label: 'Communication' }, { value: 'Respect', label: 'Respect' }, { value: 'Teamwork', label: 'Teamwork' }, { value: 'Professionalism', label: 'Professionalism' }, { value: 'Competence', label: 'Competence' }, { value: 'Compasiion', label: 'Compasiion' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">What factors influence your aides rating</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[7].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={true}
                    value={values["27"]}
                    onChange={handleChange('27', 'yes')}
                    options={[{ value: 'Behavoiral Team', label: 'Behavoiral Team' }, { value: 'Chaplain', label: 'Chaplain' }, { value: 'IV Team', label: 'IV Team' }, { value: 'Phlebotomy', label: 'Phlebotomy' }, { value: 'Rapid Response', label: 'Rapid Response' }, { value: 'Transport', label: 'Transport' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">What resources are available to you</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[8].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <input
                    type="text" className="candidateName"
                    id="candidateName"
                    placeholder=" "
                    value={values["28"]}
                    onChange={handleChange('28', 'text')}
                />
                <label htmlFor="candidateName">Assignment Freetext Subjective</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[9].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={false}
                    value={values["29"]}
                    onChange={handleChange('29', 'no')}
                    options={[{ value: 'Great', label: 'Great' }, { value: 'Good', label: 'Good' }, { value: 'OK', label: 'OK' }, { value: 'Bad', label: 'Bad' }, { value: 'Terrible', label: 'Terrible' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    required={true}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">Assignment Subjective Score</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[10].e == 'null' ? '* required' : '') : ''}</p>
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

export default Assignment