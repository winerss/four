<template>
  <div id="balance">
    <Header :showLeft="showLeft">
      <p slot="title">{{ title }}</p>
    </Header>
    <div class="container">
      <div class="income" :class="{active:isActive}">
        <p class="current">{{lang.lable2}}</p>
        <p class="curMoney">{{curMoney}}</p>
      </div>
      <div class="detail">
        <p class="title"><span></span>{{lang.lable3}}</p>
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
  </div>
</template>

<script>
import Header from '@/components/header'
export default {
  data () {
    return {
      showLeft: true,
      title: '',
      type: 0,
      items: [],
      curMoney: 0,
      lang: {},
      isActive: false
    }
  },
  created () {
    this.isActive = false
  },
  methods: {
    getTitle () {
      let type = this.$route.params.type.split('=')[0]
      if (type === 'balance') {
        this.type = 0
        if (localStorage.getItem('language') === 'en') {
          this.title = '结算系统资产通证 balance'
        } else {
          this.title = '结算系统资产通证余额'
        }
      } else if (type === 'consume') {
        this.type = 1
        if (localStorage.getItem('language') === 'en') {
          this.title = 'Consumption points'
        } else {
          this.title = '消费积分'
        }
      } else if (type === 'cash') {
        this.type = 3
        if (localStorage.getItem('language') === 'en') {
          this.title = 'Cashintegral'
        } else {
          this.title = '现金积分'
        }
      } else if (type === 'enroll_point') {
        this.type = 9
        if (localStorage.getItem('language') === 'en') {
          this.title = 'Register points'
        } else {
          this.title = '注册积分'
        }
      }
    },
    getData () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('type', this.type)
      this.axios.post(process.env.API_ROOT + '/api/user/get_money_detail', params).then((res) => {
        let data = res.data.data
        this.items = data
      })
    }
  },
  components: {
    Header
  },
  mounted () {
    this.curMoney = this.$route.params.type.split('=')[1]
    this.getTitle()
    this.getData()
    let lang = {
      en: {
        lable2: 'Current value',
        lable3: 'Asset details'
      },
      cn: {
        lable2: '当前值为',
        lable3: '资产明细'
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
  }
}
</script>

<style lang="stylus">
#balance
  position absolute
  top 0
  left 0
  right 0
  bottom 2.8rem
  font-size .8rem
  color #333
  overflow-y scroll
  -webkit-overflow-scrolling touch
  &::-webkit-scrollbar
    display none
  .container
    margin-top 3.8rem
    .income
      width 90%
      margin 1rem auto
      padding 1.5rem 0
      @media (min-width 768px) {
        width 80%
        margin 1rem auto
        padding 2rem 0
      }
      text-align center
      // background #0f0f0f
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
        box-shadow 0px 0px 10px 2px #333
      .current
        font-size .8rem
        @media (min-width 768px) {
          font-size 1rem
          line-height 2rem
        }
      .curMoney
        font-size 1.6rem
        line-height 3rem
        color #cda041
        @media (min-width 768px) {
          font-size 1.2rem
        }
    .detail
      .title
        padding 0 .6rem
        color #cda041
        span
          display inline-block
          height 10px
          width 10px
          margin-right .5rem
          background #cda041
      .items
        color #333
        .item
          color #999
          margin-top 8px;
          padding 0 .6rem
          height 60px
          line-height 30px
          border-top 1px solid #ebebeb
          border-bottom 1px solid #ebebeb
          .top,.bottom
            display flex
            justify-content space-between
          .top
            p:nth-child(1)
              color #cda041
            p:nth-child(2)
              color #CD0000
</style>
