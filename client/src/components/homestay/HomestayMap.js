import React, { useEffect, useState } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import Marker from 'react-leaflet-enhanced-marker';
import HomestayMarker from './HomestayMarker';

const HomestayMap = (props) => {
  const { position, userPosition, homestaysOnMap } = props;

  const [ markersOnMap, setMarkersOnMap ] = useState([]);

  useEffect(() => {
    const homestaysWithCoords = homestaysOnMap.filter(homestay => homestay.homestayPosition.length === 2);

    const markersOnMap = homestaysWithCoords.map((homestayOnMap) => (
      <Marker
        className="marker-container"
        icon={<HomestayMarker price={homestayOnMap.price} />}
        position={homestayOnMap.homestayPosition}
        key={homestayOnMap.homestayPosition[0]}
      />
    ));
    setMarkersOnMap(markersOnMap);
  }, [homestaysOnMap])

  return (
    <div className="homestay-map">
      <Map center={position} zoom="14">
        <Marker position={userPosition} />
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markersOnMap}
      </Map>
    </div>
  );
}

export default HomestayMap;
