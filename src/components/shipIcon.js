// import L from 'leaflet';

// const iconShip = L.Icon.extend({
//   options: {
//     iconUrl: require('../assets/paper-plane.svg'),
//     iconRetinaUrl: require('../assets/paper-plane.svg'),
//     iconAnchor: null,
//     popupAnchor: null,
//     shadowUrl: null,
//     shadowSize: null,
//     shadowAnchor: null,
//     iconSize: new L.Point(60, 75),
//     className: 'leaflet-div-icon'
//   }
// });

// export { iconShip };
import L from 'leaflet';

const iconShip = new L.Icon({
    iconUrl: require('../assets/paper-plane.svg'),
    iconRetinaUrl: require('../assets/paper-plane.svg'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon'
});

export { iconShip };