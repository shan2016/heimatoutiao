<template>
  <div class="index">
    <div class="header">
      <span class="iconfont iconnew icon"></span>
      <div class="center">
        <van-icon name="search" />&nbsp;&nbsp;&nbsp;搜索商品
      </div>
      <van-icon name="manager-o" class="icon" />
    </div>
    <van-tabs v-model="active" sticky swipeable>
      <van-tab :title="cate.name" v-for="cate in cateList" :key="cate.id">
        <!-- 上拉加载 -->
        <van-list
          :immediate-check="false"
          :offset="300"
          v-model="cate.loading"
          :finished="cate.finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <!-- 下拉 刷新 -->
          <van-pull-refresh
          v-model="cate.isLoading"
           @refresh="onRefresh">
            <!-- 动态渲染当前栏目的新闻数据 -->
          <articleblock v-for="post in cate.postList" :key="post.id" :post="post"></articleblock>
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>
    <div class="newsList"></div>
  </div>
</template>

<script>
import { getCateList } from '@/api/cate.js'
import { getArticleList } from '@/api/article.js'
import articleblock from '@/components/hm_articleBlock.vue'
export default {
  components: {
    articleblock
  },
  data () {
    return {
      active: localStorage.getItem('heima_40_token') ? 1 : 0,
      cateList: []
    }
  },
  watch: {
    active () {
      // 获取当前栏目的新闻数据
      // 如果当前栏目的新闻列表数据长度为0,说明还没有获取过这个栏目的新闻数据，那么就需要发起请求获取数据
      // 如果已经有数据，则无需再次发起请求
      if (this.cateList[this.active].postList.length === 0) {
        this.getPostList()
      }
    }
  },
  async mounted () {
    let res = await getCateList()
    // console.log(res)
    if (res.status === 200) {
      this.cateList = res.data.data
      // console.log(this.cateList)
      this.cateList = this.cateList.map(value => {
        return {
          ...value,
          postList: [], // 当前栏目的新闻列表数据
          pageIndex: 1, // 当前栏目的页码
          pageSize: 8, // 当前栏目每页所显示的新闻数量
          loading: false,
          finished: false,
          isLoading: false
        }
        // return console.log(value)
      })
      // console.log(this.cateList)
      this.getPostList()
    }
  },
  methods: {
    // 获取默认栏目的新闻数据
    async getPostList () {
      let res = await getArticleList({
        pageIndex: this.cateList[this.active].pageIndex,
        pageSize: this.cateList[this.active].pageSize,
        category: this.cateList[this.active].id
      })

      this.cateList[this.active].postList.push(...res.data.data)

      this.cateList[this.active].loading = false
      this.cateList[this.active].isLoading = false
      if (res.data.data.length < this.cateList[this.active].pageSize) {
        this.cateList[this.active].finished = true
      }
      // console.log(res)
      // 新闻数据存储在当前栏目的postList中，每个栏目都有一个单独的文章列表数组
      // this.cateList[this.active].postList = res.data.data;
    },
    onLoad () {
      // 异步更新数据
      this.cateList[this.active].pageIndex++
      setTimeout(() => {
        this.getPostList()
      }, 3000)
    },
    onRefresh () {
      this.cateList[this.active].pageIndex = 1
      this.cateList[this.active].finished = false
      setTimeout(() => {
        this.cateList[this.active].postList.length = 0
        this.getPostList()
      }, 1000)
    }
  }
}
</script>

<style lang='less' scoped>
.index {
  .header {
    height: 50 * 100vw/360;
    display: flex;
    justify-content: space-between;
    background-color: #f00;
    align-items: center;
    color: #fff;
    .icon {
      font-size: 25px;
      padding: 0 10px;
    }
    .iconnew {
      font-size: 60px;
    }
    .center {
      flex: 1;
      height: 40px;
      line-height: 40px;
      background-color: rgba(255, 255, 255, 0.5);
      text-align: center;
      border-radius: 20px;
    }
  }
}
</style>
