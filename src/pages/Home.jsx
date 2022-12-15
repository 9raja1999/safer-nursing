import React, { useState, useEffect } from 'react';
import {
  useHistory
} from 'react-router-dom'
import Header from '../components/Header';
import Map from '../components/google_map/Map';
import ReportSubmit from '../components/Forms/ReportSubmit';
import { getAllGeoLocations } from '../store/actions/hospitalActions';
import { getAllQuestions, generateReportID, addReport, addAnswersToReport } from '../store/actions/reportActions';
import { Circles } from 'react-loader-spinner';
import report from '../assets/JSON/report.json';


import 'react-toastify/dist/ReactToastify.css';



export default function Home() {
  const history = useHistory();
  const [openReport, setOpenReport] = useState(false);
  const [allGeoLocations, setAllGeolocations] = useState([]);
  const [hospitalDatatoSubmit, setHospitalDataToSubmit] = useState(null);
 

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllGeoLocations()
      .then(res => {
        console.log(res);
        setAllGeolocations(res.data);
        setIsLoading(false)
      })
      .catch(err => {
        console.log('ERROR !!', err)
      })
  }, [])

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
      <Header
        hospitalsData={allGeoLocations}
      />
      <div className='map-holder'>
        <Map
          fetchIsReport={fetchIsReport}
          geoLocations={allGeoLocations}
        />
      </div>
      <div className='status-bar'>
        {
          [
            { statusText: 'positive', color: '#52B788' },
            { statusText: 'neutral', color: '#E0D16C' },
            { statusText: 'negative', color: '#E46870' }
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
        />
      </div >
    </div >
  )
}
