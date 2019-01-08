<template>
    <div class="newsinfo-container">
        <h3>{{ message.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ message.add_time | dateFormat('YYYY-MM-DD') }}</span>
            <span>点击: {{ message.click }}次</span>
        </p>
        <hr>
        <div class="content" v-html="message.content">

        </div>
        <!-- 评论子组件 -->
        <comment :newsId="this.id"></comment>
    </div>
</template>
<script>
import comment from '../subcomponents/comment.vue'
export default {
    data() {
        return {
            id: this.$route.params.id,
            message: ''
        }
    },
    created() {
        this.getNewsInfo();
    },
    methods: {
        getNewsInfo() {
            this.$http.get('http://www.liulongbin.top:3005/api/getnew/' + this.id).then(res => {
                if(res.body.status === 0) {
                    // console.log(res);
                    var message = res.body.message[0];
                    // console.log(message);
                    this.message = message;
                }else {
                }
            })
        }
    },
    components: {
        comment
    }
}
</script>
<style lang="scss" scoped>
.newsinfo-container {
    padding: 10px 20px;
    h3 {
        text-align: center;
        margin-bottom: 10px;
    }
    p {
        display: flex;
        font-size: 13px;
        justify-content: space-between;
    }
    hr {
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .content {
        font-size: 14px;
        color: #333;
    }
}
</style>


