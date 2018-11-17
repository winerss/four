<template>
  <div id="putsale">
    <mt-radio
      v-model="value"
      :options="options">
    </mt-radio>
    <mt-field v-show="this.value === '1'" label="卖单单价"  v-model="common"></mt-field>
    <mt-field label="卖单数量" placeholder="请输入100~2000且100的倍数" v-model="form.amount"></mt-field>
    <mt-field label="交易密码" type="password" placeholder="请输入≥6的字母+数字的密码" v-model="form.password"></mt-field>
    <!-- <mt-cell title="手机归属地" is-link to="/citys">
      <p>{{ selectedCity.city }}（+{{ selectedCity.tel }}）</p>
    </mt-cell> -->
    <mt-field label="手机号码" v-model="form.tel" readonly placeholder="请输入手机号码"></mt-field>
    <div class="total">
      <p>总价：CNY {{total}}</p>
      <p>手续费：CNY {{fear * common * form.amount}}</p>
    </div>
    <!-- <div class="telphone">
      <mt-cell title="验证码">
        <input type="text" v-model="form.code" placeholder="请输入验证码">
        <p v-show="codeSta" @click="getCode" style="font-size: 0.8rem;color:#cda041;">获取验证码</p>
        <mt-button v-show="!codeSta" size="small" style="font-size: 0.6rem;" type="primary">{{time + ' 秒后获取'}}</mt-button>
      </mt-cell>
    </div> -->
    <mt-button :class="{ active: isActive }" @click="confirm" class="confirm" size="small" type="default">确认卖单</mt-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      codeSta: true,
      time: 60,
      common: 0,
      total: 0,
      fear: 0,
      form: {
        amount: '',
        password: '',
        // code: '',
        tel: ''
      },
      isActive: false,
      value: '1',
      options: [{
        label: '挂现金积分', value: '1'
      }]
      // options: [{
      //   label: '挂释放钱包', value: '1'
      // }, {
      //   label: '挂现金积分', value: '2'
      // }]
    }
  },
  watch: {
    form: {
      handler (newValue, oldValue) {
        if (oldValue.tel && oldValue.password && oldValue.amount) {
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
    //   params.append('type', '挂卖单')
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
    getcurPrice () {
      this.axios.post(process.env.API_ROOT + '/api/transfer/get_sale_qujian').then((res) => {
        let data = res.data
        this.common = data.data.common
      })
    },
    feared () {
      this.axios.post(process.env.API_ROOT + '/api/transfer/poundage').then((res) => {
        this.fear = parseFloat(res.data.data.sx_scale)
      })
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
      params.append('sid', localStorage.getItem('sid'))
      params.append('type', 2)
      params.append('price', this.common)
      params.append('amount', this.form.amount)
      params.append('erji', this.form.password)
      params.append('tel', this.form.tel)
      // params.append('code', this.form.code)
      params.append('sign', this.value)
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
    this.feared()
  }
}
</script>

<style lang="stylus">
#putsale
  position fixed
  top 5.2rem
  left .6rem
  right .6rem
  bottom 0
  overflow-y: scroll
  @media (min-width 768px) {
    width 500px
    left 50%
    margin-left -250px
  }
  .mint-radio-input:checked + .mint-radio-core
    background-color rgb(205,160,65)
    border-color #cda041
  .mint-radio-input:checked + .mint-radio-core::after
    background-color #000
  .mint-radio-input + .mint-radio-core
    background-color rgba(0,0,0,0)
    border-color #cda041
  .mint-radiolist
    .mint-cell-title
      width 180px !important
  .price
    height 26px
    line-height 26px
    padding 0 .8rem
    background #ddd
    color #fff
  .mint-radiolist
    .mint-radiolist-title
      margin 0
    @media (min-width 768px) {
      margin-top 2rem
    }
  .mint-cell
    border-bottom 1px solid #999
    background none
    .mint-radio-label
      font-size .8rem
    .mint-cell-wrapper
      background-image none
    .mint-cell-title
      width 80px
      color #cda041
      flex inherit
    .mint-cell-text
      vertical-align top
      font-size .8rem
    .mint-cell-value
      p
        font-size .8rem
      input
        font-size .8rem
        color #999
        outline none
        background none
  .total
    display flex
    justify-content space-between
    padding 0 .6rem
    p
      height 26px
      line-height 26px
      flex 1
      color #cda041
    p:nth-child(1){
      @media (min-width 768px) {
        text-align left
      }
    }
    p:nth-child(2){
      @media (min-width 768px) {
        text-align right
      }
    }
  .confirm
    display block
    width 90%
    max-width 200px
    margin 1rem auto
    background #999
    color #ccc
  .active
    background #00c087
    color #fff
</style>
