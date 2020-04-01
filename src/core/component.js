 export class Component {
   constructor(id) {
     this.$el = document.getElementById(id);
     this.init();
   }
   onShow() {}
   onClose() {}
   init() {}
   show() {
     this.onShow();
     this.$el.classList.remove('hide')
   }
   hide() {
     this.onClose()
     this.$el.classList.add('hide');
   }
 }