<template>
  <div class="shopcar">
    <!-- 商品列表区域 -->
    <div class="goods-list" v-for="(item, index) in goodslist" :key="index">
      <van-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])" size="24px" active-color="#FF6B01"/>
      <img :src="item.thumb_path" alt="">
      <div class="info">
          <h1>{{ item.title.slice(0, 18) + '...' }}</h1>
          <p>
              <span class="price">￥{{ item.sell_price }}</span>
              <numbox :nums="$store.getters.getGoodsCount[item.id]" @add="add(item.id)" @reduce="reduce(item.id)"></numbox>
              <a href="#" @click.prevent="remove(item.id, index)">删除</a>
          </p>
      </div>
    </div>
    <div class="goods-price">
        <div class="left">
            <p>总计(不含运费)</p>
            <p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span> 件，
            总价<span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }} </span> 元</p>
        </div>
        <van-button type="danger">去结算</van-button>
        <!-- <p>{{ $store.getters.getGoodsSelected }}</p> -->
    </div>
    <!-- 商品结算区域 -->
  </div>
</template>
<script>
// import Vue from 'vue'
// import { Switch } from 'vant';
// Vue.use(Switch);
import numbox from '../subcomponents/shopcar_numbox.vue'
export default {
    data() {
        return {
            checked: false,
            goodslist: [],
        }
    },
    created() {
        this.getGoodsList();
    },
    methods: {
        getGoodsList() {
            // 1. 获取到 store 中所有商品的 id，然后拼接出一个用逗号分隔的字符串
            var idArr = [];
            this.$store.state.car.forEach(item => {
                idArr.push(item.id);
            })
            // 如果购物车中没有商品，则直接返回，不需要请求数据
            if(idArr.length <= 0) {
                return;
            }
            // 获取购物车商品列表
            this.$http.get('http://www.liulongbin.top:3005/api/goods/getshopcarlist/' + idArr.join(',')).then(res => {
                console.log(res);
                this.goodslist = res.body.message;
            });
        },
        add(id) {
            this.$store.commit('add', id);
        },
        reduce(id) {
            this.$store.commit('reduce', id);
        },
        remove(id, index) {
            // 点击删除，把商品从 store 中根据传递的 id 和 index 删除
            this.goodslist.splice(index, 1);
            this.$store.commit('removeFromCar', id);
        },
        selectedChanged(id, val) {
            // 每当点击开关，把最新的开关状态，同步到 store 中
            console.log(id, val);
            this.$store.commit('updateGoodsSelected', {id, selected: val});
        }
    },
    components: {
        numbox
    }
};
</script>
<style lang="scss" scoped>
.shopcar {
    padding: 10px 20px;
    .goods-list {
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        display: flex;
        align-items: center;
        img {
            width: 60px;
            height: 60px;
            // margin-left: 5px;
        }
        h1 {
            font-size: 14px;
            
        }
        span {
            color: red;
        }
        a {
            color: #999;
            font-size: 12px;
        }
        .info {
            margin-left: 10px;
        }
    }
}
.numbox {
    transform: scale(.8) translateY(20%);
}
.goods-price {
    color: #333;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
        line-height: 30px;
    }
}
.red {
    color: red;
    font-weight: bold;
}
</style>


