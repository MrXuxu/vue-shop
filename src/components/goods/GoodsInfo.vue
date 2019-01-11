<template>
    <div class="good-info">
        <div class="lunbo" @click="imgPreview">
            <v-lunbo :lunbotuList="lunbotu" :isfull="false"></v-lunbo>
        </div>
        <div class="goods">
            <transition
              @before-enter="beforeEnter"
              @enter="enter"
              @after-enter="afterEnter">
                <div class="ball" v-show="ballFlag" ref="ball"></div>
            </transition>
            <p class="price">
                市场价：<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;<span class="now_price">￥{{ goodsinfo.sell_price }}</span>
            </p>
            <p>购买数量：<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
            <p class="buy">
                <van-button type="danger" size="small">立即购买</van-button>
                <van-button type="primary" size="small" @click="addToShopCar">加入购物车</van-button>
            </p>
        </div>
        <div class="about">
            <p class="title">商品参数</p>
            <hr>
            <p>商品货号: {{ goodsinfo.goods_no }}</p>
            <p>货存情况: {{ goodsinfo.stock_quantity }} 件</p>
            <p>上架时间: {{ goodsinfo.add_time | dateFormat('YYYY-MM-DD') }}</p>
            <van-button type="danger" size="large" plain class="intro" @click="goDesc(id)">图文介绍</van-button>
            <van-button type="primary" size="large" plain @click="goComment(id)">商品评论</van-button>
        </div>
    </div>
    
</template>
<script>
import vLunbo from '../subcomponents/swipe.vue'
import { ImagePreview } from 'vant';
import numbox from '../subcomponents/goodsinfo_numbox.vue'
export default {
    data() {
        return {
            id: this.$route.params.id,
            lunbotu: [],
            imgpreview: [],
            goodsinfo: '',
            ballFlag: false,  // 控制小球隐藏显示
            selectedCount: 1, // 保存用户选中的商品数量,默认一个
        }
    },
    created() {
        this.getLunbotu();
        this.getInfo();
        
    },
    methods: {
        getLunbotu() {
            this.$http.get('http://www.liulongbin.top:3005/api/getthumimages/' + this.id).then(res => {
                if(res.body.status === 0) {
                    // this.lunbotu = res.body.message;
                    res.body.message.forEach(ele => {
                        this.imgpreview.push(ele.src);
                        var temp = {
                            imgUrl: ele.src
                        }
                        this.lunbotu.push(temp);
                    })
                }
            })
        },
        imgPreview() {
            // console.log(1);
            ImagePreview(this.imgpreview)
        },
        getInfo() {
            this.$http.get('http://www.liulongbin.top:3005/api/goods/getinfo/' + this.id).then(res => {
                this.goodsinfo = res.body.message[0];
            })
        },
        goDesc(id) {
            // console.log(1);
            this.$router.push({name: 'goodsdesc', params: { id }});
        },
        goComment(id) {
            // console.log(2);
            this.$router.push({name: 'goodscomment', params: { id }});
        },
        addToShopCar() {
            // console.log(this.ballFlag);
            this.ballFlag = !this.ballFlag;
            var goodsinfo = {
                id: this.id,
                count: this.selectedCount,
                price: this.goodsinfo.sell_price,
                selected: true
            }
            // 调用 addToCar 方法, 传递数据, goodsinfo
            this.$store.commit('addToCar', goodsinfo);
        },
        // 动画钩子函数
        beforeEnter(el) {
            // setTimeout(function() {
                el.style.transform = "translate(0, 0)";
            // }, 100);
        },
        enter(el) {
            // 实现不同分辨率，不同上拉距离小球动画正常
            // 1. 先得到徽标的横纵坐标以及小球的横纵坐标，两者相减及为位移的距离
            // 获得小球的运行距离：domObject.getBoundingClientRect()
            

            el.offsetWidth;
            // 获取小球在页面中的位置 
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            // 获取徽标的位置，这里用的是获取dom的方法
            const badgePosition = document
                .getElementsByClassName('van-info')[0]
                .getBoundingClientRect();
            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;

            el.style.transform = `translate(${xDist}px, ${yDist}px)`;
            el.style.transition = "all .5s cubic-bezier(.4, -0.3, 1, .68)";
            // done(); // 立即执行 afterEnter 函数
        },
        afterEnter(el) {
            // console.log(1);
            this.ballFlag = !this.ballFlag;
            // this.ballFlag = false;
        },
        getSelectedCount(count) {
            // 当子组件把选中的数量传递给父组件的时候，把选中的值保存到 data 上
            this.selectedCount = count;
            // console.log(this.selectedCount);
        }
    },
    components: {
        vLunbo,
        numbox,
    }
}
</script>
<style lang="scss" scoped>
.good-info {
    padding: 10px 20px;
    // background-color: #eee;
    >div {
        // box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.144);
        padding: 10px;
        border: 1px solid #dbdbdb;
        margin-bottom: 20px;
    }
    .goods {
        position: relative;
        > p {
            line-height: 30px;
            color: #999;
            .now_price {
                color: red;
            }
        }
        .buy {
            margin-top: 20px;
        }
    }
    .numbox {
        transform: translateY(20%);
    }
    .about {
        p {
            line-height: 30px;
            color: #999;
            &:first-of-type {
                font-weight: bold;
                color: #000;
            }
        }
    }
    .intro {
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .ball {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;

        position: absolute;
        left: 135px;
        top: 54px;
        z-index: 999;
        
    }
}

</style>


