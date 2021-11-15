const bodyElement = document.querySelector('body');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorSendMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorGetMessageTemplate = document.querySelector('#errorGet').content.querySelector('.errorGet');

const addDocumentEventListners = (elementForModification) => {
  document.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape') {
      bodyElement.removeChild(elementForModification);
    }
  }, {once: true});
  document.addEventListener('click', () => {
    bodyElement.removeChild(elementForModification);
  }, {once: true});
};

const createSuccesSendDataMessage = () => {
  const successMessageElement = successMessageTemplate.cloneNode(true);
  bodyElement.appendChild(successMessageElement);
  addDocumentEventListners(successMessageElement);
};

const createErrorSendDataMessage = () => {
  const errorSendMessageElement = errorSendMessageTemplate.cloneNode(true);
  bodyElement.appendChild(errorSendMessageElement);
  const repeateButton = errorSendMessageElement.querySelector('.error__button');
  repeateButton.addEventListener('click', () => {
    bodyElement.removeChild(errorSendMessageElement);
  }, {once: true});
  addDocumentEventListners(errorSendMessageElement);
};

const createErrorGetDataMessage = () => {
  const errorGetMessageElement = errorGetMessageTemplate.cloneNode(true);
  bodyElement.appendChild(errorGetMessageElement);
  addDocumentEventListners(errorGetMessageElement);
};

export {createSuccesSendDataMessage, createErrorSendDataMessage, createErrorGetDataMessage};
