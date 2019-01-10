<template>
    <div>
        <van-swipe :autoplay="3000" indicator-color="white">
            <van-swipe-item
             v-for="(item, index) in lunbotuList"
             :key="index"
            >
            <img :src="item.imgUrl" alt="" :class="{'full': isfull}">
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<script>

export default {
    props: {
        lunbotuList: {
            type: [Array, Object]
        },
        isfull: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        
    }
}
</script>
<style lang="scss" scoped>
.van-swipe-item {
    height: 200px !important;
    text-align: center;
    // background-color: cadetblue;
    img {
        height: 100%;
    }
    .full {
        width: 100%;
    }
}
</style>

