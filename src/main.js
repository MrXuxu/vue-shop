// 入口文件
import Vue from 'vue'

// 导入 vant-ui
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

// 导入 iconfont
// import './lib/iconfont/TMall/iconfont.css'

// 导入 App 根组件
import app from './App.vue'
var vm = new Vue({
    el: '#app',
    render: c => c(app)
})