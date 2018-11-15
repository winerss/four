<template>
  <div id="messdetail">
    <div id="container">
        <div class="wrapper">
          <div class="items">
            <div class="item" v-for="(item, index) in data" :key="index">
              <p :class="item.is_self === 0 ? 'class-a' : 'class-b'">{{item.content}}</p>
            </div>
          </div>
        </div>
    </div>
    <div class="bottom">
        <input type="text" v-model="content">
        <button @click="send">{{lang.btn}}</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sign: '',
      content: '',
      data: [],
      time: null,
      lang: {}
    }
  },
  methods: {
    getData () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('sign', this.sign)
      this.axios.post(process.env.API_ROOT + '/api/words/update_words', params).then((res) => {
        this.data = res.data.data
      })
    },
    send () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('sign', this.sign)
      params.append('content', this.content)
      this.axios.post(process.env.API_ROOT + '/api/words/send_words', params).then((res) => {
        this.$toast({
          message: res.data.msg,
          position: 'bottom',
          duration: 1000
        })
        this.content = ''
      })
    }
  },
  mounted () {
    this.sign = this.$route.params.id
    this.time = setInterval(() => {
      this.getData()
    }, 1000)
    let lang = {
      en: {
        btn: 'Send'
      },
      cn: {
        btn: '发送'
      }
    }
    if (localStorage.getItem('language') === 'en') {
      this.lang = lang.en
    } else {
      this.lang = lang.cn
    }
  },
  beforeDestroy () {
    if (this.time) {
      clearInterval(this.time)
    }
  }
}
</script>

<style lang="stylus">
#messdetail
  #container
    .wrapper
      position absolute
      top 0
      left 0
      right 0
      bottom 2rem
      background #f5f5f5
      font-size .8rem
      color #000
      @media (min-width: 1024px) {
        width 1024px
        left 50%
        margin-left -512px
      }
      .items
        padding-bottom 5rem
        .item
          padding 0 .6rem
          p
            line-height 2rem
            margin-top .4rem
          .class-a
            text-align right
            background #ccc
            border-radius .4rem
            color #fff
            padding-right .4rem
          .class-b
            text-align left
            background #26a2ff
            border-radius .4rem
            color #fff
            padding-left .4rem
  .bottom
    position fixed
    border-top 1px solid #ccc
    left 0
    right 0
    bottom 2.6rem
    height 2rem
    line-height 2rem
    text-align center
    background #ccc
    color #26a2ff
    input
      float left
      width 60%
      height 2rem
      line-height 2rem
      outline none
    button
      float right
      width 40%
      height 2rem
      border none
      color #fff
      background #26a2ff
</style>
