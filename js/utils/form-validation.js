const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_SUM = 1000000;

const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const roomNumberSelect = document.querySelector('#room_number');
const capacitySelect = document.querySelector('#capacity');

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

    if(priceForNight > MAX_PRICE_SUM) {
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
};

export {addValidation};
