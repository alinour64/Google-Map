import React, { useEffect, useRef, useState } from "react";
import { Autocomplete, DirectionsRenderer } from "@react-google-maps/api";

export default function Search(props) {
  const data = {
    orgin: "",
    destination: "",
  };
  const [locations, setLocations] = useState(data);
  const [disp, setDisp] = useState(false);
  const [duration, setDuration] = useState("");
  const [distance, setDistance] = useState("");
  /* eslint-disable */
  const [transportaion, setTransportation] = useState(
    google.maps.TravelMode.WALKING
  );
  // console.log(transportaion);
  useEffect(() => {
    setDisp(disp);
  }, [disp]);
  useEffect(() => {
    setTransportation((prev) => transportaion);
    calculate();
  }, [transportaion]);
  const [track, setTrack] = useState(false);

  const originRef = useRef();
  const destinationRef = useRef();

  function handleChange(event) {
    setLocations((prevLocations) => {
      return {
        ...prevLocations,
        [event.target.name]: event.target.value,
      };
    });
    setTrack((prev) => !prev);
  }
  function handleClear() {
    // window.location.reload(false); //refreshes window FIX-------------------------------------------------------------->
    setTransportation(null);
    props.setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
    setDisp(false);
    // document.getElementById("panel").value = "";
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  async function calculate() {
    try {
      if (
        originRef.current.value === "" ||
        destinationRef.current.value === ""
      ) {
        return {};
      }

      /* eslint-disable */
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        provideRouteAlternatives: true,
        travelMode: transportaion,
      });
      props.setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
      setDisp(true);
    } catch (error) {
      alert(error);
      handleClear();
    }
  }

  function locationReset() {
    // props.setDirectionsResponse(null);
    // setDistance("");
    // setDuration("");
    // originRef.current.value = "";
    // destinationRef.current.value = "";
    props.handleLocationReset();
  }
  // console.log(props.panel + "----");
  return (
    <div className="child-contanier">
      <form className="form search" onSubmit={handleSubmit}>
        <div className="row">
          <h1 className="col-12 info">
            Sidewalk <br /> Directions:
          </h1>
          <div className="col-12">
            <Autocomplete>
              <input
                className="form-control orgin"
                type="text"
                placeholder="Orgin"
                // onChange={handleChange}
                name="orgin"
                // value={locations.orgin}
                ref={originRef}
              />
            </Autocomplete>
          </div>
          <div className="col-12">
            <Autocomplete className="col-12">
              <input
                className="form-control destination"
                type="text"
                placeholder="Destination"
                // onChange={handleChange}
                name="destination"
                // value={locations.destination}
                ref={destinationRef}
              />
            </Autocomplete>
          </div>
        </div>
        <div className="iconTypeOfTransportation row">
          <button
            className="col-2 btn btn-warning"
            title="Driving"
            onClick={() => setTransportation(google.maps.TravelMode.DRIVING)}
          >
            <i class="fa-solid fa-car"></i>
          </button>
          <button
            className="col-2 btn btn-warning"
            title="Transit"
            onClick={() => setTransportation(google.maps.TravelMode.TRANSIT)}
          >
            <i class="fa-solid fa-bus"></i>
          </button>
          <button
            className="col-2 btn btn-warning"
            title="Biking"
            onClick={() => setTransportation(google.maps.TravelMode.BICYCLING)}
          >
            <i class="fa-solid fa-person-biking"></i>
          </button>
          <button
            className="col-2 btn btn-warning"
            title="Walking"
            onClick={() => setTransportation(google.maps.TravelMode.WALKING)}
          >
            <i class="fa-solid fa-person-walking"></i>
          </button>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6 col-4">
            <button
              className="btn btn-primary goBtn"
              type="submit"
              value="Navigate"
              onClick={() =>
                transportaion !== null
                  ? calculate()
                  : setTransportation(google.maps.TravelMode.WALKING)
              }
              title="Navigate"
            >
              <i class="bi bi-sign-turn-right-fill"></i>
            </button>
          </div>
          <div className="col-lg-4 col-md-6 col-4">
            <button
              className="btn btn-primary clearBtn"
              onClick={handleClear}
              type="button"
              title="Clear Route"
            >
              <i class="fa-solid fa-circle-xmark"></i>
            </button>
          </div>
          <div className="col-lg-4 col-md-12 col-4">
            <button
              // onClick={handleCurrentLocation}
              className="btn btn-success home"
              type="button"
              onClick={locationReset}
              title="Reset Location"
            >
              <i class="fa-solid fa-location-dot"></i>
            </button>
          </div>
        </div>
        <div className="trip-info">
          <div className="row">
            <div className="col-12">
              <h2 className="info">{transportaion && transportaion + ":"}</h2>
            </div>
            <div className="col-12">
              <h5 className="info">Distance: {distance}</h5>
            </div>
            <div className="col-12">
              <h5 className="info">Duration: {duration}</h5>
            </div>
            <div className="col-12">
              <h5 className="info">{props.directionsResponse}</h5>
            </div>
            <div className="col-12">{disp && <div id="panel"></div>}</div>
          </div>
        </div>
      </form>
    </div>
  );
}
