<template>
  <input
  type="text"
  class="inp"
  :value="value"
  @input="handlerinput"
  @blur='handlerblur'
  :class="{error:!statu,success:statu}">
</template>

<script>
export default {
  data () {
    return {
      statu: false
    }
  },
  props: ['value', 'rules', 'msg_err'],
  mounted () {
    // !!this.value等价于this.value? true: false
    this.statu = !!this.value
  },
  methods: {
    handlerinput (event) {
      let value = event.target.value

      if (this.rules) {
        if (this.rules.test(value)) {
          this.statu = true
        } else {
          this.statu = false
        }
      } else {
        this.statu = !!value
      }
      // console.log(event)
      this.$emit('input', value)
    },
    handlerblur (event) {
      if (this.rules && !this.rules.test(event.target.value)) {
        // console.log(this.msg_err)
        this.$toast.fail(this.msg_err)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.inp{
    width: 314*100vw/360;
    height: 40*100vw/360;
    border:none;
    outline: none;
    border-bottom: 2px solid rgb(117,117,117);
    font-size: 18px;
    margin: 5px 0;
    background-color: transparent;
}
.error{
    border-bottom-color:red;
}
.success{
    border-bottom-color:green;
}
</style>
