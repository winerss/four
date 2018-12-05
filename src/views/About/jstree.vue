<template>
  <div id='jstree'>
    <Header :showLeft='showLeft' :showTitle='showTitle'>
      <p slot='title'>我的分享</p>
    </Header>
    <div class='container'>
    <el-tree
        :data="data"
        :props="defaultProps"
        @node-click="handleNodeClick">
    </el-tree>
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
      id: 1,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick (node) {
      console.log(node)
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      params.append('uid', node.id)
      this.axios.post(process.env.API_ROOT + '/api/transfer/tree', params).then((res) => {
        let data = res.data.data
        let childArray = []
        data.forEach(element => {
          childArray.push({
            id: element.id,
            label: element.name,
            children: []
          })
        })
        node.children = childArray
      })
    },
    get_user_info () {
      var params = new FormData()
      params.append('sid', localStorage.getItem('sid'))
      this.axios.post(process.env.API_ROOT + '/api/user/get_user_info', params).then((res) => {
        this.data.push({
          id: res.data.data.id,
          label: res.data.data.nickname,
          children: []
        })
      })
    }
  },
  components: {
    Header
  },
  mounted () {
    this.get_user_info()
  }
}
</script>

<style lang='stylus'>
#jstree
  .container
    position absolute
    top 2.8rem
    bottom 2.8rem
    left 0
    right 0
    padding 0 .8rem
    overflow-y scroll
    text-align center
    color #cda041
    -webkit-overflow-scrolling touch
    &::-webkit-scrollbar
      display none
    .el-tree
      background none
</style>
