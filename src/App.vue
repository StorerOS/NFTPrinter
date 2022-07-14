<template>
  <div id="app" :class="{'fixed-scroll': isMobile && sidebar.opened }">
    <router-view />
  </div>
</template>

<script>
import metaMaskUtils from '@/utils/metaMask'

export default {
  name: 'App',
  computed: {
    sidebar() {
      return this.$store.state.home.sidebar
    },
    device() {
      return this.$store.state.home.device
    },
    isMobile() {
      return this.device === 'mobile'
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      await metaMaskUtils.init()
    }
  }
}
</script>
<style lang="scss" scoped>
.fixed-scroll {
  overflow: hidden;
}
</style>
