## 1. 项目初始化
## 2. 使用 vant-ui配置nav-bar
```javascript
import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

import Button from 'vant/lib/button';
import 'vant/lib/button/style';

```
## 3. 使用vant-ui配置tabbar
## 4. 完成 tabbar 路由改造
## 5. 完成首页轮播图
```javascript
// 获取轮播图数据
getLunbotu() {
    this.$http.get('http://www.liulongbin.top:3005/api/getlunbo').then(res => {
        console.log(res);
    })
}
```
## 6. 完成首页九宫格改造
## 7. 完成组件切换时动画效果
## 8. 九宫格路由改造
```javascript
// 导入对应的路由组件
import  HomeContainer  from  './components/tabbar/HomeContainer.vue'
{ path:  '/', name:  'home', component:  HomeContainer },
```
改造底部 active 颜色
```css
.van-tabbar-item--active {
    color: #FF6B01;
}
```
## 9. 定义时间全局过滤器
## 10. 实现新闻列表点击跳转详情页
## 11. 绘制评论子组件
## 12. 加载评论内容
## 13. 实现点击加载更多评论的功能
## 14. 发表评论
## 15. 图片列表顶部导航条制作
## 16. 渲染分类列表的数据
## 17. 获取并渲染图片详情页
```
 接口：http://www.liulongbin.top:3005/api/getimageInfo/id
 ```
## 18. 图片分享详情中的缩略图数组
## 19. 获取商品列表详情
```
> 新闻接口：http://www.liulongbin.top:3005/api/getnewslist
> 新闻详情：http://www.liulongbin.top:3005/api/getnew/13
```
## 20. 获取商品轮播图
## 21. 抽离轮播图组件
## 22. 获取商品参数区价格，标题等数据
## 23. 商品图文介绍
## 24. 实现商品数量点击增加减少
## 25. vuex 存储全局购物车数据
```js
import Vuex from 'vuex'
Vue.use(Vuex)
var store = new Vuex.Store({
    state: { // this.$store.state.***
        car: [
        ] //将购物车中的商品的数据，用一个数组存储起来，在 car 数组中存储一些商品的对象
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
            console.log(state.car);
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
        }
    }
})
```
## 26. 存储购物车数据到全局
```javascript
接口：http://www.liulongbin.top:3005/api/goods/getshopcarlist/:ids
每个商品的id 之间用逗号分隔
```
## 27. 获取购物车数据