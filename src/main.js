import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'lib-flexible/flexible'

import Vant from 'vant';
import 'vant/lib/index.css';

// 正则文件
import * as regexp from '@/utils/regExp'
Vue.prototype.regexp = regexp

// 过滤器
import * as filter from '@/utils/filters'
Vue.prototype.filter = filter

// 封装的公用方法
import * as common from '@/utils/common'
Vue.prototype.common = common

// 引入配置文件(全部变量)
import * as config from '@/utils/config'
Vue.prototype.config = config


Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


//路由跳转监听方法、路由跳转前执行
router.beforeEach((to, from, next) => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
  next();
})


// 路由跳转监听方法、路由跳转后执行
router.afterEach((to, from) => {
  //跳转到首页时显示记录的页面的title
  document.title = to.meta.title;
  // store.state.h5_title = to.meta.title;
})
