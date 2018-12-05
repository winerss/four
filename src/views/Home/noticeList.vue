<template>
  <div id="noticeList">
    <Header :showLeft="showLeft">
      <p slot="title">{{lang.lable1}}</p>
    </Header>
    <div class="container">
      <div class="items">
        <mt-cell v-for="(item, index) in data" :key="index" @click.native="goDetail(item.id)" :title="item.title" :label="item.date" is-link></mt-cell>
      </div>
      <p class="bottom">{{lang.lable2}}</p>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header'

export default {
  data () {
    return {
      showLeft: true,
      data: [],
      lang: {}
    }
  },
  methods: {
    goDetail (id) {
      this.$router.push('/noticeDetail/' + id)
    },
    get_record () {
      this.axios.post(process.env.API_ROOT + '/api/block/get_record').then((res) => {
        this.data = res.data.data
      })
    }
  },
  components: {
    Header
  },
  mounted () {
    this.get_record()
    let lang = {
      en: {
        lable1: 'Notice',
        lable2: 'There is no more data'
      },
      cn: {
        lable1: '公告',
        lable2: '没有更多数据了'
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
#noticeList
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
    .items
      .mint-cell-wrapper
        background-image none
      .mint-cell
        margin-top .4rem
        color #333
        background none
        border-bottom 1px solid #ddd
        .mint-cell-text
          font-size .8rem
    .bottom
      line-height 1.5rem
      margin-top 1rem
      margin-bottom 1rem
      color #999
      font-size .4rem
      letter-spacing 2px
      text-align center
</style>
