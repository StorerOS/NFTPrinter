<template>
  <div :class="classObj" class="portal-header">
    <hamburger v-if="isMobile" :is-active="sidebar.opened" class="navbar__hamburger" @toggleClick="toggleSideBar" />
    <div v-if="isMobile && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <header-menu v-if="!isMobile" />
    <div v-if="isMobile" class="logo-container" @click="$router.push('/')">
      <img src="@/assets/logo.png" alt="logo">
    </div>
    <user-layout class="user-container">
      <template v-slot:menu>
        <component :is="menuComponent" />
      </template>
    </user-layout>
    <sidebar v-if="isMobile" class="sidebar-container" :class="{'mobile-sidebar-container': isMobile && sidebar.opened}" />
  </div>
</template>

<script>
import HeaderMenu from './components/menu/horizontal'
import Sidebar from './components/menu/vertical'
import UserLayout from './components/user-layout'
import resizeMixin from './mixin/resizeHandler'
import Hamburger from '@/components/Hamburger'

export default {
  name: 'PortalHeader',
  components: {
    HeaderMenu,
    UserLayout,
    Sidebar,
    Hamburger
  },
  mixins: [resizeMixin],
  data() {
    return {
      menuComponent: () => {}
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.home.sidebar
    },
    device() {
      return this.$store.state.home.device
    },
    isMobile() {
      return this.device === 'mobile'
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  watch: {
    '$route': {
      handler(to, from) {
        const menuComponent = this.getMenuComponent(to, from)
        if (menuComponent) {
          this.menuComponent = menuComponent
        }
      },
      immediate: true
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
    handleClickOutside() {
      this.$store.dispatch('home/closeSideBar', { withoutAnimation: false })
    },
    toggleSideBar() {
      this.$store.dispatch('home/toggleSideBar')
    },
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
          componentFn = () => import('@/components/PrinterHeaderMenu/index.vue')
      }
      return componentFn
    }
  }
}
</script>

<style lang="scss">
@import './sidebar.scss';
</style>

<style lang="scss" scoped>
.portal-header {
  height: 100px;
  background: $backgroundColorPrimary;
  position: relative;
}
.navbar__hamburger {
  display: inline-block;
  background-color: white;
  padding: 10px!important;
  border-top-right-radius: $borderRadiusLowMedium;
  border-bottom-right-radius: $borderRadiusLowMedium;
  position: absolute;
  top: 22px;
  left: 0px;
  z-index: 999;
  cursor: pointer;
}
.logo-container {
  width: 60px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: absolute;
  left: 20%;
  img {
    width: 48px;
    height: 48px;
  }
}
.user-container {
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translate3d(0, -50%, 0)
}
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar{
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: fixed;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.mobile .fixed-header {
  width: 100%;
}
@media only screen and (max-width: 1279px) {
  .user-layout ::v-deep{
    right: 10px;
    .wallet-icon {
      display: none;
    }
    .plain-default-btn {
      padding: 9px 8px;
    }
    .header-user__text {
      margin: 5px;
    }
  }
}
@media only screen and (max-width: 991px) {
  .portal-header {
    height: 60px;
  }
  .navbar__hamburger {
    top: 10px;
  }
}
</style>
