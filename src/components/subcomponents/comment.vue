<template>
    <div class="comment">
        <h3>发表评论</h3>
        <hr>
        <textarea v-model='msg' maxlength="120" rows="3" placeholder="最多不超过120字"></textarea>
        <van-button type="warning" size="large" @click="postComment">发表</van-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, index) in comments" :key="index">
                <div class="cmt-title">
                    第{{ index+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间:{{ item.add_time | dateFormat('YYYY-MM-DD') }}
                </div>
                <div class="cmt-body">
                    {{ item.content === 'undefined' ? '此用户很赖，啥都没说' : item.content }}
                </div>
            </div>
        </div>
        <van-button :loading="isLoading" class="more" size="large" @click="getMore">加载更多</van-button>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    props: {
        newsId: {
            type: [String, Number]
        }
    },
    data() {
        return {
            pageIndex: 1,
            comments: [],
            isLoading: false,
            msg: '',
        }
    },
    created() {
        this.getComments();
    },
    methods: {
        getComments() {
            this.$http.get('http://www.liulongbin.top:3005/api/getcomments/' + this.newsId + '?pageindex=' + this.pageIndex).then(res => {
                if (res.body.status === 0) {
                    var comments = this.comments;
                    comments.push(...res.body.message);
                    this.comments = comments;
                    this.isLoading = false;
                } else {
                    Toast('获取评论失败');
                }
            })

        },
        getMore() { // 加载更多
            this.isLoading = true;
            this.pageIndex++;
            this.getComments();
        },
        postComment() {
            // 校验是否为空
            if(this.msg.trim().length === 0) {
               return Toast('评论内容不能为空');
            }
            // 发表评论
            // 参数一：请求的 url 地址
            // 参数二：提交给服务器的数据对象 { content: this.msg }
            // 参数三：定义提交时候，表单中数据的格式
            this.$http.post('http://www.liulongbin.top:3005/api/postcomment/' + this.newsId, {
                content: this.msg.trim()
            }).then(function(res) {
                if(res.body.status === 0) {
                    // 1. 拼接出一个评论对象
                    var cmt = { 
                        user_name: '匿名用户',
                        add_time: Date.now(),
                        content: this.msg.trim()
                    };
                    this.comments.unshift(cmt);
                    this.msg = '';
                    Toast('评论发送成功')
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.comment {
    h3 {
        margin-top: 20px;
    }
}
textarea {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
}
.cmt-item {
    margin-top: 16px;
    font-size: 13px;
    .cmt-title {
        background-color: #eee;
        margin-bottom: 5px;
    }
}
.more {
    margin-top: 10px;
}
</style>


