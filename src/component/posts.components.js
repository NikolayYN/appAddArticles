import {
  Component
} from './../core/component';

import {
  apiServer
} from './../servers/server.api';
import {
  FireBaseData
} from './../servers/fireBaseData.component';

export class Posts extends Component {
  constructor(id) {
    super(id)

  }
  async onShow() {
    const data = await apiServer.getDataPost()
    const getArrFb = FireBaseData.converDataToArray(data)
    getArrFb.forEach(item => {
      this.$el.insertAdjacentHTML('afterbegin', getHTMLPost(item))
    })

  }
  onClose() {
    this.$el.innerHTML = '';
  }
}

function getHTMLPost(post) {
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
  </div>
</div>
  `
}