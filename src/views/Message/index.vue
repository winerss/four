<template>
  <div id="message">
    <Header :showTitle="showTitle" :showLeft="showLeft">
      <p slot="title">{{lang.title}}</p>
    </Header>
    <div class="container" ref="wrapper">
      <div class="wrapper">
        <mt-cell v-for="(item, index) in items" :key="index" :title="item.sign" is-link @click.native="goPage(item.sign)"></mt-cell>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Header from '@/components/header'
export default {
  data () {
    return {
      showTitle: true,
      showLeft: true,
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
    goPage (id) {
      this.$router.push('/messagedetail/' + id)
    },
    getData () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/words/words_list', params).then((res) => {
        let data = res.data
        this.items = data.data
      })
    }
  },
  components: {
    Header
  },
  mounted () {
    this.getData()
    // this._initScroll()
    let lang = {
      en: {
        title: 'Message'
      },
      cn: {
        title: '消息'
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
#message
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  font-size .8rem
  overflow-x hidden
  overflow-y auto
  color #333
  .container
    position absolute
    top 2.8rem
    bottom 0
    left 0
    right 0
    .mint-cell
      background none
      border-bottom 1px solid #e5d099
</style>
