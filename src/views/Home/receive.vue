<template>
  <div id="receive">
    <Header :showLeft="showLeft" :showTitle="showTitle">
      <p slot="title">{{lang.lable1}}</p>
    </Header>
    <div class="container">
      <div class="qrcode">
        <div id="qrcode"></div>
      </div>
      <p class="copyContent">{{address}}</p>
      <p v-clipboard:copy="address"
         v-clipboard:success="onCopy" class="copy">{{lang.lable2}}</p>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header'
import QRCode from 'qrcodejs2'

export default {
  data () {
    return {
      address: '',
      showLeft: true,
      showTitle: true,
      lang: {}
    }
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
    transfer_host () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/transfer_host', params).then((res) => {
        let data = res.data
        this.address = data.data[0]
        this.qrcode()
      })
    },
    qrcode () {
      let qrcode = new QRCode('qrcode', {
        width: 100,
        height: 100, // 高度
        text: this.address // 二维码内容
      })
      console.log(qrcode)
    }
  },
  components: {
    Header
  },
  mounted () {
    this.transfer_host()
    let lang = {
      en: {
        lable1: 'Receive',
        lable2: 'Clicking copy'
      },
      cn: {
        lable1: '接收',
        lable2: '点击复制'
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
#receive
  .container
    position absolute
    top 2.4rem
    bottom 0
    left 0
    right 0
    background #f5f5f5
    overflow-y scroll
    -webkit-overflow-scrolling touch
    &::-webkit-scrollbar
      display none
    @media (min-width: 1024px) {
      width 1024px
      left 50%
      margin-left -512px
    }
    .qrcode
      width 50%
      padding 2rem
      margin 1rem auto
      background #fff
      img
        width 100%
        margin 0 auto
    .copyContent
      padding .5rem .6rem
      background #fff
      font-size 1rem
      color #666
      line-height 1.4rem
    .copy
      color #26a2ff
      text-align center
      font-size 1rem
      margin-top 1rem
</style>
