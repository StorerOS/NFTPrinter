<template>
  <div class="portal-main">
    <portal-header />
    <div class="protal-body">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </div>
    <portal-footer />
  </div>
</template>

<script>
import PortalHeader from './layout/header/index'
import PortalFooter from './layout/footer/index'

export default {
  name: 'PortalMain',
  components: {
    PortalHeader,
    PortalFooter
  },
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.protal-body {
  min-height: calc(100vh - 100px);
  position: relative;
}
@media only screen and (max-width:991px) {
  .protal-body {
    min-height: calc(100vh - 60px);
  }
}
</style>
