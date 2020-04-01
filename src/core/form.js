import {
  apiServer
} from '../servers/server.api';



export class Form {
  constructor(form, fileds) {
    this.form = form;
    this.fileds = fileds;

  }
  value() {
    const value = {};

    Object.keys(this.fileds).forEach(field => {
      value[field] = this.form[field].value;
    });

    return value;
  }
  isValid() {
    let isFormValid = true // По умолчанию валидна

    Object.keys(this.fileds).forEach(field => {
      const validators = this.fileds[field];

      let isValid = true;
      validators.forEach(validator => {
        isValid = validator(this.form[field].value) && isValid;
      })

      isValid ? cleanFields(this.form[field]) : setError(this.form[field]);
      isFormValid = isFormValid && isValid;
    })

    return isFormValid;
  };
  clearFields() {
    Object.keys(this.fileds).forEach(l => this.form[l].value = '');
  }
}

function setError(label) {

  cleanFields(label)
  let error = '';
  switch (label.name) {
    case ('title'):
      error = '<p class="validation-error">Поле не должно быть пустым</p>';
      break;
    case ('fulltext'):
      error = '<p class="validation-error">Минимальное колличество символов 15</p>';
      break;
    default:
      break;
  }
  label.classList.add('invalid')
  label.insertAdjacentHTML('afterend', error);

}

function cleanFields(label) {
  label.classList.remove('invalid');
  if (label.nextSibling) {
    label.closest('.form-control').removeChild(label.nextSibling);
  }
}