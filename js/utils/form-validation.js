import {putMainAddressMarkerToDefaultPos, clearPopup} from './map-interaction.js';
import { sendData } from './server-interaction.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_SUM = 1000000;
const MIN_PRICE_SUM_BUNGALOW = 0;
const MIN_PRICE_SUM_FLAT = 1000;
const MIN_PRICE_SUM_HOTEL = 3000;
const MIN_PRICE_SUM_HOUSE = 5000;
const MIN_PRICE_SUM_PALACE = 10000;

const addAdvertForm = document.querySelector('.ad-form');
const titleInput = addAdvertForm.querySelector('#title');
const priceInput = addAdvertForm.querySelector('#price');
const roomNumberSelect = addAdvertForm.querySelector('#room_number');
const descriptionTextArea = addAdvertForm.querySelector('#description');
const capacitySelect = addAdvertForm.querySelector('#capacity');
const housingTypeSelect = addAdvertForm.querySelector('#type');
const timeInSelect = addAdvertForm.querySelector('#timein');
const timeOutSelect = addAdvertForm.querySelector('#timeout');
const addAdvertFormHeader = addAdvertForm.querySelector('.ad-form-header');
const addAdvertFormElements = addAdvertForm.querySelectorAll('.ad-form__element');
const addAdvertFormCheckBox = addAdvertForm.querySelectorAll('.features__checkbox');
const clearFormButton = addAdvertForm.querySelector('.ad-form__reset');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormFeatures = mapFiltersForm.querySelector('.map__features');
const mapFiltersFormElements = mapFiltersForm.querySelectorAll('.map__filter');


const makePageInactive = () => {
  addAdvertForm.classList.add('ad-form--disabled');
  addAdvertFormHeader.setAttribute('disabled', 'disabled');
  addAdvertFormElements.forEach( (element) => {
    element.setAttribute('disabled', 'disabled');
  });
  mapFiltersForm.classList.add('map__filters--disabled');
  mapFiltersFormFeatures.setAttribute('disabled', 'disabled');
  mapFiltersFormElements.forEach( (element) => {
    element.setAttribute('disabled', 'disabled');
  });

};

const makeSendFormActive = () => {
  addAdvertForm.classList.remove('ad-form--disabled');
  addAdvertFormHeader.removeAttribute('disabled');
  addAdvertFormElements.forEach( (element) => {
    element.removeAttribute('disabled');
  });
};

const makeFilterFormActive = () => {
  mapFiltersForm.classList.remove('map__filters--disabled');
  mapFiltersFormFeatures.removeAttribute('disabled');
  mapFiltersFormElements.forEach( (element) => {
    element.removeAttribute('disabled');
  });
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

const clearFormData = () => {
  titleInput.value = '';
  priceInput.value = '';
  addAdvertFormCheckBox.forEach( (checkbox) => {
    checkbox.checked = false;
  });
  descriptionTextArea.value = '';
  housingTypeSelect.selectedIndex = 3;
  const event = new Event('input');
  housingTypeSelect.dispatchEvent(event);
  timeInSelect.selectedIndex = 0;
  timeOutSelect.selectedIndex = 0;
  roomNumberSelect.selectedIndex = 0;
  capacitySelect.selectedIndex = 2;
  putMainAddressMarkerToDefaultPos();
  clearPopup();
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


export {addValidation, makePageInactive, makeSendFormActive, makeFilterFormActive, clearFormData, addSubmiitListner, addClearFormListener};
