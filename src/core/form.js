export class Form {

  constructor(form, fileds) {
    this.form = form;
    this.fileds = fileds;
  }
  value() {
    console.log('2');
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

        console.log('isValid: ', isValid);
      })

      isFormValid = isFormValid && isValid;
    })

    return isFormValid;
  };
}