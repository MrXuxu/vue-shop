<template>
    <div class="app-container">
        <!-- 顶部 Header 区域 -->
        <van-nav-bar
        title="vue2.0-商城"
        @click-left="onClickLeft"
        @click-right="onClickRight"
        />
        <!-- 中间路由区域 -->
        <!-- <transition> -->
            <router-view></router-view>
        <!-- </transition> -->

        <!-- 底部 Tabbar 区域 -->
        <van-tabbar v-model="active">
            <van-tabbar-item to="/">
                <span>主页</span>
                <img
                slot="icon"
                slot-scope="props"            
                :src="props.active ? icon.home_active : icon.home"
                >
            </van-tabbar-item>
            <van-tabbar-item to="/member">
                <span>会员</span>
                <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? icon.vip_active : icon.vip"
                >
            </van-tabbar-item>
            <van-tabbar-item info="0" to="/shopcar">
                <span>购物车</span>
                <img              
                slot="icon"
                slot-scope="props"
                :src="props.active ? icon.shop_active : icon.shop"
                >
            </van-tabbar-item>
            <van-tabbar-item to="/search">
                <span>搜索</span>
                <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? icon.search_active : icon.search"
                >
            </van-tabbar-item>
            
        </van-tabbar>
    </div>
</template>
<script>
export default {
    data() {
        return {
            active: 0,
            icon: {
                home: '/src/lib/iconfont/tabbar/home.png',
                home_active: '/src/lib/iconfont/tabbar/home-active.png',
                vip: '/src/lib/iconfont/tabbar/vip.png',
                vip_active: '/src/lib/iconfont/tabbar/vip-active.png',
                shop: '/src/lib/iconfont/tabbar/shop.png',
                shop_active: '/src/lib/iconfont/tabbar/shop-active.png',
                search: '/src/lib/iconfont/tabbar/search.png',
                search_active: '/src/lib/iconfont/tabbar/search-active.png'
            }
        }
    },
    methods: {
        onClickLeft() {

        },
        onClickRight() {

        }
    }
}
</script>
<style lang="scss">
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
.app-container {
    padding-top: 46px;
    padding-bottom: 50px;
    overflow-x: hidden;
}
.van-nav-bar {
    background-color: #FF6B01;
    color: #fff;

    position: fixed;
    top: 0;
    width: 100%;
}
.van-tabbar-item--active {
    color: #FF6B01;
}

.v-enter {
    opacity: 0;
    transform: translateX(100%);
    // position: absolute;
}
.v-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
}
.v-enter-active,
.v-enter-active {
    transition:                                                                                                                                                                                                                                                                                                                                                                                                          all ease .5s;
}
</style>

