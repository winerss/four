<template>
    <div id="productOrder">
        <Header :showTitle="showTitle" :showLeft="showLeft">
            <p slot="title">我的订单</p>
        </Header>
        <div class="container">
            <div class="content">
                <div class="wrapper" ref="wrapper">
                    <div class="items">
                        <div class="item" v-for="item in datas" :key="item.id">
                            <div class="top">
                                <p>产品名称：{{item.title}}</p>
                                <p>购买时间：{{item.create_time}}</p>
                            </div>
                            <div class="center">
                                <p>收货人：{{item.name}}</p>
                                <p>联系方式：{{item.phone}}</p>
                            </div>
                            <div class="detail">
                                <p v-show="item.type === '1'">报单购买</p>
                                <p v-show="item.type === '2'">重复消费</p>
                                <p>{{item.detail}}</p>
                            </div>
                            <div class="bottom">
                                <p>积分数：{{item.price}}</p>
                                <p v-show="item.is_fa === '0'">发货状态：未发货</p>
                                <p v-show="item.is_fa === '1'">发货状态：已发货发货</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
      datas: []
    }
  },
  methods: {
    // _initScroll () {
    //   this.$nextTick(() => {
    //     if (!this.scroll) {
    //       this.scroll = new BScroll(this.$refs.wrapper, {
    //         click: true,
    //         scrollY: true,
    //         probeType: 2
    //       })
    //     } else {
    //       this.scroll.refresh()
    //     }
    //   })
    // },
    getData () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/get_self_order', params).then((response) => {
        this.datas = response.data.data
      })
    }
  },
  components: {
    Header
  },
  mounted () {
    this.getData()
    // this._initScroll()
  }
}
</script>

<style lang="stylus">
#productOrder
  position absolute
  top 0
  left 0
  right 0
  bottom 2.8rem
  font-size .8rem
  color #000
  .container
    position absolute
    top 2.8rem
    bottom 0
    left 0
    right 0
    .content
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      overflow auto
      .items
        .item
            border-bottom 1px solid #999
            color #999
            padding .4rem .6rem
            margin-top .4rem
            .top, .center,.detail, .bottom
                display flex
                line-height 1.4rem
                justify-content space-between
                p
                    width 50%
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
</style>
