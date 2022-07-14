<template>
  <div class="app-header">
    <div class="user-layout">
      <el-dropdown v-if="false" class="avatar-container" trigger="click">
        <div class="header-user">
          <el-link :underline="false" :loading="isLoggedBtnLoading">
            <svg-icon icon-class="wallet" />
            <span class="header-user__text">{{ 'admin' | hiddenMiddleText }}</span>
            <i class="el-icon-caret-bottom" />
          </el-link>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <slot name="menu" />
          <el-dropdown-item @click.native="logout">
            <span>Disconnect</span>
            <svg-icon icon-class="exit" class="exit-icon" />
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button v-else class="connect-button" plain round icon="el-icon-connection">
        Connect Wallet
      </el-button>
    </div>
    <div class="header-title">
      <span @click="toHome"> {{ title }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppHeader',
  data() {
    return {
      isLoggedBtnLoading: false
    }
  },
  computed: {
    title() {
      const { title } = this.$route.meta
      return title
    }
  },
  methods: {
    async logout() {
      const logoutLoading = this.$loading({
        lock: true
      })
      this.isLoggedBtnLoading = true
      try {
        window.location.reload()
      } catch (err) {
        this.$message.error('Logout failed')
      } finally {
        this.isLoggedBtnLoading = false
        logoutLoading.close()
      }
    },
    toHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  padding: 30px 0px;
  position: relative;
  margin-bottom: 45px;
}
.header-user {
  .svg-icon, .exit-icon {
    @include font-size-large;
    vertical-align: middle;
  }
  &__text {
    margin: 0px 20px;
  }
}
.user-layout {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate3d(0, -50%, 0);
}
.header-title {
  font-size: 50px;
  line-height: 56px;
  font-weight: bold;
  text-align: center;
  span {
    cursor: pointer;
  }
}
.user-dropdown {
  width: 166px !important;
  ::v-deep .el-dropdown-menu__item {
    padding-right: 10px;
  }
  .el-dropdown-menu__item {
    position: relative;
    .exit-icon {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translate3d(0, -50%, 0);
    }
  }
}
.connect-button {
  @include font-size-low-medium;
  padding: 12px 20px;
}
</style>
