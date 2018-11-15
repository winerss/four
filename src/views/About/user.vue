<template>
  <div id="user">
    <Header :showLeft="showLeft" :showTitle="showTitle">
      <p slot="title">个人资料</p>
    </Header>
    <div class="container">
      <!-- <mt-cell title="头像" is-link>
        <img style="height: 30px;" src="../../assets/img/logo.jpg" alt="">
      </mt-cell> -->
      <mt-cell title="用户名">
        <p>{{data.nickname}}</p>
      </mt-cell>
      <!-- <mt-cell title="昵称" is-link></mt-cell> -->
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
      data: {}
    }
  },
  methods: {
    get_user_info () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/get_user_info', params).then((res) => {
        let data = res.data
        this.data = data.data
      })
    }
  },
  mounted () {
    this.get_user_info()
  },
  components: {
    Header
  }
}
</script>

<style lang="stylus">
#user
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  font-size .8rem
  background #f5f5f5
  color #000
  .container
    position absolute
    top 2.8rem
    bottom 0
    left 0
    right 0
    overflow-y scroll
    -webkit-overflow-scrolling touch
    &::-webkit-scrollbar
      display none
    .container
      .mint-cell-wrapper
        background-image none
      .mint-cell
        color #333
        border-bottom 1px solid #ddd
        .mint-cell-text
          font-size .8rem
</style>
