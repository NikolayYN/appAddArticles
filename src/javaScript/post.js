let date = Date.now();
let endTime = new Date(2020, 3, 26);
let interval = endTime - date;
export default class Post {
  constructor(title) {
    this.title = title;
    this.day = `${Math.floor((interval/(3600*1000*24)))}`;
    this.hout = `${Math.floor(interval/(1000*3600))%24}`
  }
  setTitle($el) {
    $el.textContent = `${this.title} установлен в ${this.day} и  ${this.hout}`;
  }
}