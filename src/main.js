import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './router/permission'
import './assets/css/common.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import jwt from "jwt-decode"
import './utils/eventbus'

//一进入页面就读取本地数据
//先看本地有数据没 有数据的话写入仓库当中 无论怎么刷新页面 数据都不会丢失
if(localStorage.getItem("ego")){
  store.commit("loginModule/setUser",{
    username:jwt(localStorage.getItem("ego")).username,
    token:localStorage.getItem("ego")
  })
}

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
