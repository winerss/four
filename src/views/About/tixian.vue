<template>
  <div id="tixian">
    <Header :showLeft="showLeft" :showTitle="showTitle">
      <p slot="title">{{lang.lable1}}</p>
    </Header>
    <div class="container">
      <p style="color: #cda041;line-height: 1.4rem">现金积分: {{all_point}}</p>
      <mt-field label="数量" placeholder="提现最多为现金积分的30%" @keyup.native="filter" v-model='form.amount'></mt-field>
      <mt-field label="银行卡号" placeholder="请输入银行卡号" v-model='form.bank'></mt-field>
      <mt-field label="开户行地址" placeholder="请输入开户行地址" v-model='form.bank_address'></mt-field>
      <mt-button :class="{ active: isActive }" class="confirm" size="small" @click="comfirm" type="default">{{lang.lable9}}</mt-button>
      <!-- <p class="tips">{{lang.lable8}}</p> -->
    </div>
  </div>
</template>

<script>
import Header from '@/components/header'
export default {
  data () {
    return {
      showLeft: true,
      showTitle: true,
      title: '',
      codeSta: true,
      time: 60,
      value: '1',
      form: {
        bank_address: '',
        bank: '',
        amount: ''
      },
      isActive: false,
      lang: {},
      all_point: 0
    }
  },
  watch: {
    form: {
      handler (newValue, oldValue) {
        if (oldValue.bank_address && oldValue.bank && oldValue.amount) {
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
    filter () {
      if (this.form.amount >= this.all_point * 0.3) {
        this.$toast({
          message: '提现最多为现金积分的30%',
          position: 'bottom',
          duration: 1000
        })
      }
    },
    get_user_info () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/get_user_info', params).then((res) => {
        this.all_point = res.data.data.all_point
      })
    },
    comfirm () {
      if (!this.isActive) return false
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('bank', this.form.bank)
      params.append('bank_address', this.form.bank_address)
      params.append('amount', this.form.amount)
      this.axios.post(process.env.API_ROOT + '/api/transfer/change_cash', params).then((res) => {
        let data = res.data
        this.$toast({
          message: data.msg,
          position: 'bottom',
          duration: 1000
        })
        if (data.code === 1) {
          this.$router.push('/about')
        }
      })
    }
  },
  components: {
    Header
  },
  mounted () {
    this.get_user_info()
    this.form.address = localStorage.getItem('scan') || ''
    let lang = {
      en: {
        lable1: 'Send',
        lable2: 'User address',
        lable3: 'Please enter user address',
        lable4: 'Send quantity',
        lable55: 'Please enter the number of',
        lable5: 'Please enter the number of',
        lable6: 'Pay the password',
        lable7: 'Please enter payment passv',
        lable8: 'Available assets canbe sent this time Qi assets',
        lable9: 'Confirmation of transfer'
      },
      cn: {
        lable1: '提现',
        lable2: '用户地址',
        lable3: '请输入用户地址',
        lable4: '发送数量',
        lable55: '请输入发送数量',
        lable5: '请输入发送数量',
        lable6: '交易密码',
        lable7: '请输入≥6的字母+数字的密码',
        lable8: '可用资产本次可发送个GDC资产通证资产',
        lable9: '确认转账'
      }
    }
    if (localStorage.getItem('language') === 'en') {
      this.lang = lang.en
    } else {
      this.lang = lang.cn
    }
  }
}
</script>

<style lang="stylus">
#tixian
  position absolute
  top 0
  left 0.6rem
  right .6rem
  bottom 0
  font-size .8rem
  color #333
  overflow-y scroll
  -webkit-overflow-scrolling touch
  &::-webkit-scrollbar
    display none
  .mint-radio-input:checked + .mint-radio-core
    background-color rgb(205,160,65)
    border-color #cda041
  .mint-radio-input:checked + .mint-radio-core::after
    background-color #000
  .mint-radio-input + .mint-radio-core
    background-color rgba(0,0,0,0)
    border-color #cda041
  .container
    margin-top 3.2rem
    .mint-radiolist
      .mint-cell-title
        width 180px !important
    .mint-cell
      border-bottom 1px solid #999
      background none
      .mint-cell-wrapper
        background-image none
        font-size .8rem
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
    .confirm
      display block
      width 80%
      margin 2.5rem auto
      background #999
      color #ccc
    .active
      background #cda041
      color #fff
    .tips
      text-align center
      .num
        color #cda041
</style>
