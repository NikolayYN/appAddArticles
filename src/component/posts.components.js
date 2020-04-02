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
    `<button class="btn-main btn-savepost btn-delete" data-id="${post.id}">Удалить </button>`
    : `<button class="btn-main btn-savepost" data-id="${post.id}">Сохранить</button>`;
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
    let arrId = JSON.parse(localStorage.getItem('idPost')) || [];


    if (arrId.includes(target.dataset.id)) {
      target.textContent = "Сохранить"
      target.classList.remove('btn-delete');

      arrId = arrId.filter(fbId => fbId !== target.dataset.id);
    } else {
      target.classList.add('btn-delete');
      target.textContent = "Удалить"
      arrId.push(target.dataset.id);
      // arrId.push(target.dataset.id)
      // localStorage.setItem('idPost', );

    }
    localStorage.setItem('idPost', JSON.stringify(arrId));
  }

}