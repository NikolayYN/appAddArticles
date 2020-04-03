export class FireBaseData {
  static converDataToArray(object) {
    // debugger
    return Object.keys(object).map(key => {
      const item = object[key];
      item.id = key;
      return item;
    })
  }
}