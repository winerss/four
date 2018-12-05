<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus">
#app
  position: absolute;
  height: 100%;
  width: 100%;
  background: url('assets/img/bg.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  @media (min-width 768px) {
    width 768px
    left 50%
    margin-left -384px
  }
  .v-modal{
    @media (min-width 768px) {
      width 768px
      left 50%
      margin-left -384px
    }
  }
  .mint-popup{
    @media (min-width 768px) {
      width 768px !important
      left 50%
    }
  }
</style>
