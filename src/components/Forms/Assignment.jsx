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

function Assignment({ handleChange, prevStep, nextStep, values, isUser, logout }) {
    const history = useHistory();

    const [reportError, setReportError] = useState([])

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
                <Select
                    isMulti={true}
                    value={values["19"]}
                    onChange={handleChange('19', 'yes')}
                    options={[{ value: 'bariatric', label: 'Bariatric' }, { value: 'behavioral', label: 'Behavioral' }, { value: 'bone marrow', label: 'Bone Marrow' }, { value: 'burn', label: 'Burn' }, { value: 'cardiac', label: 'Cardiac' }, { value: 'cardiology', label: 'Cardiology' }, { value: 'cardiopulmonary', label: 'Cardiopulmonary' }, { value: 'cardiothoraric', label: 'Cardiothoracic' }, { value: 'cardiovascular', label: 'Cardiovascular' }, { value: 'case management', label: 'Case Management' }, { value: 'cath lab', label: 'Cath Lab' }, { value: 'coronary', label: 'Coronary' }, { value: 'critical care transport', label: 'Critical Care Transport' }, { value: 'dialysis', label: 'Dialysis' }, { value: 'education', label: 'Education' }, { value: 'er/ed', label: 'ER/ED' }, { value: 'flight nurse', label: 'Flight Nurse' }, { value: 'float pool', label: 'Float Pool' }, { value: 'gastrointestinal', label: 'Gastrointestinal' }, { value: 'geriatric', label: 'Geriatric' }, { value: 'gynecology', label: 'Gynecology' }, { value: 'hematology', label: 'Hematology' }, { value: 'hospice', label: 'Hospice' }, { value: 'infectious disease', label: 'Infectious Disease' }, { value: 'infusion', label: 'Infusion' }, { value: 'interventional radiology', label: 'Interventional Radiology' }, { value: 'isolation', label: 'Isolation' }, { value: 'iv team', label: 'IV Team' },  { value: 'l&d', label: 'L&D' }, { value: 'ltac', label: 'LTAC' }, { value: 'maternity', label: 'Maternity' }, { value: 'medical', label: 'Medical' }, { value: 'neonatal', label: 'Neonatal' }, { value: 'neuro', label: 'Neuro' }, { value: 'neuroscience', label: 'Neuroscience' }, { value: 'neurosurgery', label: 'Neurosurgery' }, { value: 'neurovascular', label: 'Neurovascular' }, { value: 'newborn', label: 'Newborn' }, { value: 'nursery', label: 'Nursery' }, { value: 'Observation', label: 'Observation' }, { value: 'obstetrics', label: 'Obstetrics' }, { value: 'oncology', label: 'Oncology' }, { value: 'open heart recovery', label: 'Open Heart Recovery' }, { value: 'operating room', label: 'Operating Room' }, { value: 'ortho', label: 'Ortho' }, { value: 'pacu', label: 'PACU' }, { value: 'palliative', label: 'Palliative' }, { value: 'pediatric', label: 'Pediatric' }, { value: 'pre-op', label: 'Pre-Op' }, { value: 'psychiatric', label: 'Psychiatric' }, { value: 'pulmonary', label: 'Pulmonary' }, { value: 'rapid response', label: 'Rapid Response' }, { value: 'rehab', label: 'Rehab' }, { value: 'research', label: 'Research' }, { value: 'stroke', label: 'Stroke' }, { value: 'stem cell', label: 'Stem Cell' }, { value: 'surgical', label: 'Surgical' }, { value: 'telemetry', label: 'Telemetry' }, { value: 'thoracic', label: 'Thoracic' }, { value: 'transplant', label: 'Transplant' }, { value: 'trauma', label: 'Trauma' }, { value: 'vascular access', label: 'Vascular Access' }, { value: 'wound care', label: 'Wound Care' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">What is your unit type?</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[0].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={true}
                    value={values["20"]}
                    onChange={handleChange('20', 'yes')}
                    options={[{ value: 'icu', label: 'ICU' }, { value: 'intermediate/stepdown/progressive', label: 'Intermediate/Stepdown/Progressive' }, { value: 'Floor', label: 'Floor' }, { value: 'n/a', label: 'N/A' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">What is your unit acuity?</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[1].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={false}
                    value={values["21"]}
                    onChange={handleChange('21', 'no')}
                    options={[{ value: 'great', label: 'Great' }, { value: 'good', label: 'Good' }, { value: 'ok', label: 'OK' }, { value: 'bad', label: 'Bad' }, { value: 'terrible', label: 'Terrible' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">How is working with providers on your unit?</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[2].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={true}
                    value={values["22"]}
                    onChange={handleChange('22', 'yes')}
                    options={[{ value: 'communication', label: 'Communication' }, { value: 'respect', label: 'Respect' }, { value: 'teamwork', label: 'Teamwork' }, { value: 'professionalism', label: 'Professionalism' }, { value: 'competence', label: 'Competence' }, { value: 'compassion', label: 'Compassion' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">What factors influence your provider rating?</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[3].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={false}
                    value={values["23"]}
                    onChange={handleChange('23', 'no')}
                    options={[{ value: 'great', label: 'Great' }, { value: 'good', label: 'Good' }, { value: 'ok', label: 'OK' }, { value: 'bad', label: 'Bad' }, { value: 'terrible', label: 'Terrible' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">How is working with other nurses on your unit?</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[4].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={true}
                    value={values["24"]}
                    onChange={handleChange('24', 'yes')}
                    options={[{ value: 'communication', label: 'Communication' }, { value: 'respect', label: 'Respect' }, { value: 'teamwork', label: 'Teamwork' }, { value: 'professionalism', label: 'Professionalism' }, { value: 'competence', label: 'Competence' }, { value: 'compassion', label: 'Compassion' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">What factors influence your nursing rating?</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[5].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={false}
                    value={values["25"]}
                    onChange={handleChange('25', 'no')}
                    options={[{ value: 'great', label: 'Great' }, { value: 'good', label: 'Good' }, { value: 'ok', label: 'OK' }, { value: 'bad', label: 'Bad' }, { value: 'terrible', label: 'Terrible' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">How is working with nurse aides on your unit?</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[6].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={true}
                    value={values["26"]}
                    onChange={handleChange('26', 'yes')}
                    options={[{ value: 'communication', label: 'Communication' }, { value: 'respect', label: 'Respect' }, { value: 'teamwork', label: 'Teamwork' }, { value: 'professionalism', label: 'Professionalism' }, { value: 'competence', label: 'Competence' }, { value: 'compassion', label: 'Compassion' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">What factors influence your aide rating?</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[7].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <Select
                    isMulti={true}
                    value={values["27"]}
                    onChange={handleChange('27', 'yes')}
                    options={[{ value: 'behavioral team', label: 'Behavioral Team' }, { value: 'chaplain', label: 'Chaplain' }, { value: 'critical care transport', label: 'Critical Care Transport' }, { value: 'iv team', label: 'IV Team' }, { value: 'phlebotomy', label: 'Phlebotomy' }, { value: 'rapid response', label: 'Rapid Response' }, { value: 'transport', label: 'Transport' }]}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    components={{
                        IndicatorSeparator: () => null
                    }}
                    styles={selectStyle}
                />
                <label htmlFor="candidateName">What resources are readily available if you need them?</label>
                <p style={{ color: 'red' }}>{reportError.length > 0 ? (reportError[8].e == 'null' ? '* required' : '') : ''}</p>
            </div>
            <div className="searchformfld">
                <input
                    type="text" className="candidateName"
                    id="candidateName"
                    placeholder="Write a brief description of any positives or negatives regarding your unit or immediate work area... "
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
                    options={[{ value: 'great', label: 'Great' }, { value: 'good', label: 'Good' }, { value: 'ok', label: 'OK' }, { value: 'bad', label: 'Bad' }, { value: 'terrible', label: 'Terrible' }]}
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
                            You are already logged in
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