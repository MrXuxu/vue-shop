<template>
    <div class="HomeContainer">
        <div @click="imgPreview"><v-lunbo :lunbotuList="lunbotuList"></v-lunbo></div>
        <div class="icons">
            <router-link to="/home/newslist" tag="div">
                <div class="icon">
                    <img src="../../images/menu1.png" alt="">
                    <p>新闻资讯</p>
                </div>
            </router-link>
            <router-link to="/home/photolist" tag="div">
                <div class="icon">
                    <img src="../../images/menu2.png" alt="">
                    <p>图片分享</p>
                </div>
            </router-link>
            <router-link to="/home/goodslist" tag="div">
                <div class="icon">
                    <img src="../../images/menu3.png" alt="">
                    <p>商品购买</p>
                </div>
            </router-link>
            
            <div class="icon">
                <img src="../../images/menu4.png" alt="">
                <p>留言反馈</p>
            </div>
            <div class="icon">
                <img src="../../images/menu5.png" alt="">
                <p>视频专区</p>
            </div>
            <div class="icon">
                <img src="../../images/menu6.png" alt="">
                <p>联系我们</p>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import vLunbo from '../subcomponents/swipe.vue'
import { Toast, ImagePreview } from 'vant';

Vue.use(Toast);
export default {
    data() {
        return {
            lunbotuList: [], //保存轮播图的数组
            imgpreview: []
        }
    },
    created() {
        this.getLunbotu();
    },
    methods: {
        getLunbotu() {
            // 'http://www.liulongbin.top:3005/api/getlunbo'
            this.$http.get('https://www.easy-mock.com/mock/5c2dbaecda4d71382bd2d05a/vueProject/swipe').then(res => {
                
                    // Toast('加载完成');
                    // this.lunbotuList = res.body.message;
                this.lunbotuList = res.data.swipers;
                res.data.swipers.forEach(ele => {
                    this.imgpreview.push(ele.imgUrl);
                })
                
            })
        },
        imgPreview() {
            ImagePreview(this.imgpreview);
        }
    },
    components: {
        vLunbo,
    }
}
</script>
<style lang="scss" scoped>

.icons {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 90px 90px;
    text-align: center;
    align-items: center;
    margin-top: 10px;
    img {
        width: 50px;
        // height: 80%;
    }
    p {
        font-size: 14px;
    }
}
</style>


