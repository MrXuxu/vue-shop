<template>
    <div>
        <van-tabs @click="onClick">
            <van-tab v-for="(item, index) in cates" :title="item.title" :key="index"
             swipeable="true">
                <!-- <img title="index" v-for="(item, index) in list" v-lazy="item.img_url" :key="index"> -->
                <!-- <lazy-component> -->
                <div v-for="(item, index) in list" :key="index" @click="toInfo(item.id)">
                    <img src="" alt="" v-lazy="item.img_url">
                    <p>{{ item.title }}</p>
                </div>
                <!-- </lazy-component> -->
            </van-tab>
        </van-tabs>
        
    </div>
</template>
<script>
import Vue from 'vue';
import { Lazyload, Toast } from 'vant';
Vue.use(Lazyload);
export default {
    data() {
        return {
            cates: [],
            list: [],
        }
    },
    created() {
        this.getAllCategory();
        // 默认进入页面，就主动请求所有列表的数据
        this.getPhotoListByCateId(0);
    },
    methods: {
        getAllCategory () {
            this.$http.get('http://www.liulongbin.top:3005/api/getimgcategory').then(res => {
                if (res.body.status === 0) {
                    // 手动拼接出一个完整的列表
                    res.body.message.unshift ({ title: '全部', id: 0});
                    this.cates = res.body.message;
                    // console.log(res.body);
                }
            })
        },
        getPhotoListByCateId(cateId) {
            // 根据 分类 id 获取图片列表
            this.$http.get('http://www.liulongbin.top:3005/api/getimages/' + cateId).then(res => {
                if(res.body.status === 0) {
                    this.list = res.body.message;
                    console.log(cateId);
                }
            })
        },
        onClick(index) {
            console.log(index);
            var cateId = this.cates[index].id;
            this.getPhotoListByCateId(cateId);
            // this.$http.get('http://www.liulongbin.top:3005/api/getimages/' + cateId).then(res => {
            //     // if(res.body.status === 0) {
            //     //     this.list = res.body.message;
            //     //     console.log(cateId);
            //     // }
            //     console.log(res);
            // })
        },
        toInfo(id) {
            this.$router.push({name: 'photoinfo', params: {id: id}})
        }

    }
};
</script>
<style lang="scss" scoped>
.van-tab__pane {
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
    // justify-content: center;
    align-items: center;
    > div {
        margin-bottom: 20px;
        width: 300px;
        position: relative;
        p {
            transform: translateY(-120%);
            position: absolute;
            // bottom: 20px;
            // margin-bottom: 10px;
            color: #fff;
            background-color: rgba(0, 0, 0, 0.241);
            padding: 10px;
            width: 280px;
            box-sizing: content-box;
        }
    }
}
</style>


