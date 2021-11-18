import {addValidation, makePageInactive, addSubmiitListner, addClearFormListener, createFiltaration} from './utils/form-validation.js';
import { addPicturePreviewListners } from './utils/picture-interaction.js';
import {addMapToPage, createMainAddressMarker, createSecondaryAddressMarkers} from './utils/map-interaction.js';
import {getData} from './utils/server-interaction.js';
import {createSuccesSendDataMessage, createErrorSendDataMessage, createErrorGetDataMessage} from './utils/messages-generation.js';
makePageInactive();
addValidation();
addPicturePreviewListners();
addMapToPage();
createMainAddressMarker();
getData((advertisments) => {
  createSecondaryAddressMarkers(advertisments);
  createFiltaration(advertisments);
} , createErrorGetDataMessage);
addSubmiitListner(createSuccesSendDataMessage, createErrorSendDataMessage);
addClearFormListener();


