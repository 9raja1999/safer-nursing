import React, { useState, useEffect } from 'react'
import {
  useHistory
} from 'react-router-dom'
import _ from 'lodash'
import { ToastContainer, toast } from 'react-toastify';
import { getHospitalByID, getBurnOutIndex, getUnitScores } from '../store/actions/hospitalActions'
import { getAllQuestions, generateReportID, addReport, addAnswersToReport, getReportsByID } from '../store/actions/reportActions';
import { Circles } from 'react-loader-spinner';
import HospitalMap from '../components/google_map/HospitalMap'
import Header from '../components/Header'
import UserHeader from '../components/UserHeader';
import Map from '../components/google_map/Map'
import ExploreInsidhts from '../components/ExploreInsidhts'
import HospitalModal from '../components/Modals/HospitalModal'
import BurnIndex from '../components/Graphs/BurnIndex';

import HospitalImage from '../assets/images/hospital-img.png'
import Select from 'react-select';
import dotsToggleImage from '../assets/images/dotsToggle.svg';
import AIcon from '../assets/images/a-icon.png';
import FIcon from '../assets/images/f-icon.png';
import NIcon from '../assets/images/e-icon.png';
import tagCross from '../assets/images/tagCross.svg';
import 'react-toastify/dist/ReactToastify.css';


const selectStyle = {
  container: (provided, state) => ({
    ...provided,
    border: '2px solid #52B788',
    borderRadius: '14px',
    height: '90px',
    width: '100%',
    textTransform: 'Capitalize',
    // zIndex : '-1'
  }),
  control: (provided, state) => ({
    ...provided,
    border: 'none',
    border: '0',
    // This line disable the blue border
    boxShadow: 'none',
    borderRadius: '15px',
    ':active': {
      border: 'none'
    }
  }),
  menu: (provided, state) => ({
    ...provided,
    zIndex: 9999
  }),
  multiValue: (provided, state) => ({
    ...provided,
    background: '#EEFCF5',
    borderRadius: '8px',
    textTransform: 'Capitalize',
    height: '44px',
    width: '160px',
    position: 'relative'
  }),

  multiValueRemove: (provided, state) => ({
    ...provided,
    backgroundColor: '#D5EEE2',
    borderRadius: '8px',

    width: '24px',
    height: '24px',
    // color: '#52B788',
    position: 'absolute',
    padding: '5px',
    right: '5%',
    top: '50%',
    transform: 'translate(-5%, -50%)',
    color: '#52B788',
    ':hover': {
      backgroundColor: '#D5EEE2',
      color: '#52B788',
    },
  })
}


export default function Hospital() {
  const history = useHistory();
  const [isUser, setIsUser] = useState(false);
  const [preventScroll, setPreventScroll] = useState(false);
  const [hospitalData, setHospitalData] = useState(null);
  const [burnIndex, setBurnIndex] = useState('');
  const [reportQuestions, setReportQuestions] = useState([]);
  const [reportsPerFacility, setReportsPerFacility] = useState([]);
  const [unitFilter, setUnitFilter] = useState([
    { name: 'staffing', id: 17, status: true },
    { name: 'assignment', id: 28, status: true },
    { name: 'facility', id: 36, status: true },
    { name: 'experience', id: 46, status: true },
  ]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [showFilteredReports, setShowFilteredReports] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [unitTypeFilter, setUnitTypeFilter] = useState([]);
  const [unitScores, setUnitScores] = useState({});

  useEffect(() => {
    if (localStorage.getItem("nurseAccess") === null) {
      setIsUser(false)
    } else {
      setIsUser(true)
    }
  }, [])

  useEffect(() => {
    if (preventScroll) {
      console.log('PRevent Scroll')
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [preventScroll])

  const fetchIsScroll = (isOpen) => {
    // console.log(isOpen)
    setPreventScroll(isOpen);
  }
  const isLoggedIn = (isUser) => {
    setIsUser(isUser)
  }

  useEffect(() => {
    // Getting Burn Out INdex of Hospital
    console.log('HD :', hospitalData)
    if (hospitalData !== null) {
      getBurnOutIndex(hospitalData.address.FacilityID)
        .then(res => {
          // console.log('B:', res.data)
          if (res.success == 1 && res.message == "data found") {
            setBurnIndex(res.data.z_score)
          } else {
            setBurnIndex(0)
          }
        })
        .catch(err => {
          console.log(err)
        })

      getUnitScores(hospitalData.geolocations.report_id, hospitalData.geolocations.FacilityID)
        .then(response => {
          if (response.message == 'data found') {
            setUnitScores(response.data)
          }
        })
        .catch(err => {
          console.log('ERR')
        })
    }


    getAllQuestions()
      .then(res => {
        if (res.success == 1) {
          setReportQuestions(res.data)
        }
      })
      .catch(err => {
        console.log('ERROR !!', err)
      })
  }, [hospitalData])

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('facilityId'));
    let facilityID = data.id;
    getHospitalByID(facilityID)
      .then(res => {
        let response = res.data;
        console.log(res.data)
        if ('geolocations' in response) {
          setHospitalData(res.data)
        } else {
          setHospitalData(null)
        }
      })
      .catch(err => {
        console.log(err)
      })

    getReportsByID(facilityID)
      .then(res => {
        setReportsPerFacility(res.data)
      })
      .catch(err => {
        console.log("ERROR !", err)
      })


  }, [localStorage.getItem("facilityId")])



  const applyUnitFilters = () => {
    let data = JSON.parse(localStorage.getItem('facilityId'));
    let facilityID = data.id;
    let afterFilteration = [];
    getReportsByID(facilityID)
      .then(res => {
        console.log(res.data)
        setReportsPerFacility(res.data)
        for (const element of reportsPerFacility) {
          for (const status of unitFilter) {
            if (status.status == true) {
              if (element.Type === status.id) {
                // console.log(element)
                afterFilteration.push(element)
              }
            }
          }
        }
        // console.log('FILTERED REPORTS : ', afterFilteration)
        setFilteredReports(afterFilteration)
        setShowFilteredReports(true);
      })
      .catch(err => {
        console.log("ERROR !", err)
      })

  }

  const applyFilters = () => {
    let data = [];
    unitTypeFilter.map((obj, idx) => {
      // console.log(obj)
      reportsPerFacility.filter(({ Type, Summary }) => Type == 20 && Summary.includes(obj.value)).map((obj, idx) => {
        data.push(obj)
      })
    })
    console.log(data)
    setFilteredReports(data);
    setShowFilteredReports(true)
  }


  const applyCategoryFilters = () => {
    let data = [];
    categoryFilter.map((obj, idx) => {
      // console.log(obj)
      reportsPerFacility.filter(({ Type, Summary }) => Type == 19 && Summary.includes(obj.value)).map((obj, idx) => {
        data.push(obj)
      })
    })
    console.log(data)
    setFilteredReports(data);
    setShowFilteredReports(true)
  }


  const filtered = ({ Type }) => Type == 45 || Type == 28 || Type == 17 || Type == 36



  if (hospitalData == null) {
    console.log(hospitalData)
    return <Circles
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="circles-loading"
      wrapperStyle={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
      wrapperClass=""
      visible={true}
    />
  }


  return (
    <div>
      {
        isUser == true ? (
          <UserHeader
            isLoggedIn={isLoggedIn}
          />
        ) : (
          <Header
          />
        )
      }
      <section className="banner-sec-2">
        <div className='map-holderHospital'>
          <HospitalMap
            positions={{ lat: hospitalData.geolocations.Latitude, lng: hospitalData.geolocations.Longitude }}
            reportCount={hospitalData.geolocations.reportCount}
            status={hospitalData.status}
          />
        </div>
        <HospitalModal
          name={hospitalData.address.FacilityName}
          address={hospitalData.address.Address}
          hospitalDatatoSubmit={hospitalData}
          reportsPerFacility={reportsPerFacility}
          reportQuestions={reportQuestions}
          fetchIsScroll={fetchIsScroll}
          isUser={isUser}
          isLoggedIn={isLoggedIn}
        />
      </section>
      <section className="hospital-detail-sec">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="title">
                <span><img src={HospitalImage} alt="" className="img-fluid" /></span>
                <div className="text-box">
                  <h3>Hospital <strong>Details</strong> Report</h3>
                  <p>Survey Report & Details as per your requirements</p>
                </div>
              </div>
              <div className="hospital-filter">
                <div className="filter-box">
                  <form>
                    <label>CATEGORY TYPE</label>
                    <div className="relative">
                      <div className="form-control filterInput" >
                        {
                          unitFilter.map((item, idx) => {
                            return <div
                              className='Tags'
                              style={{ opacity: item.status == true ? 1 : 0.2 }}
                            >
                              <span>
                                <p style={{
                                  position: 'absolute',
                                  top: '50%',
                                  left: '5%',
                                  transform: 'translate(-5%,-50%)',
                                }}>{item.name}</p>
                                <img src={tagCross} style={{ position: 'absolute', top: '50%', right: '5%', transform: 'translate(-5%,-50%)', cursor: 'pointer' }}
                                  onClick={() => {
                                    // console.log('wow')
                                    setUnitFilter([...unitFilter].map((obj, i) => {
                                      if (idx == i) {

                                        return {
                                          ...obj,
                                          status: !obj.status
                                        }

                                      } else {
                                        return obj
                                      }
                                    }))
                                  }}
                                />
                              </span>
                            </div>
                          })
                        }
                      </div>
                      <a className="green-bg apply-filters" onClick={() => applyUnitFilters()}>Apply Filters</a>
                    </div>
                  </form>
                </div>
                <div className="filter-box">
                  <form>
                    <label>UNIT TYPE</label>
                    <Select
                      isMulti={true}
                      value={unitTypeFilter}
                      onChange={(e) => setUnitTypeFilter(e)}
                      options={[{ value: 'ICU', label: 'ICU' }, { value: 'Intermediate', label: 'Intermediate' }, { value: 'Floor', label: 'Floor' }, { value: 'Float', label: 'Float' }, { value: 'ER', label: 'ER' }, { value: 'OR', label: 'OR' }, { value: 'Resource', label: 'Resource' }]}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      components={{
                        IndicatorSeparator: () => null
                      }}
                      styles={selectStyle}
                      placeholder='Type Here'
                    />
                    <a className="" style={{ cursor: 'pointer' }} onClick={() => applyFilters()}>Apply Filters</a>
                  </form>
                </div>
                <div className="filter-box">
                  <form>
                    <label>ACUITY TYPE</label>
                    <Select
                      isMulti={true}
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e)}
                      options={[{ value: 'Burn', label: 'Burn' }, { value: 'Cardiac', label: 'Cardiac' }, { value: 'Cardiothoraric', label: 'Cardiothoraric' }, { value: 'CardioVascular', label: 'CardioVascular' }, { value: 'Education', label: 'Education' }, { value: 'Emergency', label: 'Emergency' }, { value: 'Dialysis', label: 'Dialysis' }, { value: 'Floot Pool', label: 'Floot Pool' }, { value: 'IV Team', label: 'IV Team' }, { value: 'Interventional Radiology', label: 'Interventional Radiology' }, { value: 'L&D', label: 'L&D' }, { value: 'Medical', label: 'Medical' }, { value: 'Neuro', label: 'Neuro' }, { value: 'Neurosurgery', label: 'Neurosurgery' }, { value: 'Observation', label: 'Observation' }, { value: 'Operating Room', label: 'Operating Room' }, { value: 'Pediatric', label: 'Pediatric' }, { value: 'Pulmonary', label: 'Pulmonary' }, { value: 'Post-Anesthesia', label: 'Post-Anesthesia' }, { value: 'Surgical', label: 'Surgical' }, { value: 'Telemetry', label: 'Telemetry' }, { value: 'Thoraric', label: 'Thoraric' }, { value: 'Transplant', label: 'Transplant' }, { value: 'Trauma', label: 'Trauma' }, { value: 'Wound', label: 'Wound' }]}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      components={{
                        IndicatorSeparator: () => null
                      }}
                      styles={selectStyle}
                      placeholder='Type Here'
                    />
                    <a className="" style={{ cursor: 'pointer' }} onClick={() => applyCategoryFilters()}>Apply Filters</a>
                  </form>
                </div>
              </div>
              <div className="filter-detail">
                {
                  (Object.keys(unitScores).length !== 0) ? (
                    <ul>
                      <li>
                        <div className="filter-detail-box"
                          style={{
                            border: unitScores.staffing.toLowerCase() == 'great' ? (
                              '2px solid blue'
                            ) : unitScores.staffing.toLowerCase() == 'good' ? (
                              '2px solid #52B788'
                            ) : unitScores.staffing.toLowerCase() == 'ok' ? (
                              '2px solid #E0D16C'
                            ) : unitScores.staffing.toLowerCase() == 'bad' ? (
                              '2px solid orange'
                            ) : unitScores.staffing.toLowerCase() == 'terrible' ? (
                              '2px solid #E46870'
                            ) : '2px solid pink'
                          }}
                        > <span style={{
                          color: unitScores.staffing.toLowerCase() == 'great' ? (
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
                        }}>S</span>
                          <p>{unitScores.staffing}
                            <strong style={{
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
                            }}></strong>
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="filter-detail-box"
                          style={{
                            border: unitScores.assignment.toLowerCase() == 'great' ? (
                              '2px solid blue'
                            ) : unitScores.assignment.toLowerCase() == 'good' ? (
                              '2px solid #52B788'
                            ) : unitScores.assignment.toLowerCase() == 'ok' ? (
                              '2px solid #E0D16C'
                            ) : unitScores.assignment.toLowerCase() == 'bad' ? (
                              '2px solid orange'
                            ) : unitScores.assignment.toLowerCase() == 'terrible' ? (
                              '2px solid #E46870'
                            ) : '2px solid pink'
                          }}
                        ><span style={{
                          color: unitScores.assignment.toLowerCase() == 'great' ? (
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
                        }}>A</span>
                          <p>{unitScores.assignment}
                            <strong style={{
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
                            }}></strong>
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="filter-detail-box"
                          style={{
                            border: unitScores.facility.toLowerCase() == 'great' ? (
                              '2px solid blue'
                            ) : unitScores.facility.toLowerCase() == 'good' ? (
                              '2px solid #52B788'
                            ) : unitScores.facility.toLowerCase() == 'ok' ? (
                              '2px solid #E0D16C'
                            ) : unitScores.facility.toLowerCase() == 'bad' ? (
                              '2px solid orange'
                            ) : unitScores.facility.toLowerCase() == 'terrible' ? (
                              '2px solid #E46870'
                            ) : '2px solid pink'
                          }}
                        ><span style={{
                          color: unitScores.facility.toLowerCase() == 'great' ? (
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
                        }}>F</span>
                          <p>{unitScores.facility}
                            <strong style={{
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
                            }}></strong>
                          </p>
                        </div>
                      </li>
                      <li>
                        <div className="filter-detail-box"
                          style={{
                            border: unitScores.experience.toLowerCase() == 'great' ? (
                              '2px solid blue'
                            ) : unitScores.experience.toLowerCase() == 'good' ? (
                              '2px solid #52B788'
                            ) : unitScores.experience.toLowerCase() == 'ok' ? (
                              '2px solid #E0D16C'
                            ) : unitScores.experience.toLowerCase() == 'bad' ? (
                              '2px solid orange'
                            ) : unitScores.experience.toLowerCase() == 'terrible' ? (
                              '2px solid #E46870'
                            ) : '2px solid pink'
                          }}
                        >
                          <span style={{
                            color: unitScores.experience.toLowerCase() == 'great' ? (
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
                          }}>E</span>
                          <p>{unitScores.experience}
                            <strong style={{
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
                            }}></strong>
                          </p>
                        </div>
                      </li>
                    </ul>
                  ) : (
                    <ul>
                      <li>
                        <div className="filter-detail-box green-box"> <span>S</span>
                          <p>POSITIVE <strong></strong></p>
                        </div>
                      </li>
                      <li>
                        <div className="filter-detail-box yellow-box"><span><img src={AIcon}
                          className="img-fluid" alt="" /></span>
                          <p>NEUTRAL <strong></strong></p>
                        </div>
                      </li>
                      <li>
                        <div className="filter-detail-box red-box"><span><img src={FIcon}
                          className="img-fluid" alt="" /></span>
                          <p>NEGATIVE <strong></strong></p>
                        </div>
                      </li>
                      <li>
                        <div className="filter-detail-box yellow-box">
                          <span><img src={NIcon}
                            className="img-fluid" alt="" /></span>
                          <p>NEUTRAL <strong></strong></p>
                        </div>
                      </li>
                    </ul>
                  )
                }
              </div>
            </div >
          </div >
        </div >
      </section >
      <section className="report-detail-sec">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="report-detail-top">
                <div className="report-detail-title">
                  <h3>Report <span>Details</span> </h3>
                  <p>Free text from the survey reports by the nurses</p>
                </div>
                {
                  filteredReports.length > 0 ? (
                    <a className="view-btn">View All Reports</a>
                  ) : ''
                }
              </div>
            </div>
            <div className="report-detail-inner">
              {
                showFilteredReports == true ? (
                  <div className="row">
                    {
                      filteredReports.length > 0 ? (
                        filteredReports.map((obj, idx) => {
                          let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                          var today = new Date(obj.date);
                          var time = new Date(obj.time)
                          return <div className="col-md-6">
                            <div className="report-detail-box">
                              <div className="media">
                                <div className="media-left">

                                  <h4>{obj.report_id}</h4>
                                  <p>#{obj.user.slice(0, 12) + ' . . .'}</p>
                                </div>
                                <div className="media-left text-end">
                                  <h4>{today.toLocaleDateString("en-US", dateOptions)}</h4>
                                  <p>{obj.time}</p>
                                </div>
                              </div>
                              <div className="text-box">
                                <h3>
                                  {
                                    obj.Type == 17 ? (
                                      "Staffing"
                                    ) : (
                                      obj.Type == 28 ? (
                                        "Assignment"
                                      ) : (
                                        obj.Type == 36 ? (
                                          "Facility"
                                        ) : (
                                          obj.Type == 45 ? (
                                            "Experience"
                                          ) : obj.Type == 19 ? (
                                            "Acuity"
                                          ) : "Unit"
                                        )
                                      )
                                    )
                                  }
                                </h3>
                                <p>{
                                  obj.Summary
                                }</p>
                              </div>
                            </div>
                          </div>

                        })
                      ) : (
                        <div className="report-detail-top">
                          <h3>No Results found for particular match</h3>
                        </div>
                      )
                    }
                  </div>
                ) : (
                  <div className="row">
                    {
                      reportsPerFacility.filter(
                        filtered
                      ).map((obj, idx) => {
                        let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        var today = new Date(obj.date);
                        var time = new Date(obj.time)
                        return <div className="col-md-6">
                          <div className="report-detail-box">
                            <div className="media">
                              <div className="media-left">

                                <h4>{obj.report_id}</h4>
                                <p>#{obj.user.slice(0, 12) + ' . . .'}</p>
                              </div>
                              <div className="media-left text-end">
                                <h4>{today.toLocaleDateString("en-US", dateOptions)}</h4>
                                <p>{obj.time}</p>
                              </div>
                            </div>
                            <div className="text-box">
                              <h3>
                                {
                                  obj.Type == 17 ? (
                                    "Staffing"
                                  ) : (
                                    obj.Type == 28 ? (
                                      "Assignment"
                                    ) : (
                                      obj.Type == 36 ? (
                                        "Facility"
                                      ) : (
                                        obj.Type == 45 ? (
                                          "Experience"
                                        ) : obj.Type == 19 ? (
                                          "Acuity Type"
                                        ) : "Unit Type"
                                      )
                                    )
                                  )
                                }
                              </h3>
                              <p>{
                                obj.Summary
                              }</p>
                            </div>
                          </div>
                        </div>

                      })
                    }
                  </div>
                )
              }

            </div>
            <div className="report-explanation">
              <div className="row mt-5">
                <div className="col-lg-5">
                  <BurnIndex
                    burnOutIndex={burnIndex}
                  />
                </div>
                <div className="col-lg-7">
                  <div className="report-explanation-right">
                    <div className="text-box">
                      <h3>Explanation</h3>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text ever
                        since the 1500s, when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has survived not only five
                        centuries, but also the leap into electronic typesetting, remaining
                        essentially unchanged.</p>
                      <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has
                        roots in a piece of classNameical Latin literature from 45 BC, making it
                        over 2000 years old. Richard McClintock, a Latin professor at
                        Hampden-Sydney College in Virginia, looked up one of the more obscure
                        Latin words, consectetur, from a Lorem Ipsum passage, and going through
                        the cites of the word in classNameical literature, discovered the
                        undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
                        of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
                        Cicero, written in 45 BC. This book is a treatise on the theory of
                        ethics, very popular during the Renaissance. The first line of Lorem
                        Ipsum, "Lorem ipsum dolor sit amet..", comes.....</p>
                      <a href="#">Read More</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="generate-insight-sec">
        <ExploreInsidhts
          background='#52B788'
          color='white'
        />
      </section>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-box">
                <p>Copyright | 2023 SAFE NURSING. All right reserved</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div >
  )
}
