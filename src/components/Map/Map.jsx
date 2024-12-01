import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";
import prevIcon from "../../assets/PreviousLocation.png";

const MapComponent = () => {
  const mapRef = useRef(null);
  const [popupData, setPopupData] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([12.9352, 77.6974], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current);

      const customIcon = L.divIcon({
        className: "icon",
        html: `<div class="icon-wrapper">
                  <img src="${prevIcon}"/>
               </div>`,
        iconSize: [80, 80],
        iconAnchor: [-300, 100],
      });

      const marker = L.marker([12.9352, 77.6974], { icon: customIcon }).addTo(
        mapRef.current
      );
      marker.on("click", (e) => {
        if (popupVisible) {
          setPopupVisible(false);
        } else {
          setPopupData({
            title: "McDonald's",
            location: "Marathalli",
            address: "123, Main St, Marathalli, Bengaluru, Karnataka, India",
            phone: "+91-9876543210",
            website: "http://mcdonalds.in/",
          });

          const mapContainer = document.getElementById("map");
          const mapBounds = mapContainer.getBoundingClientRect();
          const popupX = e.originalEvent.clientX - mapBounds.left;
          const popupY = e.originalEvent.clientY - mapBounds.top;

          setPopupPosition({ x: popupX, y: popupY });
          setPopupVisible(true);
        }
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [popupVisible]);

  return (
    <div className="map-container">
      <div id="map"></div>

      {popupVisible && (
        <div className="custom-popup">
          <div className="cardDetails">
            <h2>McDonald's</h2>
            <p>Marathalli</p>
          </div>
          <div className="description">
            <h3>123, Main St, Marathalli, Bengaluru, Karnataka, India</h3>
          </div>
          <div className="number">
            <h3>Phone number</h3>
            <p>+91-9568741230</p>
          </div>
          <div className="website">
            <h3>Website</h3>
            <p>http://mcdonalds.in/</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
