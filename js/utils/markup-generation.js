import { createAdvertisements } from '../data.js';

const blockForTemplateTest = document.querySelector('.map__canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarAdvertisements = createAdvertisements();
const advertismentFragment = document.createDocumentFragment();
const housingTypeContainer = document.querySelector('#type');
const housingTypeList = housingTypeContainer.querySelectorAll('option');

similarAdvertisements.forEach( ({author, offer}) => {
  const advertismentElement = cardTemplate.cloneNode(true);

  if(offer.title === null){
    advertismentElement.querySelector('.popup__title').style.display = 'none';
  }
  else{
    advertismentElement.querySelector('.popup__title').textContent = offer.title;
  }

  if(offer.address === null){
    advertismentElement.querySelector('.popup__text--address').style.display = 'none';
  }
  else{
    advertismentElement.querySelector('.popup__text--address').textContent = offer.address;
  }

  if(offer.price === null){
    advertismentElement.querySelector('.popup__text--price').style.display = 'none';
  }
  else{
    advertismentElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  }

  if(offer.type === null){
    advertismentElement.querySelector('.popup__type').style.display = 'none';
  }
  else{
    housingTypeList.forEach( (housingType) => {
      const housingTypeValue = housingType.value;
      if(housingTypeValue === offer.type) {
        advertismentElement.querySelector('.popup__type').textContent = housingType.textContent;
      }
    });
  }

  if(offer.rooms === null || offer.guests === null){
    advertismentElement.querySelector('.popup__text--capacity').style.display = 'none';
  }
  else{
    advertismentElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  }

  if(offer.checkin === null || offer.checkout === null){
    advertismentElement.querySelector('.popup__text--time').style.display = 'none';
  }
  else{
    advertismentElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin} выезд до ${offer.checkout}`;
  }

  if(offer.features === null){
    advertismentElement.querySelector('.popup__features').style.display = 'none';
  }
  else{
    const featureContainer = advertismentElement.querySelector('.popup__features');
    const featuresList = featureContainer.querySelectorAll('.popup__feature');
    const modifers = offer.features.map( (feature) => `popup__feature--${feature}`);
    featuresList.forEach( (featuresListItem) => {
      const modifer = featuresListItem.classList[1];
      if(!modifers.includes(modifer)){
        featuresListItem.remove();
      }
    });
  }

  if(offer.description === null){
    advertismentElement.querySelector('.popup__description').style.display = 'none';
  }
  else{
    advertismentElement.querySelector('.popup__description').textContent = offer.description;
  }

  if(offer.photos === null){
    advertismentElement.querySelector('.popup__photos').style.display = 'none';
  }
  else{
    const blockForPhotos = advertismentElement.querySelector('.popup__photos');
    const photosListFragment = document.createDocumentFragment();
    const photoElement = advertismentElement.querySelector('.popup__photo');
    offer.photos.forEach( (photoSrc) => {
      const photo = photoElement.cloneNode(true);
      photo.src = photoSrc;
      photosListFragment.appendChild(photo);
    });
    photoElement.remove();
    blockForPhotos.appendChild(photosListFragment);
  }

  if(author.avatar === null){
    advertismentElement.querySelector('.popup__avatar').style.display = 'none';
  }
  else{
    advertismentElement.querySelector('.popup__avatar').src = author.avatar;
  }

  advertismentFragment.appendChild(advertismentElement);
});

const writeBlockForTemplateTest = () => blockForTemplateTest.appendChild(advertismentFragment.firstChild);

export{writeBlockForTemplateTest};
