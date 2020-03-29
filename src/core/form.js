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
}