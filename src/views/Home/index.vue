<template>
  <div id="home">
    <Header :showTitle="showTitle">
      <p slot="title">{{lang.lable1}}</p>
    </Header>
    <div class="container" ref="wrapper">
      <div class="wrapper">
        <div class="box">
          <div class="income">
            <p class="current">{{lang.lable2}}</p>
            <p class="curMoney" @click="goDetail('/balance', 'balance', today)">{{ today }}</p>
            <p class="yesterday">{{lang.lable3}}</p>
            <p class="yesMoney">{{yesterday}}</p>
          </div>
        </div>
        <div class="box">
          <div class="integration">
            <div class="consume" @click="goDetail('/balance', 'consume', data.zhu_point)">
              <p class="title">{{lang.lable4}}</p>
              <p class="money">{{ data.zhu_point}}</p>
            </div>
            <div class="line"></div>
            <div class="cash" @click="goDetail('/balance', 'cash', data.cash_point)">
              <p class="title">{{lang.lable5}}</p>
              <p class="money">{{ data.cash_point }}</p>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="operation">
            <div class="left" @click="goDetail('/transfer')">
              <div class="imgwrap"><div class="img"><img src="../../assets/img/plane.png" alt=""></div></div>
              <p class="title">{{lang.lable6}}</p>
              <p class="descripte">{{lang.lable7}}</p>
            </div>
            <div class="center" @click="H5toNativeUrl">
              <div class="imgwrap"><div class="img"><img src="../../assets/img/scan.png" alt=""></div></div>
              <p class="title">{{lang.lable8}}</p>
              <p class="descripte">{{lang.lable9}}</p>
            </div>
            <div class="right" @click="goDetail('/receive')">
              <div class="imgwrap"><div class="img"><img src="../../assets/img/qrcode.png" alt=""></div></div>
              <p class="title">{{lang.lable10}}</p>
              <p class="descripte">{{lang.lable11}}</p>
            </div>
          </div>
        </div>
        <div class="box">
          <div class="notice">
            <div class="left" @click="goDetail('/noticeList')">
              <img src="../../assets/img/notice.png" alt="">
              {{lang.lable12}}
            </div>
            <div class="right" @click="goDetail('/noticeList')">{{lang.lable13}}</div>
          </div>
        </div>
        <div class="box">
          <div class="tips">
            <p class="title">{{lang.lable14}}</p>
            <p class="detail">{{lang.lable15}}</p>
          </div>
        </div>
        <p class="bottom">-----{{lang.lable16}}！-----</p>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Header from '@/components/header'
export default {
  data () {
    return {
      showTitle: true,
      data: {},
      today: 0,
      yesterday: 0,
      lang: {}
    }
  },
  created () {
    globalVue = this
  },
  methods: {
    H5toNativeUrl () {
      window.location.href = 'http://scan.com'
    },
    _initScroll () {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            click: true,
            scrollY: true,
            probeType: 2
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    get_user_info () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/get_user_info', params).then((res) => {
        let data = res.data
        this.data = data.data
      })
    },
    goDetail (path, type, money) {
      if (type) {
        this.$router.push(path + '/' + type + '=' + money)
      } else {
        this.$router.push(path)
      }
    },
    get_today () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/get_today', params).then((res) => {
        this.today = res.data.data.today
        this.yesterday = res.data.data.yesterday
      })
    }
  },
  mounted () {
    this._initScroll()
    this.get_user_info()
    this.get_today()
    let lang = {
      en: {
        lable1: 'Fairy grass mill',
        lable2: 'Current total income',
        lable3: 'Yesterday is earning',
        lable4: 'Consumption points',
        lable5: 'Cash integral',
        lable6: 'Send',
        lable7: 'Scan',
        lable8: 'Receive',
        lable9: 'No fee',
        lable10: 'Sweep the code to',
        lable11: 'Quickly Arrive',
        lable12: 'Notice',
        lable13: 'More',
        lable14: 'Share your friends and share you eco',
        lable15: 'Share income = share assets * interest rate (same as fixed rate)',
        lable16: 'I have bottom line'
      },
      cn: {
        lable1: '仙草坊',
        lable2: '当前收益',
        lable3: '昨日收益',
        lable4: '消费积分',
        lable5: '现金积分',
        lable6: '发送',
        lable7: '扫描',
        lable8: '接收',
        lable9: '免手续费',
        lable10: '扫码支付',
        lable11: '快速到账',
        lable12: '公告',
        lable13: '更多',
        lable14: '分享好友，获得分享资产，狂赚仙草链',
        lable15: '分享收益=分享资产x利率（以定期其利率相同）',
        lable16: '我是有底线的'
      }
    }
    if (localStorage.getItem('language') === 'en') {
      this.lang = lang.en
    } else {
      this.lang = lang.cn
    }
  },
  components: {
    Header
  }
}
var globalVue
window.reviced = function (res) {
  localStorage.setItem('scan', res)
  globalVue.$toast({
    message: res,
    position: 'bottom',
    duration: 1000
  })
  globalVue.$router.push('/transfer')
}
</script>

<style lang="stylus">
#home
  position absolute
  top 0
  left 0
  right 0
  bottom 2.6rem
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
    overflow hidden
    .box
      padding .8rem
      margin-top .8rem
      background #fff
    .income
      padding .8rem 0
      text-align center
      background #1b82d2
      border-radius .4rem
      color #fff
      .current
        font-size .8rem
      .curMoney
        font-size 1.6rem
        line-height 3rem
      .yesMoney
        font-size 1rem
        line-height 2rem
    .integration
      display flex
      height 2.4rem
      padding .5rem 0
      text-align center
      border-radius .4rem
      background #1b82d2
      color #fff
      .consume, .cash
        flex 1
        .title
          line-height 1.2rem
        .money
          line-height 1.4rem
          font-size 1rem
      .line
        width 2px
        height 2.4rem
        background #fff
    .operation
      display flex
      padding .8rem 0
      background #fff
      .left,.center,.right
        flex 1
        text-align center
        .imgwrap
          height 3.4rem
          width 3.4rem
          margin 0 auto
          border-radius 50%
          border .1rem solid #26a2ff
          .img
            width 2.8rem
            height 2.8rem
            margin .25rem auto
            border-radius 50%
            background #fff
            img
              width 1.8rem
              height 1.8rem
              margin .5rem auto
        .title
          line-height 2rem
          color #333
        .descripte
          font-size .6rem
          color #999
    .notice
      display flex
      justify-content space-between
      line-height 1rem
      color #000
      .left
        img
          float left
          height 1rem
          margin-right .4rem
    .tips
      padding .8rem
      border-radius .4rem
      background #1b82d2
      color #fff
      .detail
        text-align center
        line-height 2rem
        font-size .4rem
        color #e0e0e0
    .bottom
      margin-top .8rem
      color #999
      font-size .4rem
      letter-spacing 2px
      text-align center
      overflow hidden
</style>
