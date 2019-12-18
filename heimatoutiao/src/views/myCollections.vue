<template>
  <div class="myCollections">
      <myheader title="我的收藏">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
      <articleblock v-for="item in collectList" :key="item.id" :post="item"></articleblock>
  </div>
</template>

<script>
import { getMyCollections } from '@/api/users.js'
import myheader from '@/components/hm_header.vue'
import articleblock from '@/components/hm_articleBlock.vue'
export default {
  data () {
    return {
      collectList: {}
    }
  },
  components: {
    articleblock, myheader
  },
  async mounted () {
    let res = await getMyCollections()
    // console.log(res)
    this.collectList = res.data.data
    console.log(this.collectList)
  }
}
</script>

<style>

</style>
