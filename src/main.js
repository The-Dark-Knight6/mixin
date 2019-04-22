// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
//导入自适应布局插件 安装依赖后还需 在bulid/utils.js文件下加相关代码
//index.html 中取出不相干的meta表亲 flexible会自动导入一些
import 'lib-flexible/flexible'
//导入config文件 （修改原型方便获取地址 SERVER_URL = 'https://www.testdidi365.com'）
import config from './common/config'
// 导入滑动插件swiper.css样式
import 'swiper/dist/css/swiper.css'
// 引入vue element-ui组件
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入miao.vue页面的最后脚部
//这里不可设置为footer 会与html中<footer>标签重名 vue会提示报错 
import Footer from './components/Footer.vue'
//安装 cnpm i font-awesome 依赖之后引入包文件
import 'font-awesome/css/font-awesome.css'
// 这是csdn中的头部
import heads from './csdn/heads'

Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.use(Element);
Vue.use(config);
Vue.component('Footer',Footer)
Vue.component('heads',heads)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
