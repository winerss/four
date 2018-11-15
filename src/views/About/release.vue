<template>
  <div id="release">
    <Header :showLeft="showLeft" :showTitle="showTitle">
      <p slot="title">{{title}}</p>
    </Header>
    <div class="container">
      <div class="income" :class="{active:isActive}">
        <p class="current">当前值为</p>
        <p class="curMoney" >{{ curMoney }}</p>
      </div>
      <div class="detail">
        <p class="title"><span></span>资产明细</p>
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
      <!-- <p class="footer" @click="goPage">兑换注册积分</p> -->
    </div>
  </div>
</template>

<script>
import Header from '@/components/header'

export default {
  data () {
    return {
      showTitle: true,
      showLeft: true,
      items: [],
      curMoney: 0,
      isActive: false,
      type: 0,
      title: ''
    }
  },
  created () {
    this.isActive = false
  },
  methods: {
    getData () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('type', this.type)
      this.axios.post(process.env.API_ROOT + '/api/user/get_money_detail', params).then((res) => {
        let data = res.data.data
        this.items = data
      })
    },
    goPage () {
      this.$router.push('/convert')
    }
  },
  components: {
    Header
  },
  mounted () {
    this.curMoney = this.$route.params.id.split(',')[0]
    this.type = this.$route.params.id.split(',')[1]
    if (this.type === '3') {
      this.title = '现金钱包'
    } else if (this.type === '10') {
      this.title = '奖金钱包'
    } else if (this.type === '11') {
      this.title = '购物钱包'
    }
    this.getData()
    setTimeout(() => {
      this.$nextTick(function () {
        this.isActive = true
      })
    }, 500)
  }
}
</script>

<style lang="stylus">
#release
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  font-size .8rem
  .container
    position absolute
    top 2.8rem
    bottom 0
    left 0
    right 0
    padding 0 .8rem
    overflow-y scroll
    -webkit-overflow-scrolling touch
    &::-webkit-scrollbar
      display none
    .income
      width: 90%;
      margin: 1rem auto;
      padding: 1rem 0;
      color: #ebebeb;
      text-align: center;
      -webkit-box-shadow: 0px 2px 1px 3px #333;
      box-shadow: 0px 2px 1px 3px #333;
      border-radius: 0.4rem;
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
      .current
        font-size .8rem
      .curMoney
        font-size 1.6rem
        line-height 3rem
        color #cda041
    .detail
      margin-top 1rem
      .title
        color #cda041
        span
          display inline-block
          height 10px
          width 10px
          margin-right .5rem
          background #cda041
      .items
        // padding-bottom 2.4rem
        color #333
        .item
          margin-top 8px;
          height 60px
          line-height 30px
          border-top 1px solid #ddd
          border-bottom 1px solid #ddd
          .top,.bottom
            display flex
            justify-content space-between
          .top
            p:nth-child(1)
              color #cda041
            p:nth-child(2)
              color #CD0000
    // .footer
    //   position fixed
    //   left 0
    //   right 0
    //   bottom 0
    //   height 2rem
    //   line-height 2rem
    //   text-align center
    //   background #ccc
    //   color #cda041
</style>
