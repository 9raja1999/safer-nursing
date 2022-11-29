import React from 'react'
import HospitalImage from '../../assets/images/bedford-img.png';

export default function HospitalModal() {
    return (
        <div className="hospital-popup">
            <div className="image-holder">
                <img src={HospitalImage} alt="" className="img-fluid" />
            </div>
            <div className="text-box">
                <h3>Bedford Trust
                    Hospital</h3>
                <p>NM 1334300</p>
                <ul>
                    <li>
                        <span className="red-bg" ></span>
                        <p> STAFFING </p>
                    </li>
                    <li>
                        <span className="yellow-bg"></span> <p> ASSIGNMENT</p>
                    </li>
                    <li>
                        <span></span><p>EXPERIENCEFACILITY</p>
                    </li>
                    <li>
                        <span className="red-bg"></span><p>EXPERIENCE</p>
                    </li>
                </ul>
                <a href="#" className="report-btn" >Submit
                    Report
                </a>
            </div>
        </div>
    )
}
