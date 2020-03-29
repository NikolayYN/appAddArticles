export class Validator {
  static require(value = '') {
    return value && value.trim()
  }
}