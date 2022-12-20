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
import { getHospitalByID, getUnitScores } from '../../store/actions/hospitalActions';
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
    const [unitScores, setUnitScores] = useState({});
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
        // console.log('MARKER HOVER LOCATION :', location)
        isOpen == true ? setIsOpen(false) : setIsOpen(true);
        // setIsOpen(true);
        setShowIndexOf(idx);
        setRestriction(null);

        getUnitScores(location.report_id, location.facilityID)
            .then(response => {
                if(response.message == 'data found'){
                    setUnitScores(response.data)
                }
            })
            .catch(err => {
                console.log('ERR')
            })

        getHospitalByID(location.facilityID)
            .then(res => {
                // console.log('Hospital Data : ', res.data)
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

    const beautifySubmissionDate = (date) => {
        let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var today = new Date(date);
        return today.toLocaleDateString("en-US", dateOptions)
    }

    const onSubmitReport = (location, index) => {
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
                setTimeout(() => {
                    // Closing the info modal when submit report button is clicked
                    closeInfoModal(location, index);
                }, 1000);
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
                                                ) : (
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
                                    ((isOpen == true) && (showIndexOf == index) && (Object.keys(hospitalData).length !== 0)) && (Object.keys(unitScores).length !== 0) ? <InfoWindow
                                        onCloseClick={() => closeInfoModal(location, index)}
                                    >
                                        <div className="marker-infomodal">
                                            <div className="image-holder">
                                                <img src={HospitalImage} alt="" className="img-fluid"

                                                />
                                            </div>
                                            <div className="text-box">
                                                <h3>{hospitalData.data.address.FacilityName}</h3>
                                                <p>{hospitalData.data.address.Address}</p>
                                                <ul>
                                                    <li>
                                                        <span style={{
                                                            background : unitScores.staffing.toLowerCase() == 'great' ? (
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
                                                        }}></span>
                                                        <p> STAFFING</p>
                                                    </li>
                                                    <li>
                                                        <span style={{
                                                            background : unitScores.assignment.toLowerCase() == 'great' ? (
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
                                                        }}></span>
                                                        <p> ASSIGNMENT</p>
                                                    </li>
                                                    <li>
                                                        <span style={{
                                                            background : unitScores.facility.toLowerCase() == 'great' ? (
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
                                                        }}></span>
                                                        <p>FACILITY</p>
                                                    </li>
                                                    <li>
                                                        <span style={{
                                                            background : unitScores.experience.toLowerCase() == 'great' ? (
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
                                                        }}></span>
                                                        <p>EXPERIENCE</p>
                                                    </li>
                                                </ul>
                                                {
                                                    beautifySubmissionDate(hospitalData.data.geolocations.Submitted_Date)
                                                }
                                                <p></p>
                                                <span
                                                    className="report-btn"
                                                    onClick={() => onSubmitReport(location, index)}
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


export default Map;

