const bodyElement = document.querySelector('body');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorSendMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorGetMessageTemplate = document.querySelector('#errorGet').content.querySelector('.errorGet');

const addEventListners = (elementForModification) => {

  const repeateButton = elementForModification.querySelector('.error__button');

  function clickButtonEventReact () {
    document.removeEventListener('keydown', escEventReact);
    document.removeEventListener('click', clickDocEventReact);
    bodyElement.removeChild(elementForModification);
  }

  function escEventReact (evt) {
    if(evt.key === 'Escape') {
      document.removeEventListener('click', clickDocEventReact);
      if(repeateButton) {
        repeateButton.removeEventListener('click', clickButtonEventReact);
      }
      bodyElement.removeChild(elementForModification);
    }
  }

  function clickDocEventReact () {
    document.removeEventListener('keydown', escEventReact);
    if(repeateButton) {
      repeateButton.removeEventListener('click', clickButtonEventReact);
    }
    bodyElement.removeChild(elementForModification);
  }

  document.addEventListener('keydown', escEventReact, {once: true});
  document.addEventListener('click', clickDocEventReact, {once: true});
  if(repeateButton) {
    repeateButton.addEventListener('click', clickButtonEventReact, {once: true});
  }
};

const createSuccesSendDataMessage = () => {
  const successMessageElement = successMessageTemplate.cloneNode(true);
  bodyElement.appendChild(successMessageElement);
  addEventListners(successMessageElement);
};

const createErrorSendDataMessage = () => {
  const errorSendMessageElement = errorSendMessageTemplate.cloneNode(true);
  bodyElement.appendChild(errorSendMessageElement);
  addEventListners(errorSendMessageElement);
};

const createErrorGetDataMessage = () => {
  const errorGetMessageElement = errorGetMessageTemplate.cloneNode(true);
  bodyElement.appendChild(errorGetMessageElement);
  addEventListners(errorGetMessageElement);
};

export {createSuccesSendDataMessage, createErrorSendDataMessage, createErrorGetDataMessage};
