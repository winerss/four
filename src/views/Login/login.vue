<template>
  <div id="login">
    <Header :showRight="showRight">
      <p slot="right" @click="goPages('/language')">语言</p>
    </Header>
    <div class="container">
      <div class="logo">
        <img src="../../assets/img/avatar.png" alt="">
      </div>
      <mt-field label="账号" placeholder="用户名" v-model='form.name'></mt-field>
      <mt-field label="用户地址" placeholder="请输入登录密码" type="password" v-model='form.password'></mt-field>
      <mt-button :class="{ active: isActive }" @click="login" class="confirm" size="small" type="default">登录</mt-button>
      <div class="bottom"><p @click="goPages('/register')">新用户注册</p><p @click="goPages('/password')">找回密码</p></div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header'
export default {
  data () {
    return {
      showRight: true,
      form: {
        name: '',
        password: ''
      },
      isActive: false
    }
  },
  watch: {
    form: {
      handler (newValue, oldValue) {
        if (oldValue.name && oldValue.password) {
          this.isActive = true
        } else {
          this.isActive = false
        }
      },
      deep: true
    }
  },
  methods: {
    goPages (path) {
      this.$router.push(path)
    },
    login () {
      if (!this.isActive) return false
      localStorage.removeItem('sid')
      var params = new FormData()
      params.append('username', this.form.name)
      params.append('password', this.form.password)
      this.axios.post(process.env.API_ROOT + '/api/login/dologin', params).then((res) => {
        let data = res.data
        this.$toast({
          message: data.msg,
          position: 'bottom',
          duration: 1000
        })
        if (res.data.code === 1) {
          localStorage.setItem('sid', data.data.sid)
          this.$router.push('/home')
        }
      })
    }
  },
  components: {
    Header
  }
}
</script>

<style lang="stylus">
#login
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  font-size .8rem
  background #f5f5f5
  color #000
  @media (min-width: 1024px) {
    width 1024px
    left 50%
    margin-left -512px
  }
  .container
    position absolute
    top 2.4rem
    bottom 0
    left 0
    right 0
    overflow-y scroll
    -webkit-overflow-scrolling touch
    &::-webkit-scrollbar
      display none
    .logo
      margin-top 2rem
      text-align center
      margin-bottom 2rem
      img
        height 4rem
    .mint-cell
      margin-top .4rem
      border-bottom 1px solid #ddd
      background #fff
      .mint-cell-wrapper
        background-image none
      .mint-cell-title
        width 80px
      .mint-cell-text
        vertical-align top
        font-size .8rem
      .mint-cell-value
        input
          font-size .8rem
          color #333
          outline none
          background #fff
    .confirm
      display block
      width 90%
      margin 1rem auto
      background #999
      color #ccc
    .active
      background #26a2ff
      color #fff
    .bottom
      margin-top 4rem
      display flex
      justify-content space-around
      color #26a2ff
</style>
