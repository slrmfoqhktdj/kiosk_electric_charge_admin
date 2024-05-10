import React from 'react'
import { GoogleMap, LoadScript , InfoWindow , Marker} from '@react-google-maps/api';
import { useState } from "react";

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
  
function DeviceMap({ isDashboard = false , Data}) {
    // const theme = useTheme();
    // const colors = tokens(theme.palette.mode);
    const [activeMarker, setActiveMarker] = useState(null);


    const handleActiveMarker = (marker) => {
      if (marker === activeMarker) {
          return;
      }
      setActiveMarker(marker);
    };


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

        {
          Data?

          Data.map(({ id, position, addr }) => (
              <Marker
              key={id}
              position={{lat:parseFloat(position.latitude),lng:parseFloat(position.longitude)}}
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
          ))
          :
          null
          
        }
        </GoogleMap>
      </LoadScript>
    )
}


export default React.memo(DeviceMap);
