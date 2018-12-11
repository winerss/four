<template>
  <div id="about">
    <Header :showTitle="showTitle" :showRight="showRight">
      <p slot="title">{{lang.title}}</p>
    </Header>
    <div class="container" ref="wrapper">
      <div class="wrapper">
        <div class="information">
          <div class="header">
            <div class="nickName">
              <div class="img-wrapper">
                <img :src='this.url+data.faceurl' alt="">
                <input class="selectImg" @change="upload($event)" type="file"  name="files" accept="image/*"/>
              </div>
              {{data.nickname}}
              <p class="lv">{{data.dengji}}</p>
            </div>
          </div>
          <!-- <p class="copyContent">{{address}}</p>
          <p  v-clipboard:copy="address"
              v-clipboard:success="onCopy" class="copy">{{lang.label2}}</p> -->
        </div>
        <div class="cell">
          <!-- <mt-cell title="我的分享" is-link to="/jstree">
            <img slot="icon" src="../../assets/img/share.png" width="24" height="24">
          </mt-cell> -->
          <mt-cell title="我的钱包" is-link @click.native="goPages('/release/', data.all_point)">
            <img slot="icon" src="../../assets/img/tixian.png" width="24" height="24">
            {{data.all_point}}
          </mt-cell>
          <mt-cell title="账单记录" is-link to="/orderRecord">
            <img slot="icon" src="../../assets/img/record.png" width="24" height="24">
          </mt-cell>
          <mt-cell title="消息中心" is-link to="/message">
            <img slot="icon" src="../../assets/img/zixun.png" width="24" height="24">
          </mt-cell>
          <mt-cell title="手机号码" is-link to="/changeTel">
            <img slot="icon" src="../../assets/img/tel.png" width="24" height="24">
          </mt-cell>
          <mt-cell title="修改登录密码" is-link to="/changePass/login">
            <img slot="icon" src="../../assets/img/password.png" width="24" height="24">
          </mt-cell>
          <mt-cell title="修改支付密码" is-link to="/changePass/pay'">
            <img slot="icon" src="../../assets/img/payp.png" width="24" height="24">
          </mt-cell>
          <mt-cell title="关于" is-link to="/aboutapp">
            <img slot="icon" src="../../assets/img/about.png" width="24" height="24">
          </mt-cell>
          <mt-cell title="清除缓存" @click.native="clear">
            <img slot="icon" src="../../assets/img/dataed.png" width="24" height="24">
          </mt-cell>
          <mt-button @click.native="clear" v-show="layoutShow" size="small" class="layout">退出</mt-button>
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
      address: '',
      data: {},
      lang: {},
      avatar: '',
      money: {},
      url: '',
      layoutShow: false
    }
  },
  created () {
    this.url = process.env.API_ROOT
  },
  methods: {
    onCopy: function (e) {
      this.$toast({
        message: '复制成功',
        position: 'bottom',
        duration: 1000
      })
    },
    onError: function (e) {
      this.$toast({
        message: '复制失败',
        position: 'bottom',
        duration: 1000
      })
    },
    logout () {
      localStorage.clear()
      this.$router.push('/login')
    },
    upload (e) {
      let file = e.target.files[0]
      let param = new FormData()
      param.append('file', file, file.name)
      param.append('sid', localStorage.getItem('sid'))
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      // 添加请求头
      this.axios.post(process.env.API_ROOT + '/api/user/change_faceurl', param, config).then(response => {
        this.$toast({
          message: response.data.msg,
          position: 'bottom',
          duration: 1000
        })
        window.location.reload()
      })
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
    clear () {
      localStorage.clear()
      this.$toast({
        message: '缓存已清除',
        position: 'bottom',
        duration: 1000
      })
      this.$router.push('/login')
    },
    get_user_info () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/get_user_info', params).then((res) => {
        let data = res.data
        this.data = data.data
      })
    },
    getAddress () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/transfer_host', params).then((res) => {
        let data = res.data.data[0]
        this.address = data
      })
    },
    goPage (path) {
      this.$router.push(path)
    },
    goPages (path, type) {
      this.$router.push(path + type)
    }
  },
  mounted () {
    this.get_user_info()
    this.getAddress()
    // this._initScroll()
    let lang = {
      en: {
        title: 'Me',
        label: 'Settings',
        label2: 'Copy',
        label3: 'Frozen purse',
        label4: 'Release the wallet',
        label33: 'reward purse',
        label44: 'shopping the wallet',
        label5: 'Sharing dividends',
        label6: 'My Order',
        label7: 'Biling record',
        label8: 'QR code',
        label9: 'Product center'
      },
      cn: {
        title: '我的',
        label: '设置',
        label2: '复制地址',
        label3: '冻结钱包',
        label4: '现金钱包',
        label33: '奖金钱包',
        label44: '购物钱包',
        label5: '分享奖励',
        label6: '我的交易平台',
        label7: '账单记录',
        label8: '我的二维码',
        label9: '产品中心'
      }
    }
    if (localStorage.getItem('language') === 'en') {
      this.lang = lang.en
    } else {
      this.lang = lang.cn
    }
    setTimeout(() => {
      this.layoutShow = true
    }, 100)
  },
  components: {
    Header
  }
}
</script>

<style lang="stylus">
#about
  position absolute
  top 0
  left 0
  right 0
  bottom 2.8rem
  font-size .8rem
  overflow-x hidden
  overflow-y auto
  color #333
  background #fff
  .mint-cell
    background none
    border-bottom 1px solid #ebebeb
    .mint-cell-text
      font-size .6rem
      color #333
    .mint-cell-allow-right::after
      // border: solid 2px #00c087
      border-bottom-width 0
      border-left-width 0
  .container
    position absolute
    top 2.8rem
    bottom 0
    left 0
    right 0
    .wrapper
      padding-bottom 2.8rem
    .box
      margin-top .8rem
      padding .8rem
      background #fff
    .information
      height 10rem
      // padding 2rem 1.8rem 5rem
      color #333
      background: url('../../assets/img/banner.jpg');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      @media (min-width 768px) {
        height 12rem
        padding 1.5rem 10%
      }
      overflow hidden
      .header
        height 6rem
        width 6rem
        margin 1.5rem auto
        font-size 1.8rem
        text-align center
        border-radius 50%
        .lv{
          margin-top .5rem
          font-size 1rem
        }
        @media (min-width 768px) {
          height 6rem
          width 6rem
        }
        .img-wrapper
          position relative
          overflow hidden
          input
            position absolute
            z-index 9999
            left 0
            right 0
            top 0
            bottom 0
            opacity 0
            fill-opacity 0
            background rgba(0,0,0,0)
          img
            height 4rem
            width 4rem
            @media (min-width 768px) {
              height 6rem
              width 6rem
            }
      .copyContent
        line-height 3rem
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
      .copy
        display inline-block
        padding 0 .4rem
        line-height 1.4rem
        height 1.4rem
        font-size .6rem
        color #fff
        border-radius .4rem
        background #00c087
    .packet
      position absolute
      width 90%
      left 5%
      top 9.4rem
      display flex
      height 2.4rem
      padding 1.2rem 0
      text-align center
      box-shadow 0 0 2px 4px #333
      color #cda041
      background rgba(0,0,0,.5)
      border-radius .4rem
      margin-bottom .8rem
      @media (min-width 768px) {
        height 5rem
        width 80%
        left 10%
      }
      .consume, .cash
        flex 1
        .title
          line-height 1.2rem
          color #ebebeb
          display flex
          color #00c087
          justify-content center
          img
            height 1.2rem
            margin-right .1rem
        .money
          line-height 1.4rem
          font-size .6rem
      .line
        width 1px
        height 2.4rem
        background #cda041
    .cell
      margin-top 1rem
      @media (min-width 768px) {
        width 80%
        margin 4rem auto 0
        padding-bottom 2rem
        border-radius .4rem
        box-shadow 0 0 20px 3px #666
      }
      .layout
        display: block;
        width: 90%;
        max-width 300px
        background: #00c087;
        color: #fff;
        margin: 2rem auto;
</style>
