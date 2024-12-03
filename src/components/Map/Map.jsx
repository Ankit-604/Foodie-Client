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
            websiteMap: "http://mcdonalds.in/",
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
    <div className="mapContainer">
      <div id="map"></div>

      {popupVisible && popupData && (
        <div
          className="customPopup "
          style={{ left: popupPosition.x, top: popupPosition.y }}
        >
          <div className="cardDetailsMap">
            <h2>{popupData.title}</h2>
            <p>{popupData.location}</p>
          </div>
          <div className="descriptionMap">
            <h3>{popupData.address}</h3>
          </div>
          <div className="numberMap">
            <h3>Phone numberMap</h3>
            <p>{popupData.phone}</p>
          </div>
          <div className="websiteMap">
            <h3>Website</h3>
            <p>{popupData.websiteMap}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
