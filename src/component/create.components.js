import {
  Component
} from './../core/component';
import {
  Form
} from './../core/form';
import {
  Validator
} from './../core/validator';
export class Create extends Component {
  constructor(id) {
    super(id)

  }
  init() {
    console.log('3');
    this.$el.addEventListener('submit', submitHendler.bind(this));
    this.form = new Form(this.$el, {
      title: [Validator.require],
      fulltext: [Validator.require],
    });

    console.log('FORMAA', this);
    // debugger
  }
}

function submitHendler(e) {
  e.preventDefault()

  if (this.form.isValid()) {
    const dataForm = {
      type: this.$el.type.value,
      ...this.form.value()
    }
    // console.log(this.form);
    console.log('this.form.value', dataForm);
  } else {
    console.log('wrong!!!!');
  }


}