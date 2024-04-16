
// import { tokens } from "../theme";

// import { useTheme } from "@mui/material";
import React from 'react'
// import { GoogleMap, LoadScript ,MarkerF , InfoWindow , Marker} from '@react-google-maps/api';
import { GoogleMap, LoadScript , InfoWindow , Marker} from '@react-google-maps/api';
// import RoomIcon from '@mui/icons-material/Room';
import { useState } from "react";
import { useEffect } from 'react';
import {fetchGet} from "../communication/handlefetch"

const APIKEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY
const containerStyle = {
    width: '100%',
    height: '100%'
};

  
const center = {
    lat: 36.34,
    lng: 127.77
};

// const markers = [

//     {
//         id : "device_01",
//         position:{lat:35.18772696,lng:126.91088663},
//         addr:"광주광역시북구오치동"
//     },
//     {
//         id: "device_02",
//         position:{lat:35.2885323,lng:126.9955906},
//         addr:"담양군무정면"
//     }
//   ];
  
function DeviceMap({ isDashboard = false }) {
    // const theme = useTheme();
    // const colors = tokens(theme.palette.mode);
    const [activeMarker, setActiveMarker] = useState(null);
    const [Data, setData] = useState([]);

    useEffect(() => {
        fetchGet("/mapdata")
        .then((data) => {        
            setData(data)
        });
      }, []);


    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
          return;
        }
        setActiveMarker(marker);
      };
    
      //로드 될때 위치 잡기
    //   const handleOnLoad = (map) => {
    //     const bounds = new window.google.maps.LatLngBounds();
    //     markers.forEach(({ position }) => bounds.extend(position));
    //     map.fitBounds(bounds);
        
    //   };


    return (
      <LoadScript
        googleMapsApiKey={APIKEY}
      >
        <GoogleMap
            // onLoad={handleOnLoad}
            onClick={() => setActiveMarker(null)}
            mapContainerStyle={containerStyle}
            center={center}
            zoom={isDashboard?6:8}
        >

        {Data.map(({ id, position, addr }) => (
            <Marker
            key={id}
            position={position}
            onClick={() => handleActiveMarker(id)}
            >
            {activeMarker === id ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div style={{color:'black'}}>{id}
                    <div style={{color:'black'}}>{addr}
                    </div>
                </div>
                </InfoWindow>
            ) : null}
            </Marker>
        ))}
          {/* <MarkerF position={center} icon={{
            url:(require('@mui/icons-material/Room')),
            }}></MarkerF> */}
        </GoogleMap>
      </LoadScript>
    )
}


export default React.memo(DeviceMap);
