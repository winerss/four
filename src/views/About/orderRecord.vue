<template>
  <div id="orderRecord">
    <Header :showLeft="showLeft" :showTitle="showTitle" :showRight="showRight">
      <p slot="title">我的账单</p>
      <p slot="right" @click="toggle">筛选</p>
    </Header>
    <div class="container">
      <div class="btn-group" v-show="show">
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
      btns: [{id: 0, name: '全部'}, {id: 1, name: '消费积分'}, {id: 2, name: '现金积分'}, {id: 3, name: '释放积分'}, {id: 4, name: '冻结钱包'}, {id: 5, name: '消费收益'}, {id: 6, name: '算力释放'}, {id: 7, name: '发送/接收'}, {id: 8, name: '交易'}, {id: 4, name: '存入钱包'}]
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
#orderRecord
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
    .btn-group
      position fixed
      top 2.4rem
      left 0
      right 0
      bottom 0
      background rgb(255 , 255, 255)
      font-size 0
      button
        width 30%
        margin-left 2.6%
        margin-top .6rem
    .items
      color #333
      .item
        background #ffffff
        padding 0 .6rem
        margin-top 8px;
        height 60px
        line-height 30px
        border-top 1px solid #ddd
        border-bottom 1px solid #ddd
        .top,.bottom
          display flex
          justify-content space-between
</style>
