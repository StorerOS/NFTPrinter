<template>
  <el-menu
    :default-active="activeMenu"
    mode="horizontal"
    background-color="transparent"
    class="header-menu"
  >
    <el-menu-item class="logo-menu-item">
      <div class="logo-container" @click="$router.push('/')">
        <img src="@/assets/logo.png" alt="logo">
      </div>
    </el-menu-item>
    <sidebar-item v-for="route in routes" :key="route.path" :item="route" :is-top="true" :base-path="route.path" />
  </el-menu>
</template>

<script>
import SidebarItem from './sidebar-item'

export default {
  name: 'HeaderMenu',
  components: {
    SidebarItem
  },
  computed: {
    routes() {
      const findRoutes = this.$router.options.routes.find(item => item.name === 'Portal')
      return findRoutes && findRoutes.children || []
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  }
}
</script>

<style lang="scss">

$fontColor: white;
$activeFontColor:  white;
$backgroundColor: transparent;

.header-menu.el-menu--horizontal {
  display: inline-block;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: none;
  * {
    font-size: $fontSizeLarge;
  }
  .el-menu-item.logo-menu-item {
    padding: 0;
  }
  .logo-container {
    background-color: #fff;
    height: 100%;
    width: 126px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 78px;
      height: 78px;
    }
  }
  .sidebar-item {
    margin: 0px 2.291666%;
  }
  .sidebar-item,
  .sidebar-item > a,
  .el-menu-item,
  .el-submenu {
    height: 100%;
  }
  .sidebar-item > a {
    display: inline-block;
  }
  .el-menu-item {
    border-bottom: none;
  }
  .el-menu-item, .el-submenu {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .el-menu-item, .el-submenu .el-submenu__title {
    @include special-font-family;
    color: $fontColor;
    background-color: $backgroundColor!important;
    transition: color .3s;
  }
  .el-menu-item, .el-submenu__title {
    background-color: $backgroundColor!important;
  }
  .el-submenu:hover .el-submenu__title,
  .el-menu-item:not(.is-disabled):hover,
  .el-menu-item:not(.is-disabled):focus,
  .el-submenu__title:not(.is-disabled):hover,
  :not(.is-disabled):hover .el-submenu__icon-arrow {
    color: $activeFontColor;
  }
  .el-menu-item.is-active,
  .el-submenu.is-active .el-submenu__title,
  .el-submenu.is-active .el-submenu__title .el-submenu__icon-arrow {
    color: $activeFontColor;
  }

  .el-menu-item:not(.is-disabled),
  .el-menu-item.is-active {
    span {
      position: relative;
      &::after {
        content: '';
        width: 28px;
        height: 4px;
        position: absolute;
        bottom: 8px;
        left: 50%;
        border-radius: 5px;
        opacity: 0;
        transition: all .2s;
        transform: translate3d(-50%, 0, 0);
        background-color: $backgroundColorDecor;
      }
    }
  }

  .el-menu-item:not(.is-disabled):hover span::after,
  .el-menu-item:not(.is-disabled):focus span::after,
  .el-menu-item.is-active span::after {
    opacity: 1;
  }

  .el-submenu__title * {
    vertical-align: baseline;
  }
  .el-submenu {
    .el-submenu__icon-arrow {
      @include medium-font-family;
      position:static;
      margin-left: 8px;
      margin-top: -3px;
      color: $fontColor;
    }
  }
}
.el-menu--horizontal {
  .el-menu--popup {
    min-width: 130px;
    background-color: white !important;
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.12);
    .el-menu-item {
      @include medium-font-family;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: $colorTextPrimary;
      &:not(.is-disabled):hover {
        color: $colorPrimary;
        background-color: $backgroundColor !important;
      }
      &.is-active {
        color: $colorPrimary;
      }
    }
  }
}

@media only screen and (max-width: 1719px) {
  .header-menu.el-menu--horizontal .sidebar-item {
    margin: 0px 0.76388866%;
  }
}

@media only screen and (max-width: 1479px) {
  .header-menu.el-menu--horizontal {
    justify-content: start;
    padding-left: 30px;
  }
}

@media only screen and (max-width: 1279px) {
  .header-menu.el-menu--horizontal {
    justify-content: start;
    padding-left: 10px;
    * {
      font-size: $fontSizeMedium;
    }
  }
  .header-menu.el-menu--horizontal .sidebar-item {
    margin: 0px;
  }
  .logo-container {
    margin-right: 5px;
  }
}

@media only screen and (max-width: 1079px) {
  .header-menu.el-menu--horizontal {
    * {
      font-size: $fontSizeExtraSmall;
    }
  }
}
</style>
