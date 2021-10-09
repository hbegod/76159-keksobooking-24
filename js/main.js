//Импорт функций из js/utils
import { getRandomPositiveInteger } from './utils/get-random-positive-integer.js';
import { getRandomPositiveFloat } from './utils/get-random-positive-float.js';

const TITLE = [
  'Прекрасная квартира для путешественника',
  'Замечательный дом для семейной пары с детьми',
  'Студия для угрюмого интроверта',
  'Котедж с басейном для веселой компании друзей',
  'Нора для господина с черезвычайно волосатыми ногами',
];

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIME_FOR_CHECIKN_AND_CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTION = [
  'Номер класса «комфорт» в новом комплексе VALO Hotel City. Через дорогу от метро Бухарестская и 10 минутах езды от транспортной развязки. До аэропорта 25 минут и до Московского вокзала 15 минут на такси.',
  'Просторный двухместный номер площадью 24 кв. м. Панорамные окна с живописным видом днем и шторы блэк аут (полностью затемняют номер) ночью. Широкая двуспальная кровать или две отдельных кровати на выбор.',
  'Есть вся бытовая техника – от фена до стиральной машины. Встроенная кухня с посудой, кухонными принадлежностями и посудомоечной машиной. Ванная комната с немецкой сантехникой. Завтрак с доставкой в номер.',
  'Капсула в современном капсульном отеле на крыше исторического здания. Прекрасный вид из окна и удобная гостиная включена в стоимость). Находится в двух минутах пешком от Невского проспекта и Ст Метро Гостиный двор.',
  'Уютная комната в гостевом доме «Гервардт» на набережной реки Фонтанки. В номере есть всё необходимое. Холодильник, микроволновка, телевизор, шкаф, вешалки, свежие полотенца для тела и рук, тапочки, шампунь, гель.',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const STRING_FOR_AVATAR_URL = 'img/avatars/user{{xx}}.png';

const SIMILAR_ADVERTISEMENTS_COUNT = 10;

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];


const createRandomArray = (arrayForGeneration, numberOfElementsInArray) => {
  const randArrayElementGenerator = () => getRandomArrayElement(arrayForGeneration);
  return Array.from({length:numberOfElementsInArray}, randArrayElementGenerator);
};

const createRandomArrayUnic = (arrayForGeneration, numberOfElementsInArray) =>{
  let randomUnicArray = arrayForGeneration.slice();
  while(randomUnicArray.length > numberOfElementsInArray && randomUnicArray.length > 1)
  {
    randomUnicArray.splice(getRandomPositiveInteger(0,randomUnicArray.length),1);
  }
  return randomUnicArray;
};

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomPositiveInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomPositiveInteger(min, max);
    }
    previousValues.push(currentValue);

    return STRING_FOR_AVATAR_URL.replace('{{xx}}', currentValue.toString().padStart(2,'0'));
  };
}

const generateAuthorAvatar = createRandomIdFromRangeGenerator(1,10);

const createAdvertisement = () => {
  const location = {
    lat: getRandomPositiveFloat(35.65000,35.70000,5),
    lng: getRandomPositiveFloat(139.70000,139.80000,5),
  };
  return {
    author: {
      avatar: generateAuthorAvatar(),
    },
    offer: {
      title: getRandomArrayElement(TITLE),
      address: Object.values(location).join(', '),
      price: getRandomPositiveInteger(5000,20000),
      type: getRandomArrayElement(TYPE),
      rooms: getRandomPositiveInteger(1,4),
      guests: getRandomPositiveInteger(1,4),
      checkin: getRandomArrayElement(TIME_FOR_CHECIKN_AND_CHECKOUT),
      checkout: getRandomArrayElement(TIME_FOR_CHECIKN_AND_CHECKOUT),
      features: createRandomArrayUnic(FEATURES,getRandomPositiveInteger(1,6)),
      description: getRandomArrayElement(DESCRIPTION),
      photos: createRandomArray(PHOTOS, getRandomPositiveInteger(1,6)),
    },
    location:{
      lat: location.lat,
      lng: location.lng,
    },
  };
};

const similarAdvertisements = Array.from({length:SIMILAR_ADVERTISEMENTS_COUNT}, createAdvertisement);

console.log(similarAdvertisements);
console.log('');
