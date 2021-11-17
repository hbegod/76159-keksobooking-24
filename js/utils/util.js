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

export{safeMarkupGeneration, safeMarkupGenerationString, safeMarkupGenerationType, safeMarkupGenerationFeatures, safeMarkupGenerationPhotos, safeMarkupGenerationAvatar };
