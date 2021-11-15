import {clearFormData, makeFilterFormActive} from './form-validation.js';

const getData = (onSuccess, onError) => fetch ('https://24.javascript.pages.academy/keksobooking/data',
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

const sendData = (onSuccess, onError, formData) => fetch (
  'https://24.javascript.pages.academy/keksobooking',
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
