// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

function getRandomPositiveFloat (a, b, digits = 1) {
  // Чтобы не заставлять пользователя нашей функции помнить порядок аргументов,
  // реализуем поддержку передачи минимального и максимального значения в любом порядке,
  // а какое из них большее и меньшее вычислим с помощью Math.min и Math.max
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  // Обратите внимание, чтобы учесть условие, что диапазон может быть [0, ∞),
  // мы не ругаем пользователя за переданное отрицательное число,
  // а просто берём его по модулю с помощью Math.abs

  // Дальше используем Math.random() для получения случайного дробного числа в диапазоне [0, 1),
  // которое домножаем на разницу между переданными числами - это будет наша случайная дельта.
  // После нужно сложить дельту с минимальным значением, чтобы получить итоговое случайное число.
  const result = Math.random() * (upper - lower) + lower;

  // И в конце с помощью метода toFixed любого числа в JavaScript
  // указать требуемое количество знаков после точки
  return result.toFixed(digits);
}

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

function getRandomPositiveInteger (a, b) {
  // Чтобы не заставлять пользователя нашей функции помнить порядок аргументов,
  // реализуем поддержку передачи минимального и максимального значения в любом порядке,
  // а какое из них большее и меньшее вычислим с помощью Math.min и Math.max.

  // После нам нужно убедиться, что пользователь не передал дробные значения,
  // для этого на всякий пожарный случай нижнюю границу диапазона
  // мы округляем к ближайшему большему целому с помощью Math.ceil,
  // а верхнюю границу - к ближайшему меньшему целому с помощью Math.floor
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  // Обратите внимание, чтобы учесть условие, что диапазон может быть [0, ∞),
  // мы не ругаем пользователя за переданное отрицательное число,
  // а просто берём его по модулю с помощью Math.abs

  // Дальше используем Math.random() для получения случайного дробного числа в диапазоне [0, 1),
  // которое домножаем на разницу между переданными числами плюс единица - это будет наша случайная дельта.
  // После нужно сложить дельту с минимальным значением, чтобы получить итоговое случайное число.
  const result = Math.random() * (upper - lower + 1) + lower;
  // "Плюс единица", чтобы включить верхнюю границу диапазона в случайные числа

  // И в конце с помощью метода Math.floor мы округляем полученный результат,
  // потому что Math.random() генерирует только дробные числа и ноль.
  return Math.floor(result);
}

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const createRandomArray = (arrayForGeneration, numberOfElementsInArray) => {
  const randArrayElementGenerator = () => getRandomArrayElement(arrayForGeneration);
  return Array.from({length: numberOfElementsInArray}, randArrayElementGenerator);
};

const createRandomArrayUnic = (arrayForGeneration, numberOfElementsInArray) => {
  const randomUnicArray = arrayForGeneration.slice();
  while(randomUnicArray.length > numberOfElementsInArray && randomUnicArray.length > 1){
    randomUnicArray.splice(getRandomPositiveInteger(0, randomUnicArray.length), 1);
  }
  return randomUnicArray;
};

const safeMarkupGeneration = (marckupBlock, objectForCheck, textString = null) => {
  if(!objectForCheck){
    marckupBlock.style.display = 'none';
  }
  else{
    if(!textString){
      marckupBlock.textContent = objectForCheck;
    }
    else{
      marckupBlock.textContent = textString;
    }
  }
};

const safeMarkupGenerationString = (marckupBlock, marckupString, ...values) => {
  let emptinesFlag = false;
  for(let i = 0; i < values.length - 1; i++){
    if(!values[i]){
      emptinesFlag = true;
      break;
    }
  }
  if(emptinesFlag){
    marckupBlock.style.display = 'none';
  }
  else{
    marckupBlock.textContent = marckupString;
  }
};

const safeMarkupGenerationType = (marckupBlock, objectForCheck, typeList) => {
  if(!objectForCheck){
    marckupBlock.style.display = 'none';
  }
  else{
    typeList.forEach( (housingType) => {
      const housingTypeValue = housingType.value;
      if(housingTypeValue === objectForCheck) {
        marckupBlock.textContent = housingType.textContent;
      }
    });
  }
};

const safeMarkupGenerationFeatures = (marckupBlock, objectForCheck) => {
  if(!objectForCheck){
    marckupBlock.style.display = 'none';
  }
  else{
    const featuresList = marckupBlock.querySelectorAll('.popup__feature');
    const modifers = objectForCheck.map( (feature) => `popup__feature--${feature}`);
    featuresList.forEach( (featuresListItem) => {
      const modifer = featuresListItem.classList[1];
      if(!modifers.includes(modifer)){
        featuresListItem.remove();
      }
    });
  }
};

const safeMarkupGenerationPhotos = (marckupBlock, objectForCheck) => {
  if(!objectForCheck){
    marckupBlock.style.display = 'none';
  }
  else{
    const photosListFragment = document.createDocumentFragment();
    const photoElement = marckupBlock.querySelector('.popup__photo');
    objectForCheck.forEach( (photoSrc) => {
      const photo = photoElement.cloneNode(true);
      photo.src = photoSrc;
      photosListFragment.appendChild(photo);
    });
    photoElement.remove();
    marckupBlock.appendChild(photosListFragment);
  }
};

const safeMarkupGenerationAvatar = (marckupBlock, objectForCheck) => {
  if(!objectForCheck){
    marckupBlock.style.display = 'none';
  }
  else{
    marckupBlock.src = objectForCheck;
  }
};

export{getRandomPositiveFloat, getRandomPositiveInteger, getRandomArrayElement, createRandomArray, createRandomArrayUnic, safeMarkupGeneration, safeMarkupGenerationString, safeMarkupGenerationType, safeMarkupGenerationFeatures, safeMarkupGenerationPhotos, safeMarkupGenerationAvatar };
