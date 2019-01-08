<template>
    <div class="newslist">
        <div v-for="(item, index) in newslist" :key="index">
            <router-link :to="'/home/newsinfo/'+item.id" tag="div" class="list">
                <img :src="item.img_url" alt="">
                <div class="title">
                    <p>{{ item.title }}</p>
                    <div>
                        <span>发表时间：</span>
                        <span>{{ item.add_time | dateFormat('YYYY-MM-DD') }}</span>
                        <span>点击：</span>
                        <span>{{ item.click }}次</span>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
export default {
  data() {
    return {
      newslist: []
    };
  },
  created() {
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      //获取新闻列表
      this.$http
        .get("http://www.liulongbin.top:3005/api/getnewslist")
        .then(res => {
          if (res.body.status === 0) {
            this.newslist = res.body.message;
          } else {
            Toast("获取新闻列表失败");
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.list {
  display: flex;
  padding: 10px;
  // box-sizing: border-box;
  font-size: 12px;
  border-bottom: 1px solid #dfdfdf;
  img {
    width: 50px;
    height: 50px;
  }
  .title {
    display: flex;
    flex-direction: column;
    margin-left: 5px;
    p {
      margin-top: 2px;
      margin-bottom: 5px;
      font-weight: bold;
      font-size: 14px;
    }
    div {
      display: flex;
      position: relative;
      width: 300px;
      span {
        &:nth-of-type(3) {
          position: absolute;
          right: 25px;
        }
        &:last-of-type {
          position: absolute;
          right: 10px;
        }
      }
    }
  }
}
</style>


