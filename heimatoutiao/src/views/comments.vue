<template>
  <div class="comments">
    <myheader title="精彩评论">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <div class="commentList">
      <div class="item" v-for="comment in commentList" :key="comment.id">
        <div class="head">
          <img :src="comment.user.head_img" alt />
          <div>
            <p>{{comment.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span @click="replayComment(comment)">回复</span>
        </div>
        <!--v-if:判断是否需要生成评论块，如果有parent说明有上一级则需要生成  -->
        <!-- :comment：你需要生成的评论块的数据源 -->
        <commentItem v-if="comment.parent" :comment="comment.parent"
        @replayComment='replayComment'></commentItem>
        <div class="text">{{comment.content}}</div>
      </div>
    </div>
    <!-- 添加发表评论区域 -->
    <commentArea
      :article="article"
      :replayObj="parentReplayObj"
      @refresh="init"
      @resetValue="parentReplayObj = null"
    ></commentArea>
  </div>
</template>

<script>
import myheader from '@/components/hm_header.vue'
import commentItem from '@/components/hm_comment_item.vue'
import commentArea from '@/components/hm_commentArea.vue'
import { getArticleDetail } from '@/api/article.js'
import { getCommentsById } from '@/api/users.js'
export default {
  components: {
    myheader, commentItem, commentArea
  },
  data () {
    return {
      commentList: [],
      article: {},
      parentReplayObj: {}
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      //   获取文章id
      let id = this.$route.params.id
      // 获取当前文章数据
      let post = await getArticleDetail(id)
      // console.log(post)
      this.article = post.data.data
      // 获取当前文章的评论
      let res = await getCommentsById(id, { pageSize: 50 })
      // console.log(res)
      if (res.status === 200) {
        this.commentList = res.data.data.map(value => {
          value.user.head_img = localStorage.getItem('hm_40_baseURL') + value.user.head_img
          return value
        })
      }
      // 让评论列表滚动到顶部
      window.scrollTo(0, 0)
    },
    replayComment (comment) {
    //   console.log(comment)
      this.parentReplayObj = comment
    }
  }
}
</script>

<style lang='less' scoped>
.commentList {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
</style>
