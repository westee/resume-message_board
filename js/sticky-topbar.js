! function () {
  let view = document.querySelector('#topNavBar')
  let controller = {
    view: null,         //执行第6行的代码后 view === 第6行的this.view
    init: function (view) {
      this.view = view; //下面的bindEvents属性对应的函数访问不到这里的view ,因为这是两个函数
      this.bindEvents()
    },
    bindEvents: function () {    //闭包

      var view = this.view
      // console.log(this.view)
      window.addEventListener('scroll', (x) => {
        // console.log(this)     这里的this是触发的元素
        if (window.scrollY > 0) {
          this.active()
        } else {
          this.deactive()
        }
      })
    },
    active: function(){
      this.view.classList.add('sticky')
    },
    deactive: function(){
      this.view.classList.remove('sticky')
    }

  }
  controller.init.call(controller, view)
  // console.log(controller.view)
  // console.log(view)
  //controller.init(view)   //  === controller.init.call(controller,view)
}.call()