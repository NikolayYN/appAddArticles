import { Component } from '../core/component';
import { Posts } from './posts.components';
import { apiServer } from './../servers/server.api';
import { getHTMLPost } from './renderHTMLPost';
import { FireBaseData } from './../servers/fireBaseData.component';
export class Favorite extends Component {
  constructor(id, { loader }) {
    super(id)
    this.loader = loader;
  }
  init() {
    this.$el.addEventListener('click', linkHeandler.bind(this))
    this.$el.addEventListener('click', removePostHandler.bind(this))
  }
  onShow() {
    const listFavorite = JSON.parse(localStorage.getItem('idPost')) || [];
    const html = setHTML(listFavorite);

    this.$el.insertAdjacentHTML('afterbegin', html);
  }
  onClose() {
    this.$el.innerHTML = '';
  }
  deleteFamous() {
    this.$el.addEventListener('click', removePostHandler.bind(this))
  }
}
function setHTML(li) {

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
  if (e.target.dataset.id) {
    const idLink = e.target.dataset.id;
    const block = this.$el.querySelector('#' + e.target.dataset.id);
    // block.innerHTML = '';
    this.loader.show();

    const data = await apiServer.getPostFavorite(e.target.dataset.id);
    // let favoriteLsData = JSON.parse(localStorage.getItem('idPost'));

    if (data) {
      e.target.style.color = '#47d1a5';
      e.target.style.display = 'none';
    }


    block.insertAdjacentHTML('afterbegin', getHTMLPost(data, { btnFlag: false }, idLink));

    this.loader.hide();
  }
}
function removePostHandler(e) {
  e.preventDefault();
  let favoriteLsData = JSON.parse(localStorage.getItem('idPost'));
  if (e.target.dataset.fav) {

    favoriteLsData = favoriteLsData.filter(post => {
      return post.id !== e.target.dataset.fav;
    });
    const block = this.$el.querySelector('#' + e.target.dataset.fav);

    this.$el.querySelector('#' + e.target.dataset.fav).style.transition = '0.3s';
    this.$el.querySelector('#' + e.target.dataset.fav).style.transform = 'translateY(100%)';
    this.$el.querySelector('#' + e.target.dataset.fav).style.opacity = 0;

    setTimeout(() => {
      this.$el.querySelector('#' + e.target.dataset.fav).style.display = 'none';

    }, 300)
  }
  localStorage.setItem('idPost', JSON.stringify(favoriteLsData));
}