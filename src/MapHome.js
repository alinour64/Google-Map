import Search from "./Search";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import React, { useState, useMemo, useEffect } from "react";

export default function MapHome() {
  const [center, setCenter] = useState({ lat: 47.6, lng: -122.3 });
  useEffect(() => {
    getLocation();
  }, []);
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, posError);
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };
  const posError = () => {
    navigator.permissions.query({ name: "geolocation" }).then((res) => {
      if (res.state === "denied") {
      }
    });
  };

  const showPosition = (position) => {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    setCenter({ lat: lat, lng: lng });
    // setTimeout(() => {
    //   setCenter({ lat: lat, lng: lng });
    // }, [1000]);
    // console.log(center);
  };

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [render, setRender] = useState(
    <DirectionsRenderer
      directions={directionsResponse}
      panel={document.getElementById("panel")}
    />
  );
  const zoom = useState(10);
  // const [center, setCenter] = useState({lat: originalCenter.lat, lng: originalCenter.lng });
  function handleLocationReset() {
    // setCenter(prev => originalCenter)
    getLocation();
    map.panTo(center);
    map.setZoom(15);
  }
  function work() {}
  useEffect(() => {
    setDirectionsResponse((prev) => directionsResponse);
    setRender(
      <DirectionsRenderer
        directions={directionsResponse}
        panel={document.getElementById("panel")}
      />
    );
  }, [directionsResponse]);

  const [map, setMap] = useState(null);
  // console.log(map.getPosition());
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  // const onLoad = (marker)
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <div>
        <Search
          className="search-container"
          handleLocationReset={handleLocationReset}
          setDirectionsResponse={setDirectionsResponse}
          center={center}
        />
      </div>

      <GoogleMap
        zoom={10}
        center={center}
        options={{
          gestureHandling: "greedy",
        }}
        mapContainerClassName="map-container"
        onLoad={(map) => setMap(map)}
      >
        <MarkerF className="marker" position={center} />
        <div>{directionsResponse && render}</div>
        {/* {getPanel()} */}
      </GoogleMap>
    </div>
  );
}

// function Map() {
// const center = useMemo(() => ({ lat: 47.6, lng: -122.3 }), []);
// let startMapLocation={
//   lat: 47.6,
//   long: -122.3
// }
// const [mapLocation, setMapLocation] = useState(startMapLocation)
// return (
// <GoogleMap
//     zoom={10}
//     center={center}
//     mapContainerClassName="map-container"
// >
//   <Marker position={center} />
// </GoogleMap>
// );
// }
