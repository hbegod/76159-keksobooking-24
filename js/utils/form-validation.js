const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_SUM = 1000000;
const MIN_PRICE_SUM_BUNGALOW = 0;
const MIN_PRICE_SUM_FLAT = 1000;
const MIN_PRICE_SUM_HOTEL = 3000;
const MIN_PRICE_SUM_HOUSE = 5000;
const MIN_PRICE_SUM_PALACE = 10000;

const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const roomNumberSelect = document.querySelector('#room_number');
const capacitySelect = document.querySelector('#capacity');
const housingTypeSelect = document.querySelector('#type');

const checkMinPrice = (price, housingTypeValue) => {
  switch(housingTypeValue) {
    case 'bungalow':
      break;
    case '':
      break;
    case '':
      break;
    case '':
      break;
    case '':
      break;
  }
  return false;
}

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

    if(checkMinPrice(priceForNight, housingTypeValue)) {
      priceInput.setCustomValidity(`Минимальная цена за ночь ${ MAX_PRICE_SUM } руб.`);
    } else if(priceForNight > MAX_PRICE_SUM) {
      priceInput.setCustomValidity(`Максимальная цена за ночь ${ MAX_PRICE_SUM } руб.`);
    }
    else {
      priceInput.setCustomValidity('');
    }
    priceInput.reportValidity();
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

    switch(housingType) {
      case 'bungalow':
        if(priceForNight < MIN_PRICE_SUM_BUNGALOW) {
          priceInput.setCustomValidity(`Минимальная цена за ночь ${ MIN_PRICE_SUM_BUNGALOW } руб.`);
        } else {
          priceInput.setCustomValidity('');
        }
        priceInput.reportValidity();
        break;
      case 'flat':
        if(priceForNight < MIN_PRICE_SUM_FLAT) {
          priceInput.setCustomValidity(`Минимальная цена за ночь ${ MIN_PRICE_SUM_FLAT } руб.`);
        } else {
          priceInput.setCustomValidity('');
        }
        priceInput.reportValidity();
        break;
      case 'hotel':
        if(priceForNight < MIN_PRICE_SUM_HOTEL) {
          priceInput.setCustomValidity(`Минимальная цена за ночь ${ MIN_PRICE_SUM_HOTEL } руб.`);
        } else {
          priceInput.setCustomValidity('');
        }
        priceInput.reportValidity();
        break;
      case 'house':
        if(priceForNight < MIN_PRICE_SUM_HOUSE) {
          priceInput.setCustomValidity(`Минимальная цена за ночь ${ MIN_PRICE_SUM_HOUSE } руб.`);
        } else {
          priceInput.setCustomValidity('');
        }
        priceInput.reportValidity();
        break;
      case 'palace':
        if(priceForNight < MIN_PRICE_SUM_PALACE) {
          priceInput.setCustomValidity(`Минимальная цена за ночь ${ MIN_PRICE_SUM_PALACE } руб.`);
        } else {
          priceInput.setCustomValidity('');
        }
        priceInput.reportValidity();
        break;
    }
  });
};

export {addValidation};

