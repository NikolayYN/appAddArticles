import {
  Component
} from './../core/component';
import {
  Form
} from './../core/form';
import {
  Validator
} from './../core/validator';

import {
  apiServer
} from '../servers/server.api';

export class Create extends Component {
  constructor(id) {
    super(id)

  }
  init() {
    this.$el.addEventListener('submit', submitHendler.bind(this));
    this.form = new Form(this.$el, {
      title: [Validator.require],
      fulltext: [Validator.require, Validator.requireLength(15)],
    });

    // debugger
  }
}

async function submitHendler(e) {
  e.preventDefault()

  if (this.form.isValid()) {
    const dataForm = {
      type: this.$el.type.value,
      date: new Date().toLocaleDateString(),
      ...this.form.value(),
      randId: Date.now()
    }
    console.log(JSON.stringify(dataForm));
    await apiServer.setPost(dataForm);
    this.form.clearFields();
  }


}
