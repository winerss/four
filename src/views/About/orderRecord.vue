<template>
  <div id="orderRecord">
    <Header :showLeft="showLeft" :showTitle="showTitle" :showRight="showRight">
      <p slot="title">我的账单</p>
      <p slot="right" @click="toggle">筛选</p>
    </Header>
    <div class="container">
      <div class="btn-group animated slideInDown"  v-show="show">
        <mt-button v-for="(item, index) in btns" @click.native="picker(item.id)" :key="index" size="small" type="default">{{item.name}}</mt-button>
      </div>
      <div class="items">
        <div class="item" v-for="(item, index) in items" :key="index">
          <div class="top">
            <p>{{item.note}}</p>
            <p>{{item.account}}</p>
          </div>
          <div class="bottom">
            <p>{{item.create_time}}</p>
            <p>{{item.c_account}}</p>
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
      showRight: true,
      show: true,
      items: [],
      btns: [{id: 0, name: '全部'}, {id: 1, name: '消费积分'}, {id: 2, name: '现金积分'}, {id: 4, name: '冻结钱包'}, {id: 5, name: '消费收益'}, {id: 6, name: '算力释放'}, {id: 7, name: '发送/接收'}, {id: 8, name: '交易'}, {id: 4, name: '存入钱包'}]
    }
  },
  methods: {
    toggle () {
      this.show = !this.show
    },
    picker (id = 0) {
      this.show = !this.show
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('type', id)
      this.axios.post(process.env.API_ROOT + '/api/user/get_money_detail', params).then((response) => {
        this.items = response.data.data
        console.log(this.items)
      })
    }
  },
  components: {
    Header
  },
  mounted () {
    this.picker()
  }
}
</script>

<style lang="stylus">
@import '../../../static/animate.css'
#orderRecord
  .container
    position absolute
    top 2.8rem
    bottom 2.8rem
    left 0
    right 0
    overflow-y scroll
    -webkit-overflow-scrolling touch
    &::-webkit-scrollbar
      display none
    .btn-group
      position fixed
      top 2.4rem
      left 0
      right 0
      padding 1rem 0
      background #fff
      font-size 0
      @media (min-width 768px) {
        width 768px
        left 50%
        margin-left -384px
      }
      button
        width 30%
        margin-left 2.6%
        margin-top .6rem
    .items
      color #333
      .item
        padding .4rem .6rem
        margin-top 8px;
        height 2.4rem
        line-height 1.2rem
        border-top 1px solid #ebebeb
        border-bottom 1px solid #ebebeb
        .top,.bottom
          display flex
          justify-content space-between
          color #CD0000
        .top
          p:nth-child(1)
            color #cda041
        .bottom
          p:nth-child(1)
            color #999
</style>
