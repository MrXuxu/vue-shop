// 入口文件
import Vue from 'vue'
// 导入路由的包
import VueRouter from 'vue-router'
// 启用路由
Vue.use(VueRouter)
// 导入路由模块
import router from './router'
// 挂载路由对象到 vm 实例上

// 导入 vue-resource
import VueResource from 'vue-resource'
// 安装 vue-resource
Vue.use(VueResource)
// 设置请求的根路径
// Vue.http.options.root = 'http://www.liulongbin.top:3005'
Vue.http.options.emulateJSON = true;


// 导入 vant-ui
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

// 定义全局过滤器
// 导入格式化时间插件
import moment from 'moment'
Vue.filter('dateFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern)
})

// 使用 vue-resource

// 导入 iconfont
// import './lib/iconfont/TMall/iconfont.css'

// 导入 App 根组件
import app from './App.vue'
var vm = new Vue({
    el: '#app',
    router,
    render: c => c(app)
})