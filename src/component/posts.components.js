import { Component } from './../core/component';
import { apiServer } from './../servers/server.api';
import { FireBaseData } from './../servers/fireBaseData.component';
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
  }
}

function getHTMLPost(post) {
  let btn = (JSON.parse(localStorage.getItem('idPost')) || []).includes(post.id) ?
    `<button class="btn-main btn-savepost btn-delete" data-id="${post.id}" data-title="${post.title}">Удалить </button>`
    : `<button class="btn-main btn-savepost" data-id="${post.id}" data-title="${post.title}">Сохранить</button>`;
  const typeNote = post.type === 'news' ?
    `<li class="tag tag-blue">Новость</li>` :
    `<li class="tag  ">Заметка</li>`

  return `
  <div class="panel">
    <div class="panel-head">
      <p class="panel-title">${post.title}</p>
      <ul class="tags">
      ${typeNote}
      </ul>
    </div>
    <div class="panel-body">
      <p class="multi-line">${post.fulltext}</p>
    </div>
    
    <div class="panel-footer ">
      <small>${post.date}</small>
      ${btn}
    </div>  
  </div>
  <hr>
  `

}

function btnHandler(e) {
  const target = e.target



  if (target.dataset.id) {

    const getDataPost = {
      id: target.dataset.id,
      name: target.dataset.title,
    }
    let arrId = (JSON.parse(localStorage.getItem('idPost'))) || [];
    const findId = arrId.find(item => item.id === target.dataset.id);
    console.log(findId);
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

