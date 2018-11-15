<template>
  <div id="saleOrder">
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
            <p class="item-time">{{item.create_time}}</p>
            <div class="item-body">
              <div class="left">
                <p>数量（个）</p>
                <p>{{item.amount}}</p>
              </div>
              <div class="center">
                <p>单价（元）</p>
                <p>{{item.price}}</p>
              </div>
              <div class="right">
                <p>总计（元）</p>
                <p>{{item.amount * item.price}}</p>
              </div>
            </div>
            <div class="item-footer">
              <div class="right">
                <mt-button @click.native="match_transfer_action(item.id)" size="small" v-if="item.is_match === 1" style="color: #26a2ff">匹配</mt-button>
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
        let data = res.data
        this.common = data.data.common
        this.max = data.data.max
        this.min = data.data.min
      })
    },
    getMatch () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('type', 2)
      this.axios.post(process.env.API_ROOT + '/api/transfer/match_transfer', params).then((res) => {
        this.items = res.data.data
      })
    },
    match_transfer_action (id) {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('id', id)
      params.append('type', 2)
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
#saleOrder
  position absolute
  top 2.4rem
  width 100%
  bottom 0
  overflow hidden
  background #f5f5f5
  @media (min-width: 1024px) {
    width 1024px
    left 50%
    margin-left -512px
  }
  .title
    display flex
    position absolute
    z-index 2
    top 0
    width 100%
    height 2rem
    background #fff
    line-height 2rem
    text-align center
    color #999
    p
      flex 1
  .title-price
    display flex
    position absolute
    z-index 2
    top 2rem
    width 100%
    height 2rem
    background #fff
    line-height 2rem
    text-align center
    color #999
    p
      flex 1
  .content
    position absolute
    top 4.4rem
    left 0
    right 0
    bottom 0
    .items
      color #999
      .item
        margin-bottom .4rem
        border-top 1px solid #ddd
        border-bottom 1px solid #ddd
        background #fff
        .item-time
          text-align right
          line-height 1.6rem
          padding-right .6rem
        .item-body
          padding 0 .6rem
          border-top 1px solid #ebebeb
          border-bottom 1px solid #ebebeb
          display flex
          justify-content space-between
          line-height 1.6rem
          text-align center
        .item-footer
          overflow hidden
          button
            margin .4rem
            float right
            padding 0 .4rem
            font-size .8rem
            height 1.4rem
</style>
