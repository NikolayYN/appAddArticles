export class Validator {
  static require(value = '') {
    return value && value.trim()
  }
  static requireLength(length) {
    return value => {
      return value.length >= length;
    }
  }
}