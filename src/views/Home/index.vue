<template>
  <div id="home">
    <!-- <Header :showTitle="showTitle" :showRight="showRight">
      <p slot="title">{{lang.lable1}}</p>
      <router-link class="message-icon" slot="right" to="/message"><img src="../../assets/img/message.png" alt=""></router-link>
    </Header> -->
    <header>
      <router-link class="message-icon" to="/message"><img src="../../assets/img/message.png" alt=""></router-link>
      <p>GDC</p>
      <div @click="H5toNativeUrl" class="scan"><img src="../../assets/img/scan.png" alt=""></div>
    </header>
    <div class="container" ref="wrapper">
      <div class="wrapper">
        <div class="now-money" :class="{active:isActive}">
          <p class="title">{{lang.lable2}}</p>
          <p class="money1"  @click="goDetail('/balance', 'balance', today)">{{ today}}</p>
          <p class="title">{{lang.lable3}}</p>
          <p class="money2">{{ yesterday}}</p>
        </div>
        <div class="integration">
          <div class="consume" @click="goDetail('/balance', 'enroll_point', data.enroll_point)">
            <p class="title">{{lang.lable44}}</p>
            <p class="money">{{ data.enroll_point}}</p>
          </div>
          <div class="line"></div>
          <!-- <div class="consume" @click="goDetail('/balance', 'consume', data.zhu_point)">
            <p class="title">{{lang.lable4}}</p>
            <p class="money">{{ data.zhu_point}}</p>
          </div> -->
          <div class="line"></div>
          <div class="cash" @click="goDetail('/balance', 'cash', data.all_point)">
            <p class="title">{{lang.lable5}}</p>
            <p class="money">{{ data.all_point }}</p>
          </div>
        </div>
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="item in banner" class="banner" :key="item.id" :style="{backgroundImage: 'url(' +  url + item.img + ')'}">
          </mt-swipe-item>
        </mt-swipe>
        <p style="height:.8rem;"></p>
        <div class="operation">
          <div class="left" @click="goDetail('/transfer')">
            <div class="imgwrap animated rubberBand"><div class="img"><img src="../../assets/img/plane.png" alt=""></div></div>
            <p class="title">{{lang.lable6}}</p>
          </div>
          <div class="middle" @click="goDetail('/myorder')">
            <div class="imgwrap animated rubberBand"><div class="img"><img src="../../assets/img/platform.png" alt=""></div></div>
            <p class="title">我的交易平台</p>
          </div>
          <div class="right" @click="goDetail('/receive')">
            <div class="imgwrap animated rubberBand"><div class="img"><img src="../../assets/img/plane1.png" alt=""></div></div>
            <p class="title">{{lang.lable8}}</p>
          </div>
        </div>
        <div class="operation">
          <div class="left" @click="goDetail('/mall')">
            <div class="imgwrap animated rubberBand"><div class="img"><img src="../../assets/img/mall.png" alt=""></div></div>
            <p class="title">复消商城</p>
          </div>
          <div class="middle" @click="goDetail('/orderRecord')">
            <div class="imgwrap animated rubberBand"><div class="img"><img src="../../assets/img/record.png" alt=""></div></div>
            <p class="title">账单记录</p>
          </div>
          <div class="right" @click="goDetail('/noticeList')">
            <div class="imgwrap animated rubberBand"><div class="img"><img src="../../assets/img/notice.png" alt=""></div></div>
            <p class="title">公告</p>
          </div>
        </div>
        <div class="operation">
          <div class="left" @click="tips">
            <div class="imgwrap animated rubberBand"><div class="img"><img src="../../assets/img/zhibo.png" alt=""></div></div>
            <p class="title">直播间</p>
          </div>
          <div class="middle" @click="tips">
            <div class="imgwrap animated rubberBand"><div class="img"><img src="../../assets/img/jingcai.png" alt=""></div></div>
            <p class="title">体育竞猜</p>
          </div>
          <div class="right" @click="tips">
            <div class="imgwrap animated rubberBand"><div class="img"><img src="../../assets/img/jingji.png" alt=""></div></div>
            <p class="title">竞技游戏</p>
          </div>
        </div>
        <div class="operation">
          <div class="left" @click="tips">
            <div class="imgwrap animated rubberBand"><div class="img"><img src="../../assets/img/yiliao.png" alt=""></div></div>
            <p class="title">医疗咨询</p>
          </div>
          <div class="middle" @click="tips">
            <div class="imgwrap animated rubberBand"><div class="img"><img src="../../assets/img/huafei.png" alt=""></div></div>
            <p class="title">话费充值</p>
          </div>
          <div class="right" @click="tips">
            <div class="imgwrap animated rubberBand"><div class="img"><img src="../../assets/img/zixun.png" alt=""></div></div>
            <p class="title">新闻资讯</p>
          </div>
        </div>
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
      showRight: true,
      data: {},
      today: 0,
      yesterday: 0,
      lang: {},
      banner: [],
      url: '',
      isActive: true
    }
  },
  created () {
    this.isActive = false
    this.url = process.env.API_ROOT
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
    tips () {
      this.$toast({
        message: '筹备中敬请期待！',
        position: 'bottom',
        duration: 1000
      })
    },
    get_user_info () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/get_user_info', params).then((res) => {
        let data = res.data
        this.data = data.data
        console.log(data)
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
    },
    get_banner () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/block/banner', params).then((res) => {
        this.banner = res.data.data
        console.log(this.banner)
      })
    }
  },
  mounted () {
    this._initScroll()
    this.get_user_info()
    this.get_today()
    this.get_banner()
    let lang = {
      en: {
        lable1: 'Fairy grass mill',
        lable2: 'Current total income',
        lable3: 'Yesterday is earning',
        lable4: 'Consumption points',
        lable44: 'Register points',
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
        lable1: 'GDC资产通证',
        lable2: '当前收益',
        lable3: '昨日收益',
        lable4: '消费积分',
        lable44: '注册积分',
        lable5: '现金积分',
        lable6: '转出',
        lable7: '扫描',
        lable8: '转入',
        lable9: '免手续费',
        lable10: '扫一扫',
        lable11: '快速到账',
        lable12: '公告',
        lable13: '更多',
        lable14: '分享好友，获得分享收益，狂赚公益链',
        lable15: '分享收益=分享资产x利率（以定期其利率相同）',
        lable16: '我是有底线的'
      }
    }
    if (localStorage.getItem('language') === 'en') {
      this.lang = lang.en
    } else {
      this.lang = lang.cn
    }
    setTimeout(() => {
      this.$nextTick(function () {
        this.isActive = true
      })
    }, 500)
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
@import '../../../static/animate.css'
#home
  position absolute
  top 0
  left 0
  right 0
  bottom 2.8rem
  font-size .8rem
  color #000
  @media (min-width 1024px) {
    width 1024px
    left 50%
    margin-left -512px
  }
  header
    position: fixed;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
    height: 2.8rem;
    line-height: 2.8rem;
    font-weight: bold;
    background: #0f0f0f;
    color: #cda041;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    text-align: center;
    font-size: 0.8rem;
    border-bottom: 1px solid #e5d099;
    @media (min-width 1024px) {
      width 1024px
      left 50%
      margin-left -512px
    }
    .message-icon
      height 2.8rem
      display block
      padding-left .6rem
      img
        height 1.6rem
        margin-top .6rem
    .scan
      height 2.8rem
      display block
      padding-right .6rem
      img
        height 1.4rem
        margin-top .7rem
  .container
    position absolute
    top 2.8rem
    bottom 0
    left 0
    right 0
    overflow hidden
    .wrapper
      padding-top 1rem
    .now-money
      width 90%
      margin 0 auto
      padding 1rem 0 0
      color #ebebeb
      background #0f0f0f
      text-align center
      border-radius .4rem
      -webkit-transition: transform .5s, opacity .5s, box-shadow .5s ease-out .2s;
      -moz-transition: transform .5s, opacity .5s, box-shadow .5s ease-out .2s;
      -ms-transition: transform .5s, opacity .5s, box-shadow .5s ease-out .2s;
      -o-transition: transform .5s, opacity .5s, box-shadow .5s ease-out .2s;
      transition: transform .5s, opacity .5s, box-shadow .5s ease-out .2s;
      transition-timing-function: ease-out;
      -moz-transition-timing-function: ease-out; /* Firefox 4 */
      -webkit-transition-timing-function: ease-out; /* Safari 和 Chrome */
      -o-transition-timing-function: ease-out; /* Opera */
      box-shadow:0 0px 0px 0 rgba(33,33,33,0);
      transform-origin: top left;
      transform:rotateX(-180deg) rotateY(20deg);
      -webkit-transform:rotateX(-180deg) rotateY(20deg);
      opacity: 0;
      &.active
        transform:rotateX(0deg) rotateY(0deg);
        -webkit-transform:rotateX(0deg) rotateY(0deg);
        opacity:1;
        box-shadow 0px 0px 10px 2px #cda041
      .title1
        font-size .8rem
        line-height 2rem
      .money1
        font-size 1.6rem
        color #cda041
        line-height 3rem
      .money2
        font-size 1rem
        color #cda041
        line-height 3rem
    .center
      height 8rem
      color #ebebeb
      text-align center
      line-height 1.4rem
      img
        margin-top 1rem
        width 2rem
    .mint-swipe
      height 8rem
    .integration
      display flex
      height 3rem
      padding .8rem 0
      text-align center
      color #cda041
      .consume, .cash
        flex 1
        .title
          line-height 1.6rem
          font-size .6rem
          color #ebebeb
        .money
          line-height 1.4rem
          font-size .8rem
      .line
        width 2px
        height 2rem
        margin-top .5rem
    .banner
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    .operation
      display flex
      padding .8rem 0
      border-top 1px solid #cda041
      .left,.middle,.right
        flex 1
        text-align center
        .imgwrap
          margin 0 auto
          height 3.4rem
          width 3.4rem
          background url('../../assets/img/bubble.png')
          background-size cover
          img
            height 2rem
            width 2rem
            margin .7rem
        .title
          color #ebebeb
          line-height 2rem
          font-size .8rem
          width 100px
          margin 0 auto
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
      .middle
        border-right 1px solid #cda041
        border-left 1px solid #cda041
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
