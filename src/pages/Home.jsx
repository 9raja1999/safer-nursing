import React, { useState } from 'react';
import {
  useHistory
} from 'react-router-dom'
import Header from '../components/Header';
import Map from '../components/google_map/Map';

import dotsToggleImage from '../assets/images/dotsToggle.svg';

export default function Home() {
  const history = useHistory();
  const [openReport, setOpenReport] = useState(false);

  const fetchIsReport = (isOpen) => {
    // If isOpen is true open report submit left Drawer
    console.log('Report Open Drawer : ', isOpen);
    setOpenReport(isOpen);
  }

  return (
    <div className='wrapper'>
      <Header />
      <div className='map-holder'>
        <Map
          fetchIsReport={fetchIsReport}
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
        <div className='report-drawer-header'>
          <div className='hospital-title-holder'>
            <div className='tileVerticle'>

            </div>
            <div className='hospital-title-name'>
              <h3>BedFord Trust Hospital</h3>
              <span>NM 1334300</span>
            </div>
            <div>
              <img
                src={dotsToggleImage}
                className='three-dots-toggle'
                onClick={()=>setOpenReport(false)}
              />
            </div>
          </div>
        </div>
        <div className='form-status-bar'>
          <div className='stage1'>
            <div>
              <h1>Basic</h1>
              <div className='status' style={{ background: '#52B788' }}></div>
            </div>
          </div>
          <div className='stage1'>
            <div>
              <h1>Staffing</h1>
              <div className='status' style={{ background: '#081C15', opacity: '0.2' }}></div>
            </div>
          </div>
          <div className='stage1'>
            <div>
              <h1>Assignment</h1>
              <div className='status' style={{ background: '#081C15', opacity: '0.2' }}></div>
            </div>
          </div>
          <div className='stage1'>
            <div>
              <h1>Facility</h1>
              <div className='status' style={{ background: '#081C15', opacity: '0.2' }}></div>
            </div>
          </div>
          <div className='stage1'>
            <div>
              <h1>Experience</h1>
              <div className='status' style={{ background: '#081C15', opacity: '0.2' }}></div>
            </div>
          </div>

        </div>
        <div className='report-drawer-footer'>
          <div className='report-submit-buttons-holder'>
            <div className='cancel-button'>
              <p>Cancel</p>
            </div>
            <div className='next-button'>
              <p>Next Step</p>
            </div>
          </div>
          <p className='report-footer-tagline'>
            Submit Report as a user,
            <span onClick={()=>history.push('/Login')}> Login</span> or <span onClick={()=>history.push('/Registration')}>Register</span></p>
        </div>
      </div>
    </div>
  )
}
