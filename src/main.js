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

// 注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)
// 每次刚进入网站，肯定会调用main.js 在刚调用的时候，先从本地存储中把购物车的数据读出来，放到store中
var car = JSON.parse(localStorage.getItem('car') || '[]')
var store = new Vuex.Store({
    state: { // this.$store.state.***
        car, //将购物车中的商品的数据，用一个数组存储起来，在 car 数组中存储一些商品的对象
    },
    mutations: { // this.$store.commit('方法名称', '按需传递唯一的参数')
        addToCar(state, goodsinfo) {
            // 1. 如果购物车中，之前已经有了这个对应的商品了，那么只需要更新数量
            // 2. 如果没有，则直接把商品数据，push 到 car 中
            var flag = false; // 假设没有找到
            state.car.some(item => {
                if(item.id === goodsinfo.id) {
                    // 如果找到，则更新数据
                    item.count += parseInt(goodsinfo.count);
                    flag = true;
                    return true;
                }
            })
            // 如果循环完毕，得到 flag 还是 false，则把商品数据直接 push 到购物车中
            if(!flag) {
                state.car.push(goodsinfo);
            }
            localStorage.setItem('car', JSON.stringify(state.car));
            // console.log(state.car);
        },
        add(state, id) {
            state.car.forEach(item => {
                // console.log(item);
                if(Number(item.id) === id) {
                    item.count++;
                }
            })
        },
        reduce(state, id) {
            state.car.forEach(item => {
                // console.log(item);
                if(Number(item.id) === id) {
                    item.count--;
                }
            })
        },
        removeFromCar(state, id) {
            state.car.some((item, i) => {
                if(item.id == id) {
                    console.log(state.car[i]);
                    state.car.splice(i, 1);
                    
                    return true;
                }
            })
            // 将删除完毕后最新的购物车数据同步到本地中

            localStorage.setItem('car', JSON.stringify(state.car));
        },
        updateGoodsSelected(state, info) {
            state.car.some(item => {
                if(item.id == info.id) {
                    item.selected = info.selected;
                    // return true;
                }
            })
            // 把最新的所有购物车商品状态保存到 store 中去
            localStorage.setItem('car', JSON.stringify(state.car));
        }
    },
    getters: { // this.$store.getters.***
        // 相当于计算属性，也相当于 filters
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count;
            })
            return c;
        },
        getGoodsCount(state) {
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.count;
            })
            return o;
        },
        getGoodsSelected(state) {
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.selected;
            })
            return o;
        },
        getGoodsCountAndAmount(state) {
            var o = {
                count: 0, // 勾选的数量
                amount: 0 // 勾选的总价
            };
            state.car.forEach(item => {
                if(item.selected) {
                    o.count += item.count;
                    o.amount += item.price * item.count;
                }
            })
            return o;
        }
    }
})

// 导入 App 根组件
import app from './App.vue'
import { isArray } from 'util';
var vm = new Vue({
    el: '#app',
    router,
    store,
    render: c => c(app)
})