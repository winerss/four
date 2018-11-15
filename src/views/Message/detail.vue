<template>
  <div id="messdetail">
    <div id="container">
        <div class="wrapper">
          <div class="items">
            <div class="item" v-for="(item, index) in data" :key="index">
              <p :class="item.is_self === 0 ? 'class-a' : 'class-b'">
                <span v-show="item.is_self === 0"></span>
                <span v-show="item.is_self === 1"></span>
                {{item.content}}
              </p>
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
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  font-size .8rem
  color #999
  overflow-y scroll
  -webkit-overflow-scrolling touch
  &::-webkit-scrollbar
    display none
  #container
    .wrapper
      .items
        padding-bottom 3rem
        overflow hidden
        .item
          padding 0 1.4rem
          p
            display inline-block
            line-height 1.4rem
            margin-top .4rem
            padding .2rem .4rem
          .class-a
            position relative
            float right
            clear both
            text-align left
            background #cda041
            border-radius .4rem
            color #fff
            padding-right .4rem
            span
              position absolute
              right -10px
              top 5px
              display block
              width: 0;
              height: 0;
              border-width: 10px
              border-style: solid;
              border-color: #cda041 transparent transparent transparent;
          .class-b
            position relative
            float left
            clear both
            text-align left
            background #ccc
            border-radius .4rem
            color #fff
            padding-left .4rem
            span
              position absolute
              left -10px
              top 5px
              display block
              width: 0;
              height: 0;
              border-width: 10px;
              border-style: solid;
              border-color: #ccc transparent transparent transparent;
  .bottom
    position fixed
    left 0
    right 0
    bottom 0
    height 2.4rem
    line-height 2.4rem
    text-align center
    color #cda041
    input
      float left
      width 60%
      height 2.4rem
      line-height 2.4rem
      outline none
    button
      float right
      width 40%
      height 2.4rem
      border none
      color #fff
      background #cda041
</style>
