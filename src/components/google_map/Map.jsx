import React, { useEffect, useState } from 'react'
import {
    GoogleMap,
    useJsApiLoader,
    Marker,
    MarkerClusterer,
    InfoWindow
} from '@react-google-maps/api';
import { DefaultTheme, locations } from './MapData';
import markerImage from '../../assets/images/location.svg';
import HospitalImage from '../../assets/images/bedford-img.png';



const containerStyle = { width: '100%', height: '100%' };

const center = { lat: -28.024, lng: 140.887 }


export default function Map(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [showIndexOf, setShowIndexOf] = useState(0);
    const [submitReport, setSubmitReport] = useState(false);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY
    })

    const [map, setMap] = useState(null);


    // // When Submit Report Button is Clicked drawer opens in Home Component
    // useEffect(()=>{
    //     alert(submitReport ? 'Drawer Opens' : 'Drawer Closed');
    // },[submitReport])

    const createKey = (location) => {
        return location.lat + location.lng
    }

    const openGeoModal = (location, idx) => {
        isOpen == true ? setIsOpen(false) : setIsOpen(true);
        setShowIndexOf(idx)
    }

    const onSubmitReport = () => {
        Promise.resolve()
            .then(()=>{
                setSubmitReport(check => !check);
                new Promise((resolve,reject)=>{
                    setTimeout(() => {
                        resolve(submitReport)
                    }, 1);
                })
            })
            .then(()=>{
                props.fetchIsReport(!submitReport);
            })
    }

    return (
        isLoaded ? (
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={5}
                options={{
                    mapId: 'myUniqueID',
                    styles: DefaultTheme,
                    fullscreenControl: false,
                    zoomControl: false
                }}
            >
                <MarkerClusterer
                    imagePath='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVxXtfD0Onmcjeuoj7fHL0kIX6xwsmAHM0w&usqp=CAU'
                    styles={[
                        {
                            textColor: 'black',
                            url: markerImage,
                            height: 35,
                            width: 35
                        },
                        {
                            textColor: 'red',
                            url: markerImage,
                            height: 45,
                            width: 45
                        },
                    ]}

                >
                    {(clusterer) =>
                        locations.map((location, index) => (
                            <Marker
                                key={createKey(location)}
                                position={location}
                                clusterer={clusterer}
                                icon={{
                                    url: markerImage,
                                }}

                                label={{ text: `H`, color: 'black', fontSize: '13px', fontWeight: 'bold' }}

                                cursor='pointer'
                                draggable={false}
                                onClick={() => openGeoModal(location, index)}
                            >
                                {
                                    ((isOpen == true) && (showIndexOf == index)) ? <InfoWindow
                                    // position={location}
                                    >
                                        <div className="marker-infomodal">
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
                                                <span
                                                    className="report-btn"
                                                    onClick={()=>onSubmitReport()}
                                                >
                                                    Submit Report
                                                </span>
                                            </div>
                                        </div>
                                    </InfoWindow> : ''
                                }
                            </Marker>
                        ))
                    }
                </MarkerClusterer>
            </GoogleMap>
        ) : <></>
    )
}

