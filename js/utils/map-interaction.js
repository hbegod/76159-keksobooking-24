import {makeSendFormActive} from './form-validation.js';
import {createSimilarAdvertismentMarkup} from './markup-generation.js';
import { debounce } from './debounce.js';

const TOKIO_LAT = 35.689722;
const TOKIO_LNG = 139.692222;
const MAIN_PIN_ICON_SIZE_W = 52;
const MAIN_PIN_ICON_SIZE_L = 52;
const MAIN_PIN_ANCHOR_SIZE_W = 26;
const MAIN_PIN_ANCHOR_SIZE_L = 52;
const SECONDARY_PIN_ICON_SIZE_W = 40;
const SECONDARY_PIN_ICON_SIZE_L = 40;
const SECONDARY_PIN_ANCHOR_SIZE_W = 20;
const SECONDARY_PIN_ANCHOR_SIZE_L = 40;
const MAX_ADVERTISMENT_PINS_ON_MAP = 10;

const address = document.querySelector('#address');
const map = L.map('map-canvas');
const secondaryAddressMarkerGroup = L.layerGroup().addTo(map);

const icon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [SECONDARY_PIN_ICON_SIZE_W, SECONDARY_PIN_ICON_SIZE_L],
  iconAnchor: [SECONDARY_PIN_ANCHOR_SIZE_W, SECONDARY_PIN_ANCHOR_SIZE_L]});

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [MAIN_PIN_ICON_SIZE_W, MAIN_PIN_ICON_SIZE_L],
  iconAnchor: [MAIN_PIN_ANCHOR_SIZE_W, MAIN_PIN_ANCHOR_SIZE_L],
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

};

const clearPopup = () => {
  map.removeLayer(secondaryAddressMarkerGroup);
  map.addLayer(secondaryAddressMarkerGroup);
};

const createSecondaryAddressMarkers = (advertismentArray) => {
  secondaryAddressMarkerGroup.remove();
  secondaryAddressMarkerGroup.clearLayers();
  const slicedArray = advertismentArray.slice(0, MAX_ADVERTISMENT_PINS_ON_MAP);
  slicedArray.forEach( (advertisment) => {
    createSecondaryAddressMarker(advertisment);
  });
  debounce(secondaryAddressMarkerGroup.addTo(map));
};

export {addMapToPage, createMainAddressMarker, createSecondaryAddressMarker, createSecondaryAddressMarkers, putMainAddressMarkerToDefaultPos, clearPopup};
