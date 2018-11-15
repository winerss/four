<template>
  <div id="buyOrder">
    <div class="title">
      <p>{{lang.label}}</p>
      <p>{{lang.label2}}</p>
      <p>{{lang.label3}}</p>
    </div>
    <div class="title-price">
      <p>{{common}}CNY</p>
      <p>{{max}}CNY</p>
      <p>{{min}}CNY</p>
    </div>
    <div class="content">
      <div class="wrapper" ref="wrapper">
        <div class="items">
          <div class="item" v-for="(item, index) in items" :key="index">
            <div class="text">
              <p class="nick-name">{{item.self_nickname}}</p>
              <p class="item-time">{{item.create_time}}</p>
              <!-- <p class="item-sign" style="color: #cda041;" v-if="item.sign === '1'">挂释放钱包</p> -->
              <p class="item-sign" style="color: #cda041;" v-if="item.sign === '1'">挂现金积分</p>
            </div>
            <div class="item-body">
              <div class="left">
                <p>数量（个）</p>
                <p class="money">{{item.amount}}</p>
              </div>
              <div class="center">
                <p>单价（元）</p>
                <p class="money">{{item.price}}</p>
              </div>
              <div class="right">
                <p>总计（元）</p>
                <p class="money">{{(item.amount * item.price).toFixed(5)}}</p>
              </div>
            </div>
            <div class="item-footer">
              <div class="right">
                <mt-button @click.native="match_transfer_action(item.id)" size="small" v-if="item.is_match === 1" style="color: #cda041">成交</mt-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      common: 0,
      max: 0,
      min: 0,
      items: [],
      lang: {}
    }
  },
  methods: {
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
    getData () {
      this.axios.post(process.env.API_ROOT + '/api/block/get_day_price').then((res) => {
        console.log(res)
        let data = res.data
        this.common = data.data.common
        this.max = data.data.max
        this.min = data.data.min
      })
    },
    getMatch () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('type', 1)
      this.axios.post(process.env.API_ROOT + '/api/transfer/match_transfer', params).then((res) => {
        this.items = res.data.data
      })
    },
    match_transfer_action (id) {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('id', id)
      params.append('type', 1)
      this.axios.post(process.env.API_ROOT + '/api/transfer/match_transfer_action', params).then((res) => {
        this.items = res.data.data
        this.$toast({
          message: res.data.msg,
          position: 'bottom',
          duration: 1000
        })
      })
    }
  },
  mounted () {
    this.getData()
    this.getMatch()
    this._initScroll()
    let lang = {
      en: {
        label: 'Guide price',
        label2: 'Highest price',
        label3: 'Lowest price'
      },
      cn: {
        label: '指导价',
        label2: '最高价',
        label3: '最低价'
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
#buyOrder
  position absolute
  top 2.8rem
  width 100%
  bottom 0
  overflow hidden
  .title
    display flex
    position absolute
    z-index 2
    top 0
    width 100%
    height 2.6rem
    line-height 2.6rem
    text-align center
    color #cda041
    border-bottom 1px solid rgb(105, 105, 105)
    p
      flex 1
  .title-price
    display flex
    position absolute
    z-index 2
    top 2.6rem
    width 100%
    height 2.6rem
    line-height 2.6rem
    text-align center
    color #ebebeb
    border-bottom 1px solid rgb(105, 105, 105)
    p
      flex 1
  .content
    position absolute
    top 5.2rem
    left 0
    right 0
    bottom 0
    .items
      color #ebebeb
      .item
        margin-bottom .6rem
        border-top 1px solid  rgb(105, 105, 105)
        border-bottom 1px solid  rgb(105, 105, 105)
        .text
          padding 0 .6rem
          display flex
          justify-content space-between
          line-height 2.6rem
          padding-right .6rem
        .item-body
          padding 0 .6rem
          display flex
          justify-content space-between
          line-height 1.8rem
          text-align center
          .money
            color #ebebeb
        .item-footer
          overflow hidden
          button
            margin .4rem
            float right
            padding 0 .4rem
            font-size .8rem
            height 1.4rem
</style>
