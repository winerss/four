<template>
  <div id="login">
    <Header :showRight="showRight">
      <p slot="title">登录</p>
      <!-- <p slot="right" @click="goPages('/language')">语言</p> -->
    </Header>
    <div class="container">
      <div class="logo">
        <img src="../../assets/img/logo_i.png" alt="">
      </div>
      <mt-field label="用户名" placeholder="用户名" v-model='form.name'></mt-field>
      <mt-field label="登录密码" placeholder="请输入登录密码" type="password" v-model='form.password'></mt-field>
      <div class="bottom"><p @click="goPages('/register')">新用户注册</p><p @click="goPages('/password')">找回密码</p></div>
      <mt-button :class="{ active: isActive }" @click="login" class="confirm" size="small" type="default">登录</mt-button>
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
  color #000
  input:-webkit-autofill , textarea:-webkit-autofill, select:-webkit-autofill
    -webkit-text-fill-color: #ededed !important;
    -webkit-box-shadow: 0 0 0px 1000px transparent  inset !important;
    background-color:transparent;
    background-image: none;
    transition: background-color 50000s ease-in-out 0s;
  @media (min-width 768px) {
    width 60%
    height 400px
    padding 8% 5%
    left 15%
    top 20%
    border-radius .4rem
    box-shadow 0 0 20px 3px #666
  }
  input
    background-color:transparent;
  .container
    position absolute
    top 2.8rem
    bottom 0
    left .6rem
    right .6rem
    overflow-y scroll
    -webkit-overflow-scrolling touch
    &::-webkit-scrollbar
      display none
    .logo
      margin-top 2rem
      text-align center
      margin-bottom 2rem
      img
        height 5rem
    .mint-cell
      background none
      margin-top .4rem
      border-bottom 1px solid #999
      .mint-cell-wrapper
        background-image none
      .mint-cell-title
        width 80px
        color #cda041
      .mint-cell-text
        vertical-align top
        font-size .8rem
      .mint-cell-value
        input
          font-size .8rem
          color #999
          outline none
          background none
    .confirm
      display block
      width 80%
      max-width 300px
      margin 2.5rem auto
      background #999
      color #ccc
    .active
      background #00c087
      color #fff
    .bottom
      margin-top 1rem
      display flex
      justify-content space-between
      padding 0 .6rem
      color #cda041
</style>
