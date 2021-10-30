const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_SUM = 1000000;

const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const roomNumberSelect = document.querySelector('#room_number');
const capacitySelect = document.querySelector('#capacity');

const addValidation = () => {
  titleInput.addEventListener('input', () => {

    const titleLength = titleInput.value.length;

    if (titleLength < MIN_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Ещё ${ MIN_TITLE_LENGTH - titleLength } симв.`);
    } else if (titleLength > MAX_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Удалите лишние ${ titleLength - MAX_TITLE_LENGTH } симв.`);
    } else {
      titleInput.setCustomValidity('');
    }
    titleInput.reportValidity();
  });

  priceInput.addEventListener('input', () => {

    const priceForNight = priceInput.value;

    if(priceForNight > MAX_PRICE_SUM) {
      priceInput.setCustomValidity(`Максимальная цена за ночь ${ MAX_PRICE_SUM } руб.`);
    }
    else {
      priceInput.setCustomValidity('');
    }
    priceInput.reportValidity();
  });

  roomNumberSelect.addEventListener('input', () => {

    switch(roomNumberSelect.value) {
      case '1':
        if(capacitySelect.value === '1') {
          capacitySelect.setCustomValidity('');
        }
        else {
          capacitySelect.setCustomValidity('Количество мест для 1 гостя');
        }
        capacitySelect.reportValidity();
        break;
      case '2':
        if(capacitySelect.value === '1' || capacitySelect.value === '2') {
          capacitySelect.setCustomValidity('');
        }
        else {
          capacitySelect.setCustomValidity('Количество мест для 2 или 1 гостя');
        }
        capacitySelect.reportValidity();
        break;
      case '3':
        if(capacitySelect.value === '1' || capacitySelect.value === '2' || capacitySelect.value === '3') {
          capacitySelect.setCustomValidity('');
        }
        else {
          capacitySelect.setCustomValidity('Количество мест для 3, 2 или 1 гостя');
        }
        capacitySelect.reportValidity();
        break;
      case '100':
        if(capacitySelect.value === '0') {
          capacitySelect.setCustomValidity('');
        } else {
          capacitySelect.setCustomValidity('Должна быть выбрана опция "Не для гостей"');
        }
        capacitySelect.reportValidity();
        break;
    }
  });

  capacitySelect.addEventListener('input', () => {

    switch(capacitySelect.value) {
      case '1':
        if(roomNumberSelect.value === '1') {
          capacitySelect.setCustomValidity('');
        } else if(roomNumberSelect.value === '2') {
          capacitySelect.setCustomValidity('');
        } else if(roomNumberSelect.value === '3') {
          capacitySelect.setCustomValidity('');
        }
        else {
          capacitySelect.setCustomValidity('Должна быть выбрана опция "Не для гостей"');
        }
        capacitySelect.reportValidity();
        break;
      case '2':
        if(roomNumberSelect.value === '1') {
          capacitySelect.setCustomValidity('Количество мест для 1 гостя');
        } else if(roomNumberSelect.value === '2') {
          capacitySelect.setCustomValidity('');
        } else if(roomNumberSelect.value === '3') {
          capacitySelect.setCustomValidity('');
        } else {
          capacitySelect.setCustomValidity('Должна быть выбрана опция "Не для гостей"');
        }
        capacitySelect.reportValidity();
        break;
      case '3':
        if(roomNumberSelect.value === '1') {
          capacitySelect.setCustomValidity('Количество мест для 1 гостя');
        } else if(roomNumberSelect.value === '2') {
          capacitySelect.setCustomValidity('Количество мест для 2 или 1 гостя');
        } else if(roomNumberSelect.value === '3') {
          capacitySelect.setCustomValidity('');
        } else {
          capacitySelect.setCustomValidity('Должна быть выбрана опция "Не для гостей"');
        }
        capacitySelect.reportValidity();
        break;
      case '0':
        if(roomNumberSelect.value === '1') {
          capacitySelect.setCustomValidity('Количество мест для 1 гостя');
        } else if(roomNumberSelect.value === '2') {
          capacitySelect.setCustomValidity('Количество мест для 2 или 1 гостя');
        } else if(roomNumberSelect.value === '3') {
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
