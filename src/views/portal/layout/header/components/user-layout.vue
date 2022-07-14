<template>
  <div class="user-layout">
    <el-dropdown v-if="metaMaskAccount" class="avatar-container" trigger="click">
      <div class="header-user">
        <el-button type="text" class="plain-default-btn" :loading="isLoggedBtnLoading">
          <svg-icon icon-class="wallet" class="wallet-icon" />
          <span class="header-user__text">{{ metaMaskAccount | hiddenMiddleText }}</span>
          <svg-icon icon-class="arrow-bottom" class="arrow-bottom-icon" />
        </el-button>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <slot name="menu" />
        <el-dropdown-item @click.native="logout">
          <span>Disconnect</span>
          <svg-icon icon-class="exit" class="exit-icon" />
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-button v-else type="text" class="plain-default-btn connect-button" @click="connectWallet">
      <svg-icon icon-class="wallet" class="wallet-icon" />
      <span class="header-user__text">Connect Wallet</span>
    </el-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import metaMaskUtils from '@/utils/metaMask'

export default {
  name: 'UserLayout',
  data() {
    return {
      isLoggedBtnLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'metaMaskAccount'
    ])
  },
  methods: {
    ...mapActions({
      resetWallet: 'user/resetWallet'
    }),
    connectWallet() {
      metaMaskUtils.connection()
    },
    async logout() {
      this.resetWallet()
    }
  }
}
</script>

<style lang="scss" scoped>
.header-user {
  .svg-icon {
    vertical-align: middle;
  }
  &__text {
    margin: 0px 15px;
  }
}
.plain-default-btn {
  @include special-font-family;
  padding: 9px 14px;
  border: 1px solid #fff;
  border-radius: $borderRadiusLowBase;
  background-color: transparent;
  color: #fff;
  .wallet-icon {
    margin-left: 5px;
  }
}
.wallet-icon {
  font-size: $fontSizeMedium;
}
.arrow-bottom-icon {
  font-size: $fontSizeLowMedium;
}
.connect-button {
  .wallet-icon {
    margin-left: 3px;
  }
  .header-user__text {
    margin-right: 2px;
  }
}
.user-layout {
  display: inline-block;
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
.user-dropdown ::v-deep {
  @include special-font-family;
  width: 220px !important;
  margin-top: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  .el-dropdown-menu__item {
    font-size: $fontSizeLowMedium;
    padding-right: 10px;
    color: $colorSpecialPrimary;
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
  .popper__arrow {
    display: none!important;
  }
}
</style>
