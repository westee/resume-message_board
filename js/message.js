! function () {
  //model  和数据有管的
  let model = {
    //获取数据
    fetch: function () {
      var query = new AV.Query('Message');
      return query.find() //返回的是一个promise对象
    },
    //保存数据
    save: function (name, content) { //保存数据
      //添加表名
      var Message = AV.Object.extend('Message');
      var message = new Message();
      return message.save({ //返回一个promise对象
        //数据名是words,格式是string, 内容是 Hello World
        'content': content, //左边是key(省略了引号),右边是value
        'name': name
      })
    },
    init: function () {
      var APP_ID = 'Jh7j3eCbXpP7jufsGDbO6U3H-gzGzoHsz';
      var APP_KEY = '5CfkQglCnIUmFQeghWVgxpSP';
      AV.init({
        appId: APP_ID,
        appKey: APP_KEY
      });
    },
  }
  let view = document.querySelector('section.message-board')
  let controller = {
    view: null,
    model: null,
    messagesList: null,
    init: function (view, model) {
      this.view = view; //先获取view
      this.model = model;
      this.messagesList = view.querySelector('#messagesList') //再从view里找到messagelist
      this.form = view.querySelector('form'); //再找到form 
      this.model.init(); //c初始化AV
      this.loadMessage() //加载信息
      this.bindEvents()
    },

    loadMessage: function () {
      this.model.fetch()          //用this的model而不是变量model
        .then((messages) => {
          //获取到服务器的信息
          let array = messages.map((item) => item.attributes)
          array.forEach(item => {
            let li = document.createElement('li')
            li.innerText = `${item.name}:${item.content}`
            this.messagesList.appendChild(li);
          });
        }).then(function (todos) {
          console.log('成功')
          // 更新成功
        }, function (error) {
          console.log(error)
          // 异常处理
        });
    },
    bindEvents: function () { //绑定事件不该做其他事件,所以把声明变量搞走
      this.form.addEventListener('submit',  (e) => { //不能只监听click,因为用户会用回车提交信息
        e.preventDefault(); //submit后会刷新当前页面,所以要组织默认事件
        this.saveMessage();
      })
    },
    saveMessage: function () {
      let myForm = this.form
      let content = myForm.querySelector('input[name=content]').value;
      let name = myForm.querySelector('input[name=name]').value;
      this.model.save(name, content)              //用this的model而不是变量model
        .then(function (object) { //object存了我们存入的相关信息,通过console.log打印出来object可得知其内容
          //保存成功就运行alert
          let li = document.createElement('li')
          li.innerText = `${object.attributes.name}:${object.attributes.content}`
          messagesList.appendChild(li);
          myForm.querySelector('input[name=content]').value = '';
          myForm.querySelector('input[name=name]').value = '';
          // window.location.reload()
          // alert('成功哟!');
        })
    }
  }
  controller.init(view, model)
}.call()