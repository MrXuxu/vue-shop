<template>
    <div class="desc">
        <h3>{{ info.title }}</h3>
        <hr>
        <div class="content" v-html="info.content"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            info: {} //图文数据
        }
    },
    created() {
        this.getGoodsDesc();
    },
    methods: {
        getGoodsDesc() {
            this.$http.get('http://www.liulongbin.top:3005/api/goods/getdesc/' + this.$route.params.id).then(res => {
                if(res.body.status === 0) {
                    this.info = res.body.message[0];
                }
            })
        }
    }
}
</script>
<style lang="scss">
.desc {
    padding: 10px 20px;
    img {
        width: 100%;
        height: auto;
    }

}
</style>


