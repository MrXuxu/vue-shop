<template>
    <div class="photoinfo">
        <h3>{{ photoinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ photoinfo.add_time | dateFormat('YYYY-MM-DD') }}</span>
            <span>点击：{{ photoinfo.click }}次</span>
        </p>
        <!-- 缩略图区域 -->
        <!-- 图片内容区域 -->
        <div class="imgs">
            <img v-for="(item, index) in imgList" :key="index" 
             :src="item" @click="imgClick">
        </div>
        <div v-html="photoinfo.content">

        </div>
        <!-- 评论子组件 -->
        <comment :newsId="id"></comment>
    </div>
</template>
<script>
import comment from '../subcomponents/comment.vue'
import { ImagePreview } from 'vant';
export default {
    data() {
        return {
            id: this.$route.params.id,
            photoinfo: {}, // 图片详情
            imgList: [],
        }
    },
    created() {
        this.getPhotoInfo();
        this.getThumbs();

    },
    methods: {
        getPhotoInfo() {
            this.$http.get('http://www.liulongbin.top:3005/api/getimageInfo/' + this.id).then(res => {
                // console.log(res);
                if(res.body.status === 0) {
                    this.photoinfo = res.body.message[0];
                }
            })
        },
        getThumbs() {
            this.$http.get('http://www.liulongbin.top:3005/api/getthumimages/' + this.id).then(res => {
                if(res.body.status === 0) {
                    res.body.message.forEach(ele => {
                        this.imgList.push(ele.src);
                    })
                }
            })
        },
        imgClick() {
            ImagePreview(this.imgList);
        }
    },
    components: {
        comment
    }
}
</script>
<style lang="scss" scoped>
.photoinfo {
    padding: 10px 20px;
    h3 {
        margin-bottom: 10px;
    }
    .subtitle {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
    }
    .imgs {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        img {
            height: 80px;
            margin-bottom: 10px;
        }
    }
}

</style>


