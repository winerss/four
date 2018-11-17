<template>
  <div id="password">
    <Header :showLeft="showLeft">
      <p slot="title">找回密码</p>
    </Header>
    <div class="telphone">
      <mt-cell title="手机号归属地" is-link to="/citys">
        <p>{{ selectedCity.city }}（+{{ selectedCity.tel }}）</p>
      </mt-cell>
    </div>
    <mt-field label="手机号码" v-model="form.tel" placeholder="请输入手机号码"></mt-field>
    <mt-cell title="验证码">
      <input type="text" v-model="form.code" placeholder="请输入验证码">
      <p v-show="codeSta" @click="getCode" style="font-size: 0.8rem;color:#cda041;">获取验证码</p>
      <mt-button v-show="!codeSta" size="small" style="font-size: 0.6rem;" type="primary">{{time + ' 秒后获取'}}</mt-button>
    </mt-cell>
    <mt-field label="用户名" placeholder="请输入用户名"  v-model="form.name"></mt-field>
    <mt-button :class="{ active: isActive }" @click.native="confirm" class="confirm" size="small" type="default">确定</mt-button>
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
        name: '',
        code: ''
      },
      showLeft: true,
      showTitle: true,
      isActive: false
    }
  },
  watch: {
    form: {
      handler (newValue, oldValue) {
        if (oldValue.tel && oldValue.name && oldValue.code) {
          this.isActive = true
        } else {
          this.isActive = false
        }
      },
      deep: true
    }
  },
  methods: {
    getCode () {
      let reg = /^(13[0-9]|15[012356789]|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      if (!reg.test(this.form.tel)) {
        this.$toast({
          message: '请检查您的手机格式',
          position: 'bottom',
          duration: 1000
        })
        return false
      }
      this.codeSta = false
      var params = new FormData()
      params.append('tel', this.form.tel)
      params.append('type', '找回密码')
      this.axios.post(process.env.API_ROOT + '/api/block/send_codes', params).then((res) => {
        let data = res.data
        this.$toast({
          message: data.msg,
          position: 'bottom',
          duration: 1000
        })
      })
      let timer = setInterval(() => {
        this.time--
        if (this.time === 0) {
          clearInterval(timer)
          this.codeSta = true
          this.time = 60
        }
      }, 1000)
    },
    confirm () {
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
      var params = new FormData()
      params.append('username', this.form.name)
      params.append('tel', this.form.tel)
      params.append('code', this.form.code)
      this.axios.post(process.env.API_ROOT + '/api/login/find_password', params).then((res) => {
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
#password
  padding 0 .6rem
  .telphone
    border-top 1px solid #ddd
    margin-top 2.8rem
  .share
    .mint-cell-wrapper
      .mint-cell-title
        flex inherit
        width 80px
  .mint-cell
    border-bottom 1px solid #999
    background none
    .mint-cell-wrapper
      background-image none
    .mint-cell-title
      width 80px
      flex inherit
    .mint-cell-text
      vertical-align top
      font-size .8rem
      color #cda041
    .mint-cell-value
      input, p
        font-size .8rem
        color #999
        outline none
        background none
      p
        color #999
  .price
    height 26px
    line-height 26px
    padding 0 .8rem
    background #ddd
    color #cda041
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
    margin 2.5rem auto
    background #999
    color #ccc
  .active
    background #00c087
    color #fff
</style>
