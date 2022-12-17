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
import searchIcon from '../../assets/images/mapSearch.svg';
import zoomInIcon from '../../assets/images/mapZoomIn.svg';
import zoomOutIcon from '../../assets/images/mapZoomOut.svg';



const containerStyle = { width: '100%', height: '100%' };

const center = { lat: 39, lng: -95 }


function Map(props) {
    const [isOpen, setIsOpen] = useState(false);
    const filteredData = props.geoLocations.filter(({ reportCount }) => reportCount !== 0).map((item, idx) => (item));
    const [showIndexOf, setShowIndexOf] = useState(0);
    const [hospitalData, setHospitalData] = useState({});
    const [submitReport, setSubmitReport] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [restriction, setRestriction] = useState({
        latLngBounds: {
            north: 49.38,
            east: -66.94,
            south: 25.82,
            west: -124.39
        },
        strictBounds: false,

    })

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,

    })


    const [map, setMap] = useState(null);

    const openGeoModal = (location, idx) => {
        isOpen == true ? setIsOpen(false) : setIsOpen(true);
        // setIsOpen(true);
        setShowIndexOf(idx);
        setRestriction(null);
        getHospitalByID(location.facilityID)
            .then(res => {
                setHospitalData({ ...hospitalData, data: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    const closeInfoModal = (location, idx) => {
        isOpen == true ? setIsOpen(false) : setIsOpen(true);
        // setIsOpen(true);
        setShowIndexOf(idx);
        setRestriction({
            latLngBounds: {
                north: 49.38,
                east: -66.94,
                south: 25.82,
                west: -124.39
            },
            strictBounds: false,
        })
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
                zoom={zoom}
                
                options={{
                    mapId: 'myUniqueID',
                    styles: DefaultTheme,
                    fullscreenControl: false,
                    zoomControl: false,
                    streetView: false,
                    restriction: restriction,
                }}

                streetView={{
                    controls: false
                }}
            >   
                
                <div className='google-map-zoom'>
                    <img src={zoomInIcon} onClick={() => setZoom(zoom + 2)} />
                    <img src={searchIcon} />
                    <img src={zoomOutIcon} onClick={() => zoom == 1 ? setZoom(1) : setZoom(zoom - 2)} />
                </div>
                <div className='status-representation-cluster'>
                    <div className='status-representation-color' style={{ background: 'black' }}></div>
                    <div className='status-representation-text'>
                        cluster
                    </div>
                </div>
                <MarkerClusterer
                    // imagePath='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVxXtfD0Onmcjeuoj7fHL0kIX6xwsmAHM0w&usqp=CAU'
                    // imagePath='https://i.ibb.co/VjDs3yB/Group-12610-1.png'
                    maxZoom={3}
                    title='Click to View'
                    styles={[
                        {
                            textColor: 'black',
                            url: ulternateMarker,
                            height: 35,
                            width: 35
                        },
                        {
                            textColor: 'black',
                            url: markerImage,
                            height: 35,
                            width: 35
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
                                        location.status == 'OK' ? (
                                            markerImage
                                        ) : (
                                            location.status == 'Bad' ? (
                                                neutralMarker
                                            ) : (
                                                location.status == "Good" ? (
                                                    markerImage
                                                ): (
                                                    negativeMarker
                                                )
                                            )
                                        )
                                    )
                                }}
                                label={{ text: `${location.reportCount}`, color: 'black', fontSize: '13px', fontWeight: 'bold' }}
                                cursor='pointer'
                                draggable={false}
                                // onClick={() => openGeoModal(location, index)}
                                onMouseOver={() => openGeoModal(location, index)}

                            >
                                {
                                    ((isOpen == true) && (showIndexOf == index) && (Object.keys(hospitalData).length !== 0)) ? <InfoWindow
                                        onCloseClick={() => closeInfoModal(location, index)}
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
                                                        <span></span><p>FACILITY</p>
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

