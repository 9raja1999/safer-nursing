import React from 'react'
import { useState } from 'react';
import Select from 'react-select';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { PatternFormat } from 'react-number-format';


const selectStyle = {
    container: (provided, state) => ({
        ...provided,
        border: '2px solid #52B788',
        borderRadius: '14px',
        textTransform: 'Capitalize',
    }),

    control: (provided, state) => ({
        ...provided,
        border: 'none',
        borderRadius: '14px',
        border: '0',
        background : state.isDisabled ? 'white' : 'white',

        // This line disable the blue border
        boxShadow: 'none',
        ':active': {
            border: 'none'
        }
    }),
    multiValue: (provided, state) => ({
        ...provided,
        backgroundColor: state.isDisabled ? '#CED2D0' : '#EEFCF5',
        textTransform: 'Capitalize',
    }),
    multiValueRemove: (provided, state) => ({
        ...provided,
        backgroundColor: state.isDisabled ? 'gray' : '#52B788',
        color: 'white',
        ':hover': {
            backgroundColor: '#EEFCF5',
            color: '#52B788',
        },
    })
}

function Demographics({ edit, handleChange, prevStep, nextStep, values, errors, closeReport, isUser, logout }) {
    const history = useHistory();
    const [reportError, setReportError] = useState([])

    // useEffect(() => {
    //     console.log('RP ERROR Demographics : ', reportError)
    // }, [reportError])

    useEffect(() => {
        window.scrollTo(0, 0)
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
        Object.keys(values).map(function (key, idx) {
            if (idx <= 9) {
                if (key == "1") {
                    console.log("Age : ", values[key])
                    if (values[key] > 99) {
                        validated.push({ e: 'age' })
                    }
                }
                if (values[key] == "") {
                    validated.push({ e: 'null' })
                } else if (values[key] !== "") {
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
        closeReport(false);

    }

    return (
        <form>
            <div className="searchformfld">
                <input
                    type="number" className="candidateName"
                    min="10"
                    max="99"
                    id="candidateName"
                    placeholder=""
                    value={values["1"]}
                    onChange={handleChange('1', 'text')}
                    readOnly={edit == false ? true : false}
                    style={{ cursor: edit == false ? 'not-allowed' : 'pointer', color : edit == false ? 'gray' : 'black' }}
                />
                <label htmlFor="candidateName">Age</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[0].e == 'null' ? '* required' : reportError[0].e == 'age' ? '* please enter age between 0 - 99' : '') : ''}</p>
            </div>
            <div className="searchformfld" style={{ cursor: edit == false ? 'not-allowed' : 'pointer' }}>
                <Select
                    isMulti={false}
                    value={values["2"]}
                    onChange={handleChange('2', 'no')}
                    options={[{ value: 'male', label: 'male' }, { value: 'female', label: 'female' }, { value: 'trans', label: 'trans' }, { value: 'NB', label: 'NB' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={selectStyle}
                    isDisabled={edit == false ? true : false}
                />
                <label htmlFor="candidateName">Gender</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[1].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld" style={{ cursor: edit == false ? 'not-allowed' : 'pointer' }}>
                <Select
                    isMulti={false}
                    value={values["3"]}
                    onChange={handleChange('3', 'no')}
                    options={[{ value: 'full-time, part-time', label: 'full-time, part-time' }, { value: 'Staff, PRN, Traveller', label: 'Staff, PRN, Traveller' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={selectStyle}
                    isDisabled={edit == false ? true : false}
                />
                <label htmlFor="candidateName">Employee Type (BI-PART)</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[2].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld" style={{ cursor: edit == false ? 'not-allowed' : 'pointer' }}>
                <Select
                    isMulti={false}
                    value={values["4"]}
                    onChange={handleChange('4', 'no')}
                    options={[{ value: 'Days', label: 'Days' }, { value: 'Nights', label: 'Nights' }, { value: 'Rotating', label: 'Rotating' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={selectStyle}
                    isDisabled={edit == false ? true : false}
                />
                <label htmlFor="candidateName">SHIFT</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[3].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                {
                    edit == false ? (
                        <input
                            type="text" className="candidateName"
                            id="candidateName"
                            placeholder=""
                            value={values["5"]}
                            onChange={handleChange('1', 'text')}
                            readOnly={true}
                            style={{ cursor: 'not-allowed', color : 'gray'}}
                        />
                    ) : (
                        <CurrencyInput
                            id="validation-example-2-field"
                            placeholder="$1,234,567"
                            allowDecimals={false}
                            className={`candidateName`}
                            prefix={'$'}
                            step={10}
                            // value={ parseFloat(values[5])}
                            onChange={handleChange('5', 'text')}
                        />
                    )
                }
                <label htmlFor="candidateName">PAY</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[4].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld" style={{ cursor: edit == false ? 'not-allowed' : 'pointer' }}>
                <Select
                    isMulti={true}
                    value={values["6"]}
                    onChange={handleChange('6', 'yes')}
                    options={[{ value: 'Weekends', label: 'Weekends' }, { value: 'Nights', label: 'Nights' }, { value: 'None', label: 'None' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={selectStyle}
                    isDisabled={edit == false ? true : false}
                />
                <label htmlFor="candidateName">Shift differential</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[5].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld" style={{ cursor: edit == false ? 'not-allowed' : 'pointer' }}>
                <Select
                    isMulti={true}
                    value={values["7"]}
                    onChange={handleChange('7', 'yes')}
                    options={[{ value: 'PTO', label: 'PTO' }, { value: 'Retirement', label: 'Retirement' }, { value: 'Insurance', label: 'Insurance' }, { value: 'Continuing Education', label: 'Continuing Education' }, { value: 'Tution Reimbursement', label: 'Tution Reimbursement' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={selectStyle}
                    isDisabled={edit == false ? true : false}
                />
                <label htmlFor="candidateName">Benifits</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[6].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <input
                    type="date" className="candidateName"
                    id="candidateName"
                    placeholder=""
                    value={values["8"]}
                    onChange={handleChange('8', 'text')}

                    readOnly={edit == false ? true : false}
                    style={{ cursor: edit == false ? 'not-allowed' : 'pointer', color : edit == false ? 'gray' : 'black'  }}
                />
                <label htmlFor="candidateName">Time at hospital</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[7].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <PatternFormat
                    format='##YEARS/##MONTHS'
                    placeholder='YY/MM'
                    // mask={}
                    value={values["9"]}
                    onChange={(handleChange('9', 'text'))}

                    readOnly={edit == false ? true : false}
                    style={{ cursor: edit == false ? 'not-allowed' : 'pointer', color : edit == false ? 'gray' : 'black'  }}
                />

                <label htmlFor="candidateName">Current speciality experience</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[8].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <PatternFormat
                    format='##YEARS/##MONTHS'
                    placeholder='YY/MM'
                    // mask={}
                    value={values["10"]}
                    onChange={(handleChange('10', 'text'))}

                    readOnly={edit == false ? true : false}
                    style={{ cursor: edit == false ? 'not-allowed' : 'pointer', color : edit == false ? 'gray' : 'black'  }}
                />
                <label htmlFor="candidateName">total nursing experience</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[9].e == 'null' ? '* required' : '') : ''}</p>
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

export default Demographics