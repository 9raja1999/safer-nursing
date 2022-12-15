import React, { useEffect, useState, memo } from 'react'
import {
    GoogleMap,
    useJsApiLoader,
    Marker,
    MarkerClusterer,
    InfoWindow,
    LoadScript,
} from '@react-google-maps/api';
import { DefaultTheme, locations } from './MapData';
import { getHospitalByID } from '../../store/actions/hospitalActions';
import markerImage from '../../assets/images/location.svg';
import neutralMarker from '../../assets/images/neutral.svg';
import negativeMarker from '../../assets/images/negative.svg';
import ulternateMarker from '../../assets/images/noulternate.svg';
import HospitalImage from '../../assets/images/bedford-img.png';



const containerStyle = { width: '100%', height: '100%' };

const center = { lat: 47.116386, lng: -101.299591 }


function Map(props) {
    const [isOpen, setIsOpen] = useState(false);
    const filteredData = props.geoLocations.filter(({ reportCount }) => reportCount !== 0).map((item, idx) => (item));
    const [showIndexOf, setShowIndexOf] = useState(0);
    const [hospitalData, setHospitalData] = useState({});
    const [submitReport, setSubmitReport] = useState(false);


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,

    })


    const [map, setMap] = useState(null);


    const openGeoModal = (location, idx) => {
        isOpen == true ? setIsOpen(false) : setIsOpen(true);
        // setIsOpen(true);
        setShowIndexOf(idx);
        console.log('hovered')
        getHospitalByID(location.facilityID)
            .then(res => {
                setHospitalData({ ...hospitalData, data: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    const onSubmitReport = () => {
        Promise.resolve()
            .then(() => {
                setSubmitReport(check => !check);
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(submitReport)
                    }, 1);
                })
            })
            .then(() => {
                props.fetchIsReport(true, hospitalData.data);
            })
    }


    return (

        isLoaded ? (
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={3}

                options={{
                    mapId: 'myUniqueID',
                    styles: DefaultTheme,
                    fullscreenControl: false,
                    zoomControl: false,
                    streetView : false
                }}
                streetView={{
                    controls : false
                }}
            >
                <MarkerClusterer
                    imagePath='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVxXtfD0Onmcjeuoj7fHL0kIX6xwsmAHM0w&usqp=CAU'
                    maxZoom={3}
                    title='Click to view'
                    styles={[
                        {
                            textColor: 'black',
                            url: markerImage,
                            height: 35,
                            width: 35
                        },
                        {
                            textColor: 'black',
                            url: markerImage,
                            height: 45,
                            width: 45
                        },
                    ]}

                >
                    {(clusterer) =>
                        filteredData.map((location, index) => (
                            
                            <Marker
                                key={index}
                                position={location.positions}
                                clusterer={clusterer}
                                icon={{
                                    url: location.status == "Great" ? (
                                        markerImage
                                    ) : (
                                        location.status == 'Bad' ? (
                                            negativeMarker
                                        ) : (
                                            location.status == 'Ok' ? (
                                                neutralMarker
                                            ) : (
                                                ulternateMarker
                                            )
                                        )
                                    )
                                }}

                                label={{ text: `${location.reportCount}`, color: 'black', fontSize: '13px', fontWeight: 'bold' }}

                                cursor='pointer'
                                draggable={false}
                                onClick={() => openGeoModal(location, index)}
                                onMouseOver={() => openGeoModal(location, index)}
                            >
                                {
                                    ((isOpen == true) && (showIndexOf == index) && (Object.keys(hospitalData).length !== 0)) ? <InfoWindow
                                    >
                                        <div className="marker-infomodal">
                                            <div className="image-holder">
                                                <img src={HospitalImage} alt="" className="img-fluid" />
                                            </div>
                                            <div className="text-box">
                                                <h3>{hospitalData.data.address.FacilityName}</h3>
                                                <p>{hospitalData.data.address.Address}</p>
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
                                                    onClick={() => onSubmitReport()}
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


export default memo(Map);

