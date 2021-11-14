import {makeSendFormActive} from './form-validation.js';
import {createSimilarAdvertismentMarkup} from './markup-generation.js';

const TOKIO_LAT = 35.689722;
const TOKIO_LNG = 139.692222;
const address = document.querySelector('#address');
const map = L.map('map-canvas');
const secondaryAddressMarkerGroup = L.layerGroup().addTo(map);
const icon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]});

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainAddressMarker = L.marker(
  {
    lat: TOKIO_LAT,
    lng: TOKIO_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const addMapToPage = () => {
  map.on('load', () => {
    makeSendFormActive();
  }).setView({
    lat: TOKIO_LAT,
    lng: TOKIO_LNG,
  }, 10);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
};

const createMainAddressMarker = () => {
  mainAddressMarker.addTo(map);
  address.value = `${TOKIO_LAT.toFixed(5)}, ${TOKIO_LNG.toFixed(5)}`;
  mainAddressMarker.on('move', (evt) => {
    const addresValue = evt.target.getLatLng();
    address.value = `${addresValue.lat.toFixed(5)}, ${addresValue.lng.toFixed(5)}`;
  });
};

const putMainAddressMarkerToDefaultPos = () => {
  mainAddressMarker.setLatLng(
    {
      lat: TOKIO_LAT,
      lng: TOKIO_LNG,
    });
};

const createSecondaryAddressMarker = (advertisment) => {
  const {lat, lng} = advertisment.location;

  const secondaryAddressMarker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  secondaryAddressMarker.addTo(secondaryAddressMarkerGroup).bindPopup(createSimilarAdvertismentMarkup(advertisment));

  secondaryAddressMarker.addTo(map);
};

const clearPopup = () => {
  map.removeLayer(secondaryAddressMarkerGroup);
  map.addLayer(secondaryAddressMarkerGroup);
};

const createSecondaryAddressMarkers = (advertismentArray) => {
  advertismentArray.forEach( (advertisment) => {
    createSecondaryAddressMarker(advertisment);
  });
};

export {addMapToPage, createMainAddressMarker, createSecondaryAddressMarker, createSecondaryAddressMarkers, putMainAddressMarkerToDefaultPos, clearPopup};
