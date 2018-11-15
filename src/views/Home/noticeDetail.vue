<template>
  <div id="noticeDetail">
    <Header :showLeft="showLeft">
      <p slot="title">{{lang.lable1}}</p>
    </Header>
    <div class="container">
      <h2>{{data.title}}</h2>
      <div class="content">{{data.content}}</div>
      <p class="date">{{data.date}}</p>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header'

export default {
  data () {
    return {
      showLeft: true,
      data: {},
      id: '',
      lang: {}
    }
  },
  methods: {
    get_record () {
      this.axios.post(process.env.API_ROOT + '/api/block/get_record').then((res) => {
        res.data.data.forEach(element => {
          if (element.id === this.id) {
            this.data = element
          }
        })
      })
    }
  },
  components: {
    Header
  },
  mounted () {
    this.id = this.$route.params.id
    this.get_record()
    let lang = {
      en: {
        lable1: 'News details'
      },
      cn: {
        lable1: '新闻详情'
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
#noticeDetail
  background #f5f5f5
  .container
    position absolute
    top 2.4rem
    left 0
    right 0
    bottom 0
    background #fff
    @media (min-width: 1024px) {
      width 1024px
      left 50%
      margin-left -512px
    }
    h2
      margin-top 1rem
      line-height 2rem
      text-align center
    .date
      color #999
      padding 0 .6rem
      text-align right
    .content
      padding .6rem
      margin-top 1rem
</style>
