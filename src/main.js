// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui';
import axios from 'axios';
axios.defaults.withCredentials=true;
//默认每次发出请求都要带上cookies，跨域配置
import VueAxios from 'vue-axios'
import '@/common/styles/index.styl'
import '@/common/js/config'
import store from './store'

Vue.use(Mint);
Vue.use(VueAxios,axios);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
