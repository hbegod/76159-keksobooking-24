
//Пример взят сайта MDN https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomIntegerNumber(rangeMinNumber, rangeMaxNumber){
  rangeMinNumber = Math.ceil(rangeMinNumber);
  rangeMaxNumber = Math.floor(rangeMaxNumber);
  const rand = Math.random();
  return Math.floor(rand * (rangeMaxNumber - rangeMinNumber + 1)) + rangeMinNumber;
}

getRandomIntegerNumber(1,6);


function getRandomFloatNumber(rangeMinNumber, rangeMaxNumber, numberOfDigtsAfterPoint){
  const randomNumber = Math.random() * (rangeMaxNumber - rangeMinNumber) + rangeMinNumber;
  return randomNumber.toFixed(numberOfDigtsAfterPoint);
}

getRandomFloatNumber(10.0342, 0.1234, 4);

