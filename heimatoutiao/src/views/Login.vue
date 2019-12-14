<template>
   <div id="app">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
          <hminput type="text"
          placeholder="请输入用户名/手机号"
          :value="users.username"
          @input="handlerinput"
          :rules='/^1\d{10}$/'
          msg_err='手机号输入不合法，请输入11位手机号'></hminput>
          <hminput type="password" :value="users.password"></hminput>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class>去注册</a>
      </p>
      <hmbutton text='登陆' @click='login'></hmbutton>
    </div>
  </div>
</template>

<script>
import hmbutton from '@/components/hm_button.vue'
import hminput from '@/components/hm_input.vue'
export default {
  data () {
    return {
      users:
        {
          username: 'jack',
          password: '123'
        }
    }
  },
  components: {
    hmbutton, hminput
  },
  methods: {
    login (event) {
    //   console.log(event)
    },
    handlerinput (data) {
    //   console.log(data)
      this.users.username = data
    }
  }
}
</script>

<style lang='less'>
.container {
  padding: 20px;
  height: 100vh;
  background-color: rgb(242,242,242);
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>
