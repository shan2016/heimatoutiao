<template>
  <div class="editPersonal">
    <hmheader title="编辑个人信息">
      <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
      <!-- <span slot='right'>退出</span> -->
    </hmheader>
    <div class="head">
      <img :src="current.head_img" alt />
      <van-uploader :after-read="afterRead"></van-uploader>
    </div>
    <hmcell title="昵称" :desc="current.nickname" @click="nickshow=!nickshow"></hmcell>
    <!-- 以组件的方式来使用dialog -->
    <van-dialog v-model="nickshow" title="标题" show-cancel-button @confirm="updateNickname">
      <!-- 如果需要使用ref的方式获取数据，不能添加clearable -->
      <van-field required :value="current.nickname" label="昵称" placeholder="请输入昵称" ref="nickname" />
    </van-dialog>
    <hmcell title="密码" :desc="current.password" type="password" @click="passshow=!passshow"></hmcell>
    <van-dialog v-model="passshow" title="修改密码" show-cancel-button @confirm='updatePassword' :before-close='beforeClose'>
        <!-- 如果需要使用ref的方式获取数据，不能添加clearable -->
      <van-field required label="原密码" placeholder="请输入原密码" ref='oldPwd'/>
      <van-field required label="新密码" placeholder="请输入新密码" ref='newPwd'/>
    </van-dialog>
    <hmcell title="性别" :desc="current.gender===1?'男':'女'" @click="gendershow=!gendershow"></hmcell>
    <van-dialog v-model="gendershow" title="修改性别" show-cancel-button @confirm='updateGender'>
      <van-picker
        :columns="['女','男']"
        :default-index="current.gender"
        @change="onChange"
      />
    </van-dialog>
  </div>
</template>

<script>
import hmheader from '@/components/hm_header.vue'
import hmcell from '@/components/hm_cell.vue'
import { uploadFile } from '@/api/uploadFile.js'
import { getUserInfo, editUserInfo } from '@/api/users.js'
export default {
  data () {
    return {
      id: '',
      current: {},
      nickshow: false,
      passshow: false,
      gendershow: false,
      genderIndex: ''
    }
  },
  components: {
    hmheader,
    hmcell
  },
  async mounted () {
    this.id = this.$route.params.id
    let res = await getUserInfo(this.id)
    if (res.data.message === '获取成功') {
      this.current = res.data.data
      if (this.current.head_img) {
        this.current.head_img =
          localStorage.getItem('hm_40_baseURL') + this.current.head_img
      } else {
        this.current.head_img =
          localStorage.getItem('hm_40_baseURL') + '/uploads/image/default.png'
      }
    } else {
      this.$toast.fail('获取用户信息失败，请重试')
    }
  },
  methods: {
    //   修改头像
    async afterRead (file) {
      //   console.log(file)
      let formdata = new FormData()
      formdata.append('file', file.file)
      let res = await uploadFile(formdata)
      if (res.data.message === '文件上传成功') {
        let res1 = await editUserInfo(this.id, { head_img: res.data.data.url })
        console.log(res1)
        if (res1.data.message === '修改成功') {
          this.$toast.success('修改用户头像成功')
          this.current.head_img =
            localStorage.getItem('hm_40_baseURL') + res.data.data.url
        } else {
          this.$toast.success('修改用户头像失败，请重试')
        }
      }
    },
    //   修改昵称
    async updateNickname () {
    //   console.log(this.$refs.nickname.$refs.input.value)
      let nickname = this.$refs.nickname.$refs.input.value
      let res = await editUserInfo(this.id, { nickname })
      if (res.data.message === '修改成功') {
        this.$toast.fail('修改昵称成功')
        this.current.nickname = nickname
      } else {
        this.$toast.fail('修改昵称失败')
      }
    },
    // 修改密码
    async updatePassword () {
      let oldPwd = this.$refs.oldPwd.$refs.input.value
      if (this.current.password === oldPwd) {
        let password = this.$refs.newPwd.$refs.input.value
        if (!/\w{3,16}/.test(password)) {
          this.$toast.fail('请输入3~16位的新密码')
          return
        }
        let res = await editUserInfo(this.id, { password })
        if (res.data.message === '修改成功') {
          this.$toast.success('修改成功')
          localStorage.removeItem('heima_40_token')
          localStorage.removeItem('hm_40_baseURL')
          this.$router.push({ name: 'login' })
        }
      } else {
        this.$toast.fail('原始密码输入不正确')
      }
    },
    beforeClose (action, done) {
      let oldPwd = this.$refs.oldPwd.$refs.input.value
      let password = this.$refs.newPwd.$refs.input.value
      if (action === 'confirm' && this.current.password !== oldPwd) {
        this.$toast.fail('原始密码输入不正确')
        done(false)
      } else if (action === 'confirm' && !/\w{3,16}/.test(password)) {
        this.$toast.fail('请输入3~16位的新密码')
        done(false)
      } else {
        done()
      }
    },
    // 修改性别
    async updateGender () {
      let res = await editUserInfo(this.id, { gender: this.genderIndex })
      // console.log(res)
      if (res.data.message === '修改成功') {
        this.$toast.success('修改性别成功')
        this.current.gender = this.genderIndex
      } else {
        this.$toast.fail('修改性别失败')
      }
    },
    onChange (picker, value, index) {
      this.genderIndex = index
    }
  }
}
</script>

<style lang='less' scoped>
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;

  img {
    display: block;
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    border-radius: 50%;
  }
  /deep/.van-uploader__upload {
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
  }
  /deep/.van-uploader {
    // 实现任意元素居中
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
}
</style>
