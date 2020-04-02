export function getHTMLPost(post, btnFlag = {}) {
  const favorite = (JSON.parse(localStorage.getItem('idPost')) || []);
  const contender = favorite.find(idContender => idContender.id === post.id);
  let btn = contender ?
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
      ${btnFlag.btnFlag ? btn : ''}
      
    </div >  
  </div >
  <hr>
    `

}