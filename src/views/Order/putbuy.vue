<template>
  <div id="putbuy">
    <div class="price">
      <p>最高价：CNY {{max}}</p>
      <p>最低价：CNY {{min}}</p>
    </div>
    <mt-field label="买单价格" :placeholder="tips" v-model='form.price'></mt-field>
    <mt-field label="买单数量" placeholder="请输入100~2000且100的倍数" v-model="form.amount"></mt-field>
    <mt-cell title="手机归属地" is-link to="/citys">
      <p>{{ selectedCity.city }}（+{{ selectedCity.tel }}）</p>
    </mt-cell>
    <mt-field label="手机号码" v-model="form.tel" readonly placeholder="请输入手机号码"></mt-field>
    <div class="telphone">
      <mt-cell title="验证码">
        <input type="text" v-model="form.code">
        <p v-show="codeSta" @click="getCode" style="font-size: 0.8rem;color:#26a2ff;">获取验证码</p>
        <mt-button v-show="!codeSta" style="font-size: 0.6rem;" size="small" type="primary">{{time + ' 秒后获取'}}</mt-button>
      </mt-cell>
    </div>
    <mt-field label="支付密码" type="password" placeholder="请输入≥6的字母+数字的密码" v-model="form.password"></mt-field>
    <p class="total">总价：CNY {{form.amount * form.price}}</p>
    <mt-button :class="{ active: isActive }" class="confirm" @click="confirm" size="small" type="default">确认买单</mt-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      codeSta: true,
      time: 60,
      max: 0,
      min: 0,
      tips: '',
      form: {
        price: '',
        amount: '',
        password: '',
        code: '',
        tel: ''
      },
      isActive: false
    }
  },
  watch: {
    form: {
      handler (newValue, oldValue) {
        if (oldValue.tel && oldValue.price && oldValue.amount && oldValue.password && oldValue.code) {
          this.isActive = true
        } else {
          this.isActive = false
        }
      },
      deep: true
    }
  },
  computed: {
    selectedCity () {
      return this.$store.state.selectedCity
    }
  },
  methods: {
    get_user_info () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/get_user_info', params).then((res) => {
        this.form.tel = res.data.data.tel
      })
    },
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
      params.append('type', '挂买单')
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
    getcurPrice () {
      this.axios.post(process.env.API_ROOT + '/api/transfer/get_sale_qujian').then((res) => {
        let data = res.data
        this.max = data.data.max
        this.min = data.data.min
        this.tips = `请输入${this.min} ~ ${this.max}之间的价格`
      })
    },
    confirm () {
      if (!this.isActive) return false
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('type', 1)
      params.append('price', this.form.price)
      params.append('amount', this.form.amount)
      params.append('tel', this.form.tel)
      params.append('code', this.form.code)
      params.append('erji', this.form.password)
      this.axios.post(process.env.API_ROOT + '/api/transfer/sale', params).then((res) => {
        let data = res.data
        this.$toast({
          message: data.msg,
          position: 'bottom',
          duration: 1000
        })
        if (data.code === 1) {
          this.$router.push('/myorder')
        }
      })
    }
  },
  mounted () {
    this.get_user_info()
    this.getcurPrice()
  }
}
</script>

<style lang="stylus">
#putbuy
  @media (min-width: 1024px) {
    width 1024px
    left 50%
    margin-left -512px
  }
  .price
    display flex
    p
      height 26px
      line-height 26px
      flex 1
      background #ddd
      color #26a2ff
      text-align center
  .mint-cell
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
  .total
    line-height 2rem
    padding 0 .8rem
  .confirm
    display block
    width 90%
    margin 1rem auto
    background #999
    color #ccc
  .active
    background #26a2ff
    color #fff
</style>
