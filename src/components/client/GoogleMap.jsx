import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
// let DefaultIcon = L.icon({
//     iconUrl: icon,
//     shadowUrl: iconShadow
// });
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41], // iconning o'lchami
  iconAnchor: [12, 41], // iconning "tutash" nuqtasi
  popupAnchor: [1, -34], // popup oynasining boshlanish nuqtasi
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = ({ city1Coords, city2Coords }) => {
  return (
    <div className="">
      <MapContainer
        center={city1Coords}
        zoom={2}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={city1Coords}>
          <Popup>City 1</Popup>
        </Marker>
        <Marker position={city2Coords}>
          <Popup>City 2</Popup>
        </Marker>
        <Polyline positions={[city1Coords, city2Coords]} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
