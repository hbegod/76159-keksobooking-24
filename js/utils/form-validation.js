import {putMainAddressMarkerToDefaultPos, createSecondaryAddressMarkers} from './map-interaction.js';
import {clearPreview} from './picture-interaction.js';
import { sendData } from './server-interaction.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_SUM = 1000000;
const MIN_PRICE_SUM_BUNGALOW = 0;
const MIN_PRICE_SUM_FLAT = 1000;
const MIN_PRICE_SUM_HOTEL = 3000;
const MIN_PRICE_SUM_HOUSE = 5000;
const MIN_PRICE_SUM_PALACE = 10000;
const MIN_PRICE_SUM_FILTER = 10000;
const MAX_PRICE_SUM_FILTER = 50000;

const addAdvertForm = document.querySelector('.ad-form');
const titleInput = addAdvertForm.querySelector('#title');
const priceInput = addAdvertForm.querySelector('#price');
const roomNumberSelect = addAdvertForm.querySelector('#room_number');
const capacitySelect = addAdvertForm.querySelector('#capacity');
const housingTypeSelect = addAdvertForm.querySelector('#type');
const timeInSelect = addAdvertForm.querySelector('#timein');
const timeOutSelect = addAdvertForm.querySelector('#timeout');
const clearFormButton = addAdvertForm.querySelector('.ad-form__reset');
const mapFiltersForm = document.querySelector('.map__filters');


const makePageInactive = () => {
  addAdvertForm.classList.add('ad-form--disabled');
  mapFiltersForm.classList.add('map__filters--disabled');
};

const makeSendFormActive = () => {
  addAdvertForm.classList.remove('ad-form--disabled');
};

const makeFilterFormActive = () => {
  mapFiltersForm.classList.remove('map__filters--disabled');
};

const checkMinPrice = (price, housingTypeValue, changePlaceholder) => {
  switch(housingTypeValue) {
    case 'bungalow':
      if(changePlaceholder) {
        priceInput.placeholder = MIN_PRICE_SUM_BUNGALOW;
      }
      if(price < MIN_PRICE_SUM_BUNGALOW) {
        priceInput.setCustomValidity(`Минимальная цена за ночь ${ MIN_PRICE_SUM_BUNGALOW } руб.`);
        return true;
      } else {
        return false;
      }
    case 'flat':
      if(changePlaceholder) {
        priceInput.placeholder = MIN_PRICE_SUM_FLAT;
      }
      if(price < MIN_PRICE_SUM_FLAT) {
        priceInput.setCustomValidity(`Минимальная цена за ночь ${ MIN_PRICE_SUM_FLAT } руб.`);
        return true;
      } else {
        return false;
      }
    case 'hotel':
      if(changePlaceholder) {
        priceInput.placeholder = MIN_PRICE_SUM_HOTEL;
      }
      if(price < MIN_PRICE_SUM_HOTEL) {
        priceInput.setCustomValidity(`Минимальная цена за ночь ${ MIN_PRICE_SUM_HOTEL } руб.`);
        return true;
      } else {
        return false;
      }
    case 'house':
      if(changePlaceholder) {
        priceInput.placeholder = MIN_PRICE_SUM_HOUSE;
      }
      if(price < MIN_PRICE_SUM_HOUSE) {
        priceInput.setCustomValidity(`Минимальная цена за ночь ${ MIN_PRICE_SUM_HOUSE } руб.`);
        return true;
      } else {
        return false;
      }
    case 'palace':
      if(changePlaceholder) {
        priceInput.placeholder = MIN_PRICE_SUM_PALACE;
      }
      if(price < MIN_PRICE_SUM_PALACE) {
        priceInput.setCustomValidity(`Минимальная цена за ночь ${ MIN_PRICE_SUM_PALACE } руб.`);
        return true;
      } else {
        return false;
      }
  }
};

const addValidation = () => {
  titleInput.addEventListener('input', (evt) => {

    const titleLength = evt.target.value.length;

    if (titleLength < MIN_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Ещё ${ MIN_TITLE_LENGTH - titleLength } симв.`);
    } else if (titleLength > MAX_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Удалите лишние ${ titleLength - MAX_TITLE_LENGTH } симв.`);
    } else {
      titleInput.setCustomValidity('');
    }
    titleInput.reportValidity();
  });

  priceInput.addEventListener('input', (evt) => {

    const priceForNight = evt.target.value;
    const housingTypeValue = housingTypeSelect.value;

    if(checkMinPrice(priceForNight, housingTypeValue, false)) {
      priceInput.reportValidity();
    } else if(priceForNight > MAX_PRICE_SUM) {
      priceInput.setCustomValidity(`Максимальная цена за ночь ${ MAX_PRICE_SUM } руб.`);
      priceInput.reportValidity();
    }
    else {
      priceInput.setCustomValidity('');
      priceInput.reportValidity();
    }
  });

  roomNumberSelect.addEventListener('input', (evt) => {

    const roomNumber = evt.target.value;
    const capacity = capacitySelect.value;

    switch(roomNumber) {
      case '1':
        if(capacity === '1') {
          capacitySelect.setCustomValidity('');
        }
        else {
          capacitySelect.setCustomValidity('Количество мест для 1 гостя');
        }
        capacitySelect.reportValidity();
        break;
      case '2':
        if(capacity === '1' || capacity === '2') {
          capacitySelect.setCustomValidity('');
        }
        else {
          capacitySelect.setCustomValidity('Количество мест для 2 или 1 гостя');
        }
        capacitySelect.reportValidity();
        break;
      case '3':
        if(capacity === '1' || capacity === '2' || capacity === '3') {
          capacitySelect.setCustomValidity('');
        }
        else {
          capacitySelect.setCustomValidity('Количество мест для 3, 2 или 1 гостя');
        }
        capacitySelect.reportValidity();
        break;
      case '100':
        if(capacity === '0') {
          capacitySelect.setCustomValidity('');
        } else {
          capacitySelect.setCustomValidity('Должна быть выбрана опция "Не для гостей"');
        }
        capacitySelect.reportValidity();
        break;
    }
  });

  capacitySelect.addEventListener('input', (evt) => {

    const capacity = evt.target.value;
    const roomNumber = roomNumberSelect.value;

    switch(capacity) {
      case '1':
        if(roomNumber === '1') {
          capacitySelect.setCustomValidity('');
        } else if(roomNumber === '2') {
          capacitySelect.setCustomValidity('');
        } else if(roomNumber === '3') {
          capacitySelect.setCustomValidity('');
        }
        else {
          capacitySelect.setCustomValidity('Должна быть выбрана опция "Не для гостей"');
        }
        capacitySelect.reportValidity();
        break;
      case '2':
        if(roomNumber === '1') {
          capacitySelect.setCustomValidity('Количество мест для 1 гостя');
        } else if(roomNumber === '2') {
          capacitySelect.setCustomValidity('');
        } else if(roomNumber === '3') {
          capacitySelect.setCustomValidity('');
        } else {
          capacitySelect.setCustomValidity('Должна быть выбрана опция "Не для гостей"');
        }
        capacitySelect.reportValidity();
        break;
      case '3':
        if(roomNumber === '1') {
          capacitySelect.setCustomValidity('Количество мест для 1 гостя');
        } else if(roomNumber === '2') {
          capacitySelect.setCustomValidity('Количество мест для 2 или 1 гостя');
        } else if(roomNumber === '3') {
          capacitySelect.setCustomValidity('');
        } else {
          capacitySelect.setCustomValidity('Должна быть выбрана опция "Не для гостей"');
        }
        capacitySelect.reportValidity();
        break;
      case '0':
        if(roomNumber === '1') {
          capacitySelect.setCustomValidity('Количество мест для 1 гостя');
        } else if(roomNumber === '2') {
          capacitySelect.setCustomValidity('Количество мест для 2 или 1 гостя');
        } else if(roomNumber === '3') {
          capacitySelect.setCustomValidity('Количество мест для 3, 2 или 1 гостя');
        } else {
          capacitySelect.setCustomValidity('');
        }
        capacitySelect.reportValidity();
        break;
    }
  });

  housingTypeSelect.addEventListener('input', (evt) => {

    const housingType = evt.target.value;
    const priceForNight = priceInput.value;

    if(checkMinPrice(priceForNight, housingType, true)) {
      priceInput.reportValidity();
    } else {
      priceInput.setCustomValidity('');
      priceInput.reportValidity();
    }
  });

  timeInSelect.addEventListener('input', (evt) => {
    const timeInValue = evt.target.value;
    timeOutSelect.value = timeInValue;
  });

  timeOutSelect.addEventListener('input', (evt) => {
    const timeOutValue = evt.target.value;
    timeInSelect.value = timeOutValue;
  });
};

let housingTypeFilterValue = 'any';
let housingPriceFilterValue = 'any';
let housingRoomsFilterValue = 'any';
let housingGuestsFilterValue = 'any';
let housingFeaturesFilterArray = [];

const resetFilters = () => {
  housingTypeFilterValue = 'any';
  housingPriceFilterValue = 'any';
  housingRoomsFilterValue = 'any';
  housingGuestsFilterValue = 'any';
  housingFeaturesFilterArray = [];
  const event = new Event('change');
  mapFiltersForm.dispatchEvent(event);
};

const clearFormData = () => {
  addAdvertForm.reset();
  priceInput.placeholder = MIN_PRICE_SUM_HOUSE;
  mapFiltersForm.reset();
  clearPreview();
  putMainAddressMarkerToDefaultPos();
  resetFilters();
};

const addSubmiitListner = (onSuccess, onError) => {
  addAdvertForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => onError(),
      new FormData(evt.target),
    );
  });
};

const addClearFormListener = () => {
  clearFormButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    clearFormData();
  });

};

const filterByType = (advertisment) => {
  if(housingTypeFilterValue === 'any') {
    return true;
  }
  else {
    return advertisment.offer.type === housingTypeFilterValue;
  }
};

const filterByPrice = (advertisment) => {
  switch(housingPriceFilterValue){
    case 'any':
      return true;
    case 'middle':
      return advertisment.offer.price >= MIN_PRICE_SUM_FILTER && advertisment.offer.price <= MAX_PRICE_SUM_FILTER;
    case 'low':
      return advertisment.offer.price < MIN_PRICE_SUM_FILTER;
    case 'high':
      return advertisment.offer.price > MAX_PRICE_SUM_FILTER;
  }
};

const filterByRooms = (advertisment) => {
  if(housingRoomsFilterValue === 'any') {
    return true;
  }
  else {
    return advertisment.offer.rooms === +housingRoomsFilterValue;
  }

};

const filterByGuests = (advertisment) => {
  if(housingGuestsFilterValue === 'any') {
    return true;
  }
  else {
    return advertisment.offer.guests === +housingGuestsFilterValue;
  }
};

const modifyFeaturesArray = (featureType, isChecked) => {
  if(isChecked) {
    housingFeaturesFilterArray.push(featureType);
  }
  else {
    housingFeaturesFilterArray = housingFeaturesFilterArray.filter((feature) => !(feature === featureType));
  }
};

const filterByFeatures = (advertisment) => {
  if(!advertisment.offer.features) {
    return true;
  }
  for (let i = 0; i < housingFeaturesFilterArray.length; i++) {
    if(!advertisment.offer.features.includes(housingFeaturesFilterArray[i])) {
      return false;
    }
  }
  return true;
};

const filterAdvertisments = (advertisment) => filterByType(advertisment) && filterByPrice(advertisment) && filterByRooms(advertisment) && filterByGuests(advertisment) && filterByFeatures(advertisment);


const createFiltaration = (advertisments) => {
  mapFiltersForm.addEventListener('change', (evt) => {
    evt.preventDefault();
    const filterTypeId = evt.target.id;
    switch(filterTypeId){
      case 'housing-type':
        housingTypeFilterValue = evt.target.value;
        break;
      case 'housing-price':
        housingPriceFilterValue = evt.target.value;
        break;
      case 'housing-rooms':
        housingRoomsFilterValue = evt.target.value;
        break;
      case 'housing-guests':
        housingGuestsFilterValue = evt.target.value;
        break;
      case '':
        break;
      default :
        modifyFeaturesArray(evt.target.value, evt.target.checked);
        break;


    }
    const resultArray = advertisments
      .filter(filterAdvertisments);

    createSecondaryAddressMarkers(resultArray);
  });
};

export {addValidation, makePageInactive, makeSendFormActive, makeFilterFormActive, clearFormData, addSubmiitListner, addClearFormListener, createFiltaration};
