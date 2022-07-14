<template>
  <div class="portal-footer footer-container">
    <div class="footer__main">
      <div class="footer__extras">
        <div class="footer__logo">
          <img src="~@/assets/logo_long.png" alt="logo long">
        </div>
        <div class="footer__extras__main">
          <div class="footer__extras__links">
            <div class="footer__extras__link"><a href="https://www.linkedin.com/company/nftprinter/" target="_blank"><svg-icon icon-class="linkedln" /></a></div>
            <div class="footer__extras__link"><a href="https://twitter.com/nft_printer" target="_blank"><svg-icon icon-class="twitter-small" /></a></div>
            <div class="footer__extras__link"><a href="https://discord.gg/E7xkv2zBsu" target="_blank"><svg-icon icon-class="discord-small" /></a></div>
            <div class="footer__extras__link"><a href="https://t.me/nft_printer" target="_blank"><svg-icon icon-class="telegram" /></a></div>
          </div>
          <div class="footer__extras__info">
            <div>Copyright@2022</div>
            <div>NFT Printer</div>
          </div>
        </div>
      </div>
      <div class="footer__content">
        <div class="footer__content__item">
          <div class="footer__content__title">
            Our service
          </div>
          <div class="footer__content__links">
            <div class="footer__content__link">
              <el-link @click="$router.push('/rent')">Register NFT</el-link>
            </div>
            <div class="footer__content__link">
              <el-link @click="$router.push('/printer')">Print products</el-link>
            </div>
          </div>
        </div>
        <div class="footer__content__item">
          <div class="footer__content__title">
            Contact us
          </div>
          <div class="footer__content__links">
            <div class="footer__content__link">
              <el-link href="https://www.linkedin.com/company/nftprinter/" target="_blank">Linkedln</el-link>
            </div>
            <div class="footer__content__link">
              <el-link href="https://twitter.com/nft_printer" target="_blank">Twitter</el-link>
            </div>
            <div class="footer__content__link">
              <el-link href="https://discord.gg/E7xkv2zBsu" target="_blank">Discord</el-link>
            </div>
            <div class="footer__content__link">
              <el-link href="https://t.me/nft_printer" target="_blank">Telegram</el-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PortalFooter',
  computed: {
    isMobile() {
      return this.$store.state.home.device === 'mobile'
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  &-container {
    padding: 70px 0 50px;
    background: 0px 0px url("~@/assets/footer_bg.png") $backgroundColorBase no-repeat scroll;
    background-size: cover;
    color: $colorPrimary;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  &__main {
    width: 100%;
    max-width: 736px;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
  }
  &__extras {
    margin-right: 10px;
    &__main {
      margin-top: 40px;
    }
    &__info {
      @include font-size-medium;
      @include regular-font-family;
      margin-top: 10px;
      color: $colorPrimary;
      > div {
        margin-bottom: 6px;
        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
    &__links {
      font-size: 26px;
      padding: 8px 13px;
      border-style: solid;
      border-color: $colorSpecialPrimary;
      border-width: 0;
      border-top-width: 1px;
      border-bottom-width: 1px;
      display: flex;
      justify-content: center;
    }
    &__link {
      margin-right: 30px;
      cursor: pointer;
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
  &__logo {
    display: flex;
    align-items: center;
    img {
      width: 183px;
    }
  }
  &__content {
    word-break: keep-all;
    margin-top: 10px;
    display: flex;
    &__title {
      @include medium-font-family;
      @include font-size-medium;
      margin-bottom: 18px;
      white-space: nowrap;
    }
    &__item {
      margin-bottom: 10px;
      margin-right: 80px;
      &:last-of-type {
        margin-right: 0;
      }
    }
    &__link {
      .el-link {
        @include regular-font-family;
        @include font-size-extra-small;
        margin-bottom: 10px;
        color: $colorPrimary;
        &.is-underline:hover:after {
          border-color: $colorPrimary;
        }
      }
    }
  }
}
@media only screen and (max-width: 767px) {
  .footer {
    &-container {
      padding: 15px 0 26px;
    }
    &__main {
      max-width: 82.6666%;
      overflow: visible;
    }
    &__extras {
      flex: 0 0 36.2666%;
      margin-right: 15px;
      &__main {
        margin-top: 19px;
      }
      &__links {
        font-size: 16px;
        padding: 5px 0;
      }
      &__link {
        margin-right: 18px;
      }
      &__info {
        font-size: 10px;
        margin-top: 5px;
        > div {
          margin-bottom: 1px;
        }
      }
    }
    &__logo {
      img {
        width: 108px;
      }
    }
    &__content {
      &__title, &__link .el-link {
        font-size: 10px;
      }
      &__title {
        margin-bottom: 7px;
      }
      &__link .el-link {
        margin-bottom: 4px;
        word-break: normal;
      }
      &__item {
        margin-right: 26px;
      }
    }
  }
}
</style>
