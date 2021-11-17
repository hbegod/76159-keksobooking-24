import {clearFormData, makeFilterFormActive} from './form-validation.js';

const GET_DATA_WEB_ADDRESS = 'https://24.javascript.pages.academy/keksobooking/data';
const SEND_DATA_WEB_ADDRESS = 'https://24.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onError) => fetch (GET_DATA_WEB_ADDRESS,
  {
    method: 'GET',
    credentials: 'same-origin',
  },
)
  .then((res) => res.json())
  .then((res) => {
    makeFilterFormActive();
    onSuccess(res);
  })
  .catch((err) => {
    onError(err);
  });

const sendData = (onSuccess, onError, formData) => fetch (SEND_DATA_WEB_ADDRESS,
  {
    method: 'POST',
    body: formData,
  },
)
  .then((response) => {
    if(response.ok) {
      clearFormData();
      onSuccess();
    } else {
      throw new Error();
    }
  })
  .catch( () => {
    onError();
  });

export {getData, sendData};
