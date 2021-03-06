var Vue = require('vue');
var VueRouter = require('vue-router');

Vue.use(VueRouter);

// 定义组件
var Foo = Vue.extend({
  template: '#foo',
  data: function(){
    return {
      'msg':'hello'
    };
  },
  methods: {
    changeMsg: function(text){
      this.msg = text;
    }
  }
});

var Bar = Vue.extend({
  template: '#bar',
  props: ['changeMsg', 'msg'],
  methods: {
    clickBar: function(text){
      this.changeMsg(text)
    }
  }
});

var Baz = Vue.extend({
  template: '#baz',
  props: ['changeMsg', 'msg'],
  methods: {
    clickBaz: function(text){
      this.changeMsg(text)
    }
  }
});

// 路由器需要一个根组件。
// 出于演示的目的，这里使用一个空的组件，直接使用 HTML 作为应用的模板
// 或者 使用一个非空组件， 挂载之后每个路径对应的解析的 组件 将替换到 这个根组件的 router-view 中
var App = Vue.extend({template: '#app2'});

// 创建一个路由器实例
// 创建实例时可以传入配置参数进行定制，为保持简单，这里使用默认配置
var router = new VueRouter();

router.map({
  '/': {
    name: 'default',
    component: {
      template: '<p>Default sub view for Foo</p>'
    }
  },
  '/foo': {
    component: Foo,
    // 在/foo下设置一个子路由
    subRoutes: {
      '/bar': {
        // 当匹配到/foo/bar时，会在Foo's <router-view>内渲染
        // 一个Bar组件
        component: Bar
      },
      '/baz': {
        // Baz也是一样，不同之处是匹配的路由会是/foo/baz
        component: Baz
      }
    }
  }
})

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(App, '#app')