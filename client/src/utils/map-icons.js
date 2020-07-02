import L from 'leaflet';

const homestayIcon = new L.Icon({
  iconUrl: require('../img/home-run.png'),
  iconRetinaUrl: require('../img/home-run.png'),
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [32, 32],
});

export {
  homestayIcon
};