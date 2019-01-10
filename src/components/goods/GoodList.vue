<template>
    <div class="goods-list">
        <div class="goods-item" v-for="(item, index) in goodslist"
         :key="index" @click="toInfo(item.id)">
            <img :src="item.img_url" alt="">
            <h3>{{ item.title }}</h3>
            <div>
                <span class="price">{{ item.market_price }}</span>
                <span>{{ item.sell_price }}</span>
            </div>
            <div>
                <span>热卖中</span>
                <span>剩{{ item.stock_quantity }}件</span>
            </div>
        </div>
        <van-button type="warning" size="large" @click="getMore"  :loading="isLoading">加载更多</van-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            pageindex: 1, // 分页的页数
            goodslist: [], // 存放商品列表的数组
            isLoading: false,
        }
    },
    created() {
        this.getGoodsList();
    },
    methods: {
        getGoodsList() {
            // 获取商品列表
            this.$http.get('http://www.liulongbin.top:3005/api/getgoods?' + this.pageindex).then(res => {
                if(res.body.status === 0) {
                    this.goodslist = this.goodslist.concat(res.body.message);
                    this.isLoading = false;
                }
            })
        },
        getMore() {
            // 加载更多商品
            this.pageindex++;
            this.isLoading = true;
            this.getGoodsList();
        },
        toInfo(id) {
            this.$router.push({name: 'goodsinfo', params: {id}});
        }
    }
}
</script>
<style lang="scss" scoped>
.goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 20px;
    justify-content: space-between;
}
.goods-item {
    width: 163px;
    padding: 10px;
    display: flex;
    margin-bottom: 20px;
    flex-direction: column;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.123);
    img {
        width: 100%;
    }
    h3 {
        font-size: 13px;
        margin-top: 10px;
        margin-bottom: 5px;
    }
    >div {
        &:first-of-type {
            margin-bottom: 10px;
            .price {
                color: red;
                margin-right: 30px;
                & ~ span {
                    text-decoration: line-through;
                    color: #ccc;
                }
            }
            
        }
        &:last-of-type {
            display: flex;
            justify-content: space-between;
            color: #999;
            font-size: 13px;
        }
    }
}
</style>

