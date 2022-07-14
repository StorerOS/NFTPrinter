<template>
  <div class="app-wrapper">
    <app-header>
      <template v-slot:menu>
        <component :is="menuComponent" />
      </template>
    </app-header>
    <app-main />
  </div>
</template>

<script>
import { AppMain, AppHeader } from './components'

export default {
  name: 'Layout',
  components: {
    AppMain,
    AppHeader
  },
  data() {
    return {
      menuComponent: () => {}
    }
  },
  watch: {
    '$route'(to, from) {
      const menuComponent = this.getMenuComponent(to, from)
      if (menuComponent) {
        this.menuComponent = menuComponent
      }
    }
  },
  async beforeRouteEnter(to, from, next) {
    next(vm => {
      const menuComponent = vm.getMenuComponent(to, from)
      if (menuComponent) {
        vm.menuComponent = menuComponent
      }
    })
  },
  methods: {
    getMenuComponent(to, from) {
      let componentFn = null
      const topPathInfo = to.matched[1]
      const topPath = topPathInfo && topPathInfo.path || ''
      switch (topPath) {
        case '/printer':
        case '/submit-print/:id':
        case '/go-print/:id':
          componentFn = () => import('@/components/PrinterHeaderMenu/index.vue')
          break
        default:
          componentFn = null
      }
      return componentFn
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
.app-wrapper {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  max-width: $layoutContentWidth;
  min-width: $minLayoutContentWidth;
  margin: 0px auto;
  padding-bottom: 30px;
  .app-main {
    flex: 1;
  }
}
</style>
