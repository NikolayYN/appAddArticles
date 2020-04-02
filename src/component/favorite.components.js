import { Component } from '../core/component';
import { Posts } from './posts.components';
import { apiServer } from './../servers/server.api';
import { getHTMLPost } from './renderHTMLPost';
export class Favorite extends Component {
  constructor(id, { loader }) {
    super(id)
    this.loader = loader;
  }
  init() {
    this.$el.addEventListener('click', linkHeandler.bind(this))
  }
  onShow() {
    const listFavorite = JSON.parse(localStorage.getItem('idPost')) || [];
    const html = setHTML(listFavorite);
    console.log('html: ', html);
    this.$el.insertAdjacentHTML('afterbegin', html);
  }
  onClose() {
    this.$el.innerHTML = '';
  }
}
function setHTML(li) {
  console.log(li.length);
  if (li.length) {
    const renderLi = Object.keys(li).map(l => {
      return `<div id="${li[l].id}"></div><ul class="favorite_list">
      <li><a href="#" data-id="${li[l].id}">${li[l].name}</a></li></ul>
    `;

    })
    return renderLi.join(' ');
  }
  return `<p class="center">Здесь будут сохраненные посты</p>`
}
async function linkHeandler(e) {
  e.preventDefault();
  console.log('outPut: ', this.$el.dataset);
  if (e.target.dataset) {
    const block = this.$el.querySelector('#' + e.target.dataset.id);
    block.innerHTML = '';
    this.loader.show();
    const data = await apiServer.getPostFavorite(e.target.dataset.id);
    if (data) {
      e.target.style.color = '#47d1a5';
      e.target.style.display = 'none';
    }


    block.insertAdjacentHTML('afterbegin', getHTMLPost(data, { btnFlag: false }));

    this.loader.hide();
  }
}

