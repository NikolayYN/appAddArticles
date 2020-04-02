import {
  Component
} from './../core/component';


export class NavigationComponent extends Component {
  constructor(id) {
    super(id);
    this.tabs = [];
  }
  init() {
    this.$el.addEventListener('click', tabChangeCLick.bind(this));
  };
  getTab(tab) {
    this.tabs = tab;
  }
}



function tabChangeCLick(e) {
  e.preventDefault();
  const target = e.target;
  if (target.classList.contains('tab')) {
    // this.$el.querySelectorAll('.tab').forEach(item => {
    //   item.classList.remove('active');
    // });
    this.tabs.forEach(i => i.component.hide())
    Array.from(this.$el.querySelectorAll('.tab'), item => item.classList.remove('active'));

    const findComponent = this.tabs.find(i => i.name === target.dataset.name);
    // findComponent.component.show();
    target.classList.add('active')
    findComponent.component.show();


  }
}