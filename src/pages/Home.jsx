import React, { useState, useEffect } from 'react';
import {
  useHistory
} from 'react-router-dom'
import Header from '../components/Header';
import UserHeader from '../components/UserHeader';
import Map from '../components/google_map/Map';
import ReportSubmit from '../components/Forms/ReportSubmit';
import { getAllGeoLocations, getUnitScores } from '../store/actions/hospitalActions';
import { getAllQuestions, generateReportID, addReport, addAnswersToReport } from '../store/actions/reportActions';
import { Circles } from 'react-loader-spinner';
import report from '../assets/JSON/report.json';


import 'react-toastify/dist/ReactToastify.css';



export default function Home() {
  const history = useHistory();
  const [isUser, setIsUser] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [data, setData] = useState([]);
  const [allGeoLocations, setAllGeolocations] = useState([]);
  const [hospitalDatatoSubmit, setHospitalDataToSubmit] = useState(null);


  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    if (localStorage.getItem("nurseAccess") === null) {
      setIsUser(false)
    } else {
      setIsUser(true)
    }


    getAllGeoLocations()
      .then(res => {
        let geolocs = res.data;
        setData(res.data);
      })
      .catch(err => {
        console.log('ERROR !!', err)
      })
  }, [])


  useEffect(() => {
    if (data.length > 0) {
      for (let index = 0; index < data.length; index++) {
        let geo = data[index];

        getUnitScores(data[index].report_id, data[index].facilityID)
          .then(res => {
            console.log(res.data)
            if (res.message == "data found") {
              geo = { ...geo, scores: res.data }
            } else {
              geo = { ...geo, scores: {} }
            }
            setAllGeolocations(oldArray => [...oldArray, geo]);
            setIsLoading(false)
          })
          .catch(err => {
            console.log('ERROR !!', err)
          })
      }
    }
    setIsLoading(false)
    // setAllGeolocations(res.data);
  }, [data])


  const isLoggedIn = (isUser) => {
    setIsUser(isUser)
  }


  const fetchIsReport = (isOpen, hospitalData) => {
    // If isOpen is true open report submit left Drawer
    setOpenReport(isOpen);
    setHospitalDataToSubmit(hospitalData)
  }

  const fetchIsCloseReport = (isClose) => {
    setOpenReport(isClose)
  }


  if (isLoading) {
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
    <div className='wrapper'>
      {
        isUser == true ? (
          <UserHeader
            hospitalsData={allGeoLocations}
            isLoggedIn={isLoggedIn}
          />
        ) : (
          <Header
            hospitalsData={allGeoLocations}
          />
        )
      }
      <div className='map-holder'>
        <Map
          fetchIsReport={fetchIsReport}
          geoLocations={allGeoLocations}
          isUser={isUser}
        />
      </div>
      <div className='status-bar'>
        {
          [
            { statusText: 'Great', color: 'blue' },
            { statusText: 'Good', color: '#52B788' },
            { statusText: 'Ok', color: '#E0D16C' },
            { statusText: 'Bad', color: 'orange' },
            { statusText: 'Terrible', color: '#E46870' },
          ].map((item, index) => {
            return <div key={index} className='status-representation'>
              <div className='status-representation-color' style={{ background: `${item.color}` }}></div>
              <div className='status-representation-text'>
                {item.statusText}
              </div>
            </div>
          })
        }
      </div>

      {/* Report Submit Drawer */}
      <div className={`reportsidebar ${openReport == true ? 'active' : ''}`}>
        <ReportSubmit
          hospitalDatatoSubmit={hospitalDatatoSubmit}
          fetchIsCloseReport={fetchIsCloseReport}
          isUser={isUser}
          isLoggedIn={isLoggedIn}
        />
      </div >
    </div >
  )
}
