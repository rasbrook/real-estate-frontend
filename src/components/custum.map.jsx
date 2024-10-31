import React, { useEffect, useRef } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';
import './CustomMap.css';
//import dotenv from 'dotenv'
//dotenv.config()
const CustomMap = ({
  center = [0, 0],
  zoom = 13,
  markers = [],
  width = '100%',
  height = '400px'
}) => {
  const mapElement = useRef();
  const mapInstance = useRef(null);

  useEffect(() => {
    mapInstance.current = tt.map({
      key:"n358pg7M9AClnb6DY0V8xeS14ykfA1nG",
      container: mapElement.current,
      center: center,
      zoom: zoom
    });

    return () => mapInstance.current.remove();
  }, []);

  useEffect(() => {
    markers.forEach(marker => {
      const element = document.createElement('div');
      element.className = 'custom-marker';
      new tt.Marker({ element: element })
        .setLngLat([marker.longitude, marker.latitude])
        .addTo(mapInstance.current);
    });
  }, [markers]);

  return <div ref={mapElement} style={{ width, height }} />;
};

export default CustomMap;
