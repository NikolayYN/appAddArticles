import {
  Component
} from "../core/component";



export class HeaderComponent extends Component {
  constructor(id) {
    super(id);
  }
  init() {

    if (localStorage.getItem('HasVsited')) {

      this.hide();
    }

    const btnHeaderStart = this.$el.querySelector('.js-header__btn');
    btnHeaderStart.addEventListener('click', btnRefer.bind(this))
  }
};

function btnRefer() {
  this.hide();

  let checkVisit = localStorage.setItem('HasVsited', JSON.stringify(true));
}