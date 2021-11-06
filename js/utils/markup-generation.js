import { safeMarkupGeneration, safeMarkupGenerationString, safeMarkupGenerationType, safeMarkupGenerationFeatures, safeMarkupGenerationPhotos, safeMarkupGenerationAvatar } from './util.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const housingTypeContainer = document.querySelector('#type');
const housingTypeList = housingTypeContainer.querySelectorAll('option');

const createSimilarAdvertismentMarkup = (advertisment) => {

  const {author, offer} = advertisment;

  const advertismentElement = cardTemplate.cloneNode(true);
  const popupTitle = advertismentElement.querySelector('.popup__title');
  const popupTextAdress = advertismentElement.querySelector('.popup__text--address');
  const popupTextPrice = advertismentElement.querySelector('.popup__text--price');
  const priceString = `${offer.price} ₽/ночь`;
  const popupType = advertismentElement.querySelector('.popup__type');
  const popupTextCapacity = advertismentElement.querySelector('.popup__text--capacity');
  const capacityString = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  const popupTextTime = advertismentElement.querySelector('.popup__text--time');
  const timeString = `Заезд после ${offer.checkin} выезд до ${offer.checkout}`;
  const popupDescripttion = advertismentElement.querySelector('.popup__description');
  const popupFeatures = advertismentElement.querySelector('.popup__features');
  const popupPhotos = advertismentElement.querySelector('.popup__photos');
  const popupAvatar = advertismentElement.querySelector('.popup__avatar');

  safeMarkupGeneration(popupTitle, offer.title);
  safeMarkupGeneration(popupTextAdress, offer.address);
  safeMarkupGeneration(popupTextPrice, offer.price, priceString);
  safeMarkupGenerationString(popupTextCapacity, capacityString, offer.rooms, offer.guests);
  safeMarkupGenerationString(popupTextTime, timeString, offer.checkin, offer.checkout);
  safeMarkupGeneration(popupDescripttion, offer.description);
  safeMarkupGenerationType(popupType, offer.type, housingTypeList);
  safeMarkupGenerationFeatures(popupFeatures, offer.features);
  safeMarkupGenerationPhotos(popupPhotos, offer.photos);
  safeMarkupGenerationAvatar(popupAvatar, author.avatar);

  return advertismentElement;
};

export{createSimilarAdvertismentMarkup};
