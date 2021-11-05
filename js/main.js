import {addValidation, makePageInactive} from './utils/form-validation.js';
import {addMapToPage, createMainAddressMarker, createSecondaryAddressMarkers} from './utils/map-interaction.js';
import {createAdvertisements} from './data.js';
makePageInactive();
addValidation();
addMapToPage();
createMainAddressMarker();
createSecondaryAddressMarkers(createAdvertisements());


