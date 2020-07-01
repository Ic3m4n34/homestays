import React, { useEffect, useState } from 'react';
import { Map, TileLayer } from 'react-leaflet';

const HomestayMap = (props) => {
  const { position } = props;
  console.log('pos', position);

  return (
    <div className="homestay-map">
      <Map center={position} zoom="13">
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </Map>
    </div>
  );
}

export default HomestayMap;
