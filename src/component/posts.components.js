import { Component } from './../core/component';
import { apiServer } from './../servers/server.api';
import { FireBaseData } from './../servers/fireBaseData.component';
import { getHTMLPost } from './renderHTMLPost';
export class Posts extends Component {
  constructor(id, { loader }) {
    super(id)
    this.loader = loader;
  }
  async onShow() {
    this.loader.show()
    const data = await apiServer.getDataPost()
    const getArrFb = FireBaseData.converDataToArray(data)
    this.loader.hide()
    getArrFb.forEach(item => {
      this.$el.insertAdjacentHTML('afterbegin', getHTMLPost(item))
    });
  }
  init() {
    this.$el.addEventListener('click', btnHandler.bind(this));

  }
  onClose() {
    this.$el.innerHTML = '';
    console.log(this.arrid);
  }
}


function btnHandler(e) {
  const target = e.target

  this.sentData([]);


  if (target.dataset.id) {

    const getDataPost = {
      id: target.dataset.id,
      name: target.dataset.title,
    }
    let arrId = (JSON.parse(localStorage.getItem('idPost'))) || [];
    const findId = arrId.find(item => item.id === target.dataset.id);

    if (findId) {
      target.textContent = "Сохранить"
      target.classList.remove('btn-delete')
      arrId = arrId.filter(fbId => fbId.id !== target.dataset.id);

    } else {
      arrId.push(getDataPost);
      target.classList.add('btn-delete');
      target.textContent = "Удалить";
    }






    localStorage.setItem('idPost', JSON.stringify(arrId));

    return arrId;
  }



}
// target.textContent = "Сохранить"
// target.classList.remove('btn-delete');

// arrId = arrId.filter(fbId => fbId !== target.dataset.id); else {
//   target.classList.add('btn-delete');
//   target.textContent = "Удалить"
//   arrId.push(getDataPost);
  // arrId.push(target.dataset.id)
  // localStorage.setItem('idPost', );

