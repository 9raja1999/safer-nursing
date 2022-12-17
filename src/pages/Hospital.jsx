import React, { useState, useEffect } from 'react'
import {
  useHistory
} from 'react-router-dom'
import _ from 'lodash'
import { ToastContainer, toast } from 'react-toastify';
import { getHospitalByID, getBurnOutIndex } from '../store/actions/hospitalActions'
import { getAllQuestions, generateReportID, addReport, addAnswersToReport, getReportsByID } from '../store/actions/reportActions';
import { Circles } from 'react-loader-spinner';
import HospitalMap from '../components/google_map/HospitalMap'
import Header from '../components/Header'
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



export default function Hospital() {
  const history = useHistory();
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

  

  useEffect(() => {
    // Getting Burn Out INdex of Hospital
    getBurnOutIndex()
      .then(res => {
        setBurnIndex(res.data)
      })
      .catch(err => {
        console.log(err)
      })


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
        if('geolocations' in response){
          setHospitalData(res.data)
        }else{
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
      <Header />
      <section className="banner-sec-2">
        <div className='map-holderHospital'>
          {/* <Map /> */}
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
          reportQuestions={reportQuestions}
          fetchIsScroll={fetchIsScroll}
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
                    <label>UNIT TYPE</label>
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
                    <label>ACUITY</label>
                    <div className="relative">
                      <input type="text" className="form-control filterInput" placeholder="Enter Acuity" />
                      <a className="" href="#">Apply Filters</a>
                    </div>
                  </form>
                </div>
              </div>
              <div className="filter-detail">
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
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="report-detail-sec">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="report-detail-top">
                <div className="report-detail-title">
                  <h3>Report <span>Details</span> </h3>
                  <p>Free text from the survey repprts by the nurses</p>
                </div>
                <a className="view-btn" href="#">View All Reports</a>
              </div>
            </div>
            <div className="report-detail-inner">
              {
                showFilteredReports == true ? (
                  <div className="row">
                    {filteredReports.map((obj, idx) => {
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
                                    ) : "Experience"
                                  )
                                )
                              }
                            </h3>
                            <p>{
                              obj.Summary
                            }</p>
                            <a onClick={() => { console.log('clicked') }} style={{ color: '#52B788', textDecoration: 'underline', cursor: 'pointer' }}>Read More</a>
                          </div>
                        </div>
                      </div>

                    })
                    }
                  </div>
                ) : (
                  <div className="row">
                    {reportsPerFacility.filter(filtered).map((obj, idx) => {
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
                                    ) : "Experience"
                                  )
                                )
                              }
                            </h3>
                            <p>{
                              obj.Summary
                            }</p>
                            <a onClick={() => { console.log('clicked') }} style={{ color: '#52B788', textDecoration: 'underline', cursor: 'pointer' }}>Read More</a>
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
              <div className="row">
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
    </div>
  )
}
