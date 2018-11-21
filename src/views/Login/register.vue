<template>
  <div id="register">
    <Header :showLeft="showLeft">
      <p slot="title">注册</p>
    </Header>
    <div class="telphone">
      <!-- <mt-cell title="手机号归属地" is-link to="/citys">
        <p>{{ selectedCity.city }}（+{{ selectedCity.tel }}）</p>
      </mt-cell> -->
    </div>
    <mt-field label="手机号码" v-model="form.tel" placeholder="请输入手机号码"></mt-field>
    <!-- <mt-cell class="share" title="验证码">
      <input type="text" placeholder="请输入验证码" v-model="form.code">
      <p v-show="codeSta" @click="getCode" style="font-size: 0.8rem;color:#cda041;">获取验证码</p>
      <mt-button v-show="!codeSta" style="font-size: 0.6rem;" size="small" type="primary">{{time + ' 秒后获取'}}</mt-button>
    </mt-cell> -->
    <!-- <p class="price">用户名和推荐人输入后将不能更改，请仔细和对</p> -->
    <mt-field label="用户名" placeholder="请输入用户名"  v-model="form.name"></mt-field>
    <mt-field label="推荐人" placeholder="请输入推荐人用户名" v-model="form.oName"></mt-field>
    <!-- <div class="jiedian">
      <mt-field label="节点人" placeholder="请输入节点人名称" v-model="form.jd_user"></mt-field>
      <select v-model="side">
        <option value="1">左</option>
        <option value="2">右</option>
      </select>
    </div> -->
    <!-- <p class="price">设置登录密码和交易密码</p> -->
    <mt-field label="登录密码" type="password" placeholder="请输入密码" v-model="form.password"></mt-field>
    <mt-field label="交易密码" type="password" placeholder="请输入交易密码" v-model="form.ppassword"></mt-field>
    <mt-button :class="{ active: isActive }" @click.native="register" class="confirm" size="small" type="default">立即注册</mt-button>
  </div>
</template>

<script>
import Header from '@/components/header'

export default {
  data () {
    return {
      codeSta: true,
      time: 60,
      form: {
        tel: '',
        code: '',
        name: '',
        oName: '',
        // jd_user: '',
        password: '',
        ppassword: ''
      },
      // side: 1,
      showLeft: true,
      showTitle: true,
      isActive: false
    }
  },
  watch: {
    form: {
      handler (newValue, oldValue) {
        if (oldValue.tel && oldValue.name && oldValue.oName && oldValue.password && oldValue.ppassword) {
          this.isActive = true
        } else {
          this.isActive = false
        }
      },
      deep: true
    }
  },
  methods: {
    // getCode () {
    //   let reg = /^(13[0-9]|15[012356789]|17[3678]|18[0-9]|14[57])[0-9]{8}$/
    //   if (!reg.test(this.form.tel)) {
    //     this.$toast({
    //       message: '请检查您的手机格式',
    //       position: 'bottom',
    //       duration: 1000
    //     })
    //     return false
    //   }
    //   this.codeSta = false
    //   var params = new FormData()
    //   params.append('tel', this.form.tel)
    //   params.append('type', '注册')
    //   this.axios.post(process.env.API_ROOT + '/api/block/send_codes', params).then((res) => {
    //     let data = res.data
    //     this.$toast({
    //       message: data.msg,
    //       position: 'bottom',
    //       duration: 1000
    //     })
    //   })
    //   let timer = setInterval(() => {
    //     this.time--
    //     if (this.time === 0) {
    //       clearInterval(timer)
    //       this.codeSta = true
    //       this.time = 60
    //     }
    //   }, 1000)
    // },
    register () {
      if (!this.isActive) return false
      let reg = /^(13[0-9]|15[012356789]|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      if (!reg.test(this.form.tel)) {
        this.$toast({
          message: '请检查您的手机格式',
          position: 'bottom',
          duration: 1000
        })
        return false
      }
      if (this.form.password.length < 6 || this.form.password.length > 15) {
        this.$toast({
          message: '登录密码长度不正确',
          position: 'bottom',
          duration: 1000
        })
        return false
      }
      if (this.form.name.length < 2) {
        this.$toast({
          message: '用户名长度大于两位',
          position: 'bottom',
          duration: 1000
        })
        return false
      }
      if (this.form.oName.length < 2) {
        this.$toast({
          message: '推荐人长度大于两位',
          position: 'bottom',
          duration: 1000
        })
        return false
      }
      // if (this.form.jd_user.length < 2) {
      //   this.$toast({
      //     message: '节点人长度大于两位',
      //     position: 'bottom',
      //     duration: 1000
      //   })
      //   return false
      // }
      if (this.form.ppassword.length < 6 || this.form.ppassword.length > 15) {
        this.$toast({
          message: '交易密码长度不正确',
          position: 'bottom',
          duration: 1000
        })
        return false
      }
      let passwordreg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,15}$/
      if (!passwordreg.test(this.form.password) || !passwordreg.test(this.form.ppassword)) {
        this.$toast({
          message: '密码需要英文字母+数字',
          position: 'bottom',
          duration: 1000
        })
        return false
      }
      var params = new FormData()
      params.append('username', this.form.name)
      params.append('password', this.form.password)
      params.append('erji', this.form.ppassword)
      params.append('leader_user', this.form.oName)
      // params.append('jd_user', this.form.jd_user)
      // params.append('side', this.side)
      // params.append('code', this.form.code)
      params.append('tel', this.form.tel)
      this.axios.post(process.env.API_ROOT + '/api/login/zhuce', params).then((res) => {
        let data = res.data
        this.$toast({
          message: data.msg,
          position: 'bottom',
          duration: 1000
        })
        if (res.data.code === 1) {
          this.$router.push('/login')
        }
      })
    }
  },
  computed: {
    selectedCity () {
      return this.$store.state.selectedCity
    }
  },
  components: {
    Header
  },
  mounted () {
  }
}
</script>

<style lang="stylus">
#register
  position absolute
  top 0
  bottom 0
  left .6rem
  right .6rem
  @media (min-width 768px) {
    width 60%
    height 400px
    padding 8% 5%
    left 15%
    top 20%
    border-radius .4rem
    box-shadow 0 0 20px 3px #666
  }
  .telphone
    margin-top 5rem
    @media (min-width 768px) {
      margin-top 1rem
    }
  .mint-cell
    border-bottom 1px solid #999
    background none
    .mint-cell-wrapper
      background-image none
      .mint-cell-value
        font-size .8rem
    .mint-cell-title
      width 80px
      font-size .8rem
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
  .price
    height 26px
    line-height 26px
    padding 0 .8rem
    background #cda041
    color #ebebeb
  .jiedian
    overflow hidden
    border-bottom: 1px solid #999;
    .mint-cell
      float left
      width 70%
      border-bottom none
    select
      float right
      width 20%
      min-height 28px
      margin-top 10px
      background rgba(0,0,0,.4)
      color #cda041
      border-color #999
      outline none
      option
        background #333
        color #ccc
  .total
    display flex
    p
      height 26px
      line-height 26px
      flex 1
      background #ddd
      color #cda041
      text-align center
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
</style>
