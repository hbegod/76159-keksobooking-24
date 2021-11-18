const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const STANDARD_PICTURE = 'img/muffin-grey.svg';

const userAvatarUploadField = document.querySelector('.ad-form__field [type=file]');
const userAvatarPreview = document.querySelector('.ad-form-header__preview img');
const accommodationPhotoUploadField = document.querySelector('.ad-form__upload [type=file]');
const accommodationPhotoPreview = document.querySelector('.ad-form__photo img');

const clearPreview = () => {
  userAvatarPreview.src = STANDARD_PICTURE;
  accommodationPhotoPreview.src = STANDARD_PICTURE;
};

const createPicturePreviewListner = (uploadField, previewElement) => {
  uploadField.addEventListener('change', () => {
    const file = uploadField.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if(matches){
      previewElement.src = URL.createObjectURL(file);
    }
  });
};

const addPicturePreviewListners = () => {
  createPicturePreviewListner(userAvatarUploadField, userAvatarPreview);
  createPicturePreviewListner(accommodationPhotoUploadField, accommodationPhotoPreview);
};

export {addPicturePreviewListners, clearPreview};
