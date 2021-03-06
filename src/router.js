// 导入 vue-router
import VueRouter from 'vue-router'

// 导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
// 新闻
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
// 图片
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
// 商品
import GoodsList from './components/goods/GoodList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'

// 创建路由对象
var router = new VueRouter({
    routes: [
        { path: '/', name: 'home', component: HomeContainer },
        { path: '/member', name: 'member', component: MemberContainer },
        { path: '/shopcar', name: 'shopcar', component: ShopcarContainer },
        { path: '/search', name: 'search', component: SearchContainer },

        { path: '/home/newslist', name: 'newslist', component: NewsList },
        { path: '/home/newsinfo/:id', name: 'newsinfo', component: NewsInfo },

        { path: '/home/photolist', name: 'photolist', component: PhotoList },
        { path: '/home/photoinfo/:id', name: 'photoinfo', component: PhotoInfo },

        { path: '/home/goodslist', name: 'goodslist', component: GoodsList },
        { path: '/home/goodsinfo/:id', name: 'goodsinfo', component: GoodsInfo },
        { path: '/home/goodsdesc/:id', name: 'goodsdesc', component: GoodsDesc },
        { path: '/home/goodscomment/:id', name: 'goodscomment', component: GoodsComment },
    ]
})

// 导出路由对象
// module exports = 
export default router