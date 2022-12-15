import React, { useEffect, useState, memo } from 'react'
import {
    GoogleMap,
    useJsApiLoader,
    Marker,
    MarkerClusterer,
    InfoWindow
} from '@react-google-maps/api';
import { DefaultTheme, locations } from './MapData';
import { getHospitalByID } from '../../store/actions/hospitalActions';
import markerImage from '../../assets/images/location.svg';
import neutralMarker from '../../assets/images/neutral.svg';
import negativeMarker from '../../assets/images/negative.svg';
import HospitalImage from '../../assets/images/bedford-img.png';



const containerStyle = { width: '100%', height: '100%' };




function HospitalMap(props) {
    const [hospitalData, setHospitalData] = useState({});
    const [submitReport, setSubmitReport] = useState(false);


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
    })

    const [map, setMap] = useState(null);

    return (
        isLoaded ? (
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={props.positions}
                zoom={5}
                options={{
                    mapId: 'myUniqueID',
                    styles: DefaultTheme,
                    fullscreenControl: false,
                    zoomControl: false
                }}
                
            >
                <Marker
                    position={props.positions}
                    icon={{
                        url: markerImage
                        // url: markerImage
                    }}

                    label={{ text: `${props.reportCount}`, color: 'black', fontSize: '13px', fontWeight: 'bold' }}

                    cursor='pointer'
                    draggable={false}
                >
                </Marker>
            </GoogleMap>
        ) : <></>
    )
}


export default memo(HospitalMap);

