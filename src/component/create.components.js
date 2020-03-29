import {
  Component
} from './../core/component';
import {
  Form
} from './../core/form';

export class Create extends Component {
  constructor(id) {
    super(id)

  }
  init() {
    console.log('3');
    this.$el.addEventListener('submit', submitHendler.bind(this));
    this.form = new Form(this.$el, {
      title: [],
      fulltext: []
    });

    console.log('FORMAA', this);
    // debugger
  }
}

function submitHendler(e) {
  e.preventDefault()

  const dataForm = {
    type: this.$el.type.value,
    ...this.form.value()
  }
  // console.log(this.form);
  console.log('this.form.value', dataForm);


}