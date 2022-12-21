import React, { useEffect, useRef, useState } from "react";

export default function Directions(props) {
  useEffect(() => {
    var control = props.L.Routing.control({
      waypoints: [
        props.L.latLng(null), //47.674, 122.1215
        props.L.latLng(null), //47.6769, 122.206
      ],
      showAlternatives: true,
      altLineOptions: {
        styles: [
          { color: "black", opacity: 0.15, weight: 9 },
          { color: "white", opacity: 0.8, weight: 6 },
          { color: "blue", opacity: 0.5, weight: 2 },
        ],
      },
      geocoder: props.L.Control.Geocoder.nominatim(),
    }).addTo(props.map);
    console.log(control);
  }, []);
}
