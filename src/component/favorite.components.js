import { Component } from '../core/component';
import { Posts } from './posts.components';
import { apiServer } from './../servers/server.api';
import { getHTMLPost } from './renderHTMLPost';
export class Favorite extends Component {
  constructor(id, { loader }) {
    super(id)
    this.listObj = [];
    this.loader = loader;
  }
  init() {
    this.$el.addEventListener('click', linkHeandler.bind(this))

  }
  onShow() {
    const listFavorite = JSON.parse(localStorage.getItem('idPost'));
    this.listObj = listFavorite;

    Object.keys(this.listObj).forEach(li => {
      this.$el.insertAdjacentHTML('afterbegin', `<ul class="favorite_list">${setHTML(this.listObj[li])}</ul>`);
    })
  }
  onClose() {
    this.$el.innerHTML = '';
  }
}
function setHTML(li) {
  const HtMLlist = `
    <li><a href="#" data-id="${li.id}">${li.name}</a></li>
  `
  return HtMLlist;
}
async function linkHeandler(e) {
  e.preventDefault();
  if (e.target.dataset) {
    e.target.style.display = 'none';
    this.loader.show();
    const data = await apiServer.getPostFavorite(e.target.dataset.id);
    this.$el.insertAdjacentHTML('afterbegin', getHTMLPost(data));
    this.loader.hide();
  }
}