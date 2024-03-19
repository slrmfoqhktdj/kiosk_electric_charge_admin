
// import { tokens } from "../theme";

// import { useTheme } from "@mui/material";
import React from 'react'
// import { GoogleMap, LoadScript ,MarkerF , InfoWindow , Marker} from '@react-google-maps/api';
import { GoogleMap, LoadScript , InfoWindow , Marker} from '@react-google-maps/api';
// import RoomIcon from '@mui/icons-material/Room';
import { useState } from "react";


const containerStyle = {
    width: '100%',
    height: '100%'
};

  
const center = {
    lat: 36.34,
    lng: 127.77
};

const markers = [
    // {
    //   id: 1,
    //   name: "Chicago, Illinois",
    //   position: { lat: 41.881832, lng: -87.623177 }
    // },
    // {
    //   id: 2,
    //   name: "Denver, Colorado",
    //   position: { lat: 39.739235, lng: -104.99025 }
    // },
    // {
    //   id: 3,
    //   name: "Los Angeles, California",
    //   position: { lat: 34.052235, lng: -118.243683 }
    // },
    // {
    //   id: 4,
    //   name: "New York, New York",
    //   position: { lat: 40.712776, lng: -74.005974 }
    // }

    {
        id : "device_01",
        position:{lat:35.18772696,lng:126.91088663}
    },
    {
        id: "device_02",
        position:{lat:35.2885323,lng:126.9955906}
    }
  ];
  
function DeviceMap() {
    // const theme = useTheme();
    // const colors = tokens(theme.palette.mode);
    const [activeMarker, setActiveMarker] = useState(null);

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
          return;
        }
        setActiveMarker(marker);
      };
    
      const handleOnLoad = (map) => {
        const bounds = new window.google.maps.LatLngBounds();
        markers.forEach(({ position }) => bounds.extend(position));
        map.fitBounds(bounds);
      };

    return (
      <LoadScript
        googleMapsApiKey="AIzaSyDGMSUSJ65bZGxscMv1gXQJAfYg_W5FM64"
      >
        <GoogleMap
            onLoad={handleOnLoad}
            onClick={() => setActiveMarker(null)}
            mapContainerStyle={containerStyle}
            center={center}
            zoom={8}
        >

        {markers.map(({ id, position }) => (
            <Marker
            key={id}
            position={position}
            onClick={() => handleActiveMarker(id)}
            >
            {activeMarker === id ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div style={{color:'black'}}>{id}</div>
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
