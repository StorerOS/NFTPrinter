<template>
  <div class="traceability-query">
    <div class="header-container">
      <div class="header__content">
        <img src="~@/assets/logo.png" alt="logo" class="header__logo">
        <div class="header__text">
          <div>Total "{{ info.count }}" scans recorded</div>
        </div>
      </div>
    </div>
    <div class="content-container">
      <div v-if="info.count > 1" class="alert-bar">
        <div class="alert-bar__content">
          <svg-icon icon-class="warning" />
          <span>This is not the 1st scan. The 1st scan can only be done once with an order related one-time verification code.</span>
        </div>
      </div>
      <div class="info-detail">
        <div class="info-detail__text">
          <div>The 1st scan at:</div>
          <div>{{ info.first_time }}</div>
        </div>
        <div class="info-detail__text__heavy">
          <div>Scan code record:</div>
          <div><span @click="linkScanCodeRecordPage">Check all scan records</span></div>
        </div>
      </div>
      <div class="traceability-step">
        <div class="card traceability__item">
          <div class="traceability__title">Product Information</div>
          <div class="step">
            <div class="step__item">
              <div class="step__head">
                <svg-icon icon-class="round" />
              </div>
              <div class="step__main traceability__content">
                <div class="traceability__left-container">Product Image</div>
                <div class="traceability__right-container">
                  <div class="traceability__image">
                    <el-image v-if="info.product_image" :src="info.product_image" :preview-src-list="[info.product_image]" @click.stop="imagePrviewMaskClose">
                      <div slot="placeholder" class="traceability__image__slot">
                        <i class="el-icon-picture-outline" />
                      </div>
                    </el-image>
                  </div>
                </div>
              </div>
            </div>
            <div class="step__item">
              <div class="step__head">
                <svg-icon icon-class="round" />
              </div>
              <div class="step__main traceability__content">
                <div class="traceability__left-container">Product Name</div>
                <div class="traceability__right-container">
                  <div class="traceability__text">
                    {{ info.product_name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card traceability__item">
          <div class="traceability__title">NFT Information</div>
          <div class="step">
            <div class="step__item">
              <div class="step__head">
                <svg-icon icon-class="round" />
              </div>
              <div class="step__main traceability__content">
                <div class="traceability__left-container">NFT Overview</div>
                <div class="traceability__right-container">
                  <div class="traceability__image">
                    <el-image v-if="info.nft_image" :src="info.nft_image" :preview-src-list="[info.nft_image]" @click.stop="imagePrviewMaskClose">
                      <div slot="placeholder" class="traceability__image__slot">
                        <i class="el-icon-picture-outline" />
                      </div>
                    </el-image>
                  </div>
                </div>
              </div>
            </div>
            <div class="step__item">
              <div class="step__head">
                <svg-icon icon-class="round" />
              </div>
              <div class="step__main traceability__content">
                <div class="traceability__left-container">NFT Name</div>
                <div class="traceability__right-container">
                  <div class="traceability__text">
                    {{ info.nft_name }}
                  </div>
                </div>
              </div>
            </div>
            <div class="step__item">
              <div class="step__head">
                <svg-icon icon-class="round" />
              </div>
              <div class="step__main traceability__content">
                <div class="traceability__left-container">NFT ID</div>
                <div class="traceability__right-container">
                  <div class="traceability__text">
                    {{ info.token_id | hiddenMiddleText(4, 8) }}
                  </div>
                </div>
              </div>
            </div>
            <div class="step__item">
              <div class="step__head">
                <svg-icon icon-class="round" />
              </div>
              <div class="step__main traceability__content">
                <div class="traceability__left-container">Order Time (GMT)</div>
                <div class="traceability__right-container">
                  <div class="traceability__text">
                    {{ info.print_time }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-container">
        <el-link v-if="info.print_hash" type="primary" :underline="false" :href="linkBCOSExplorer(info.print_hash)" class="btn-long__default">
          <div class="btn-long__content">
            <div>
              <svg-icon icon-class="links" />
              <span>Print Hash</span>
            </div>
            <div>{{ info.print_hash | hiddenMiddleText }} >></div>
          </div>
        </el-link>
        <el-link v-if="info.nft_approve_hash" type="primary" :underline="false" :href="linkBCOSExplorer(info.nft_approve_hash)" class="btn-long__default">
          <div class="btn-long__content">
            <div>
              <svg-icon icon-class="links" />
              <span>NFT Approve Hash</span>
            </div>
            <div>{{ info.nft_approve_hash | hiddenMiddleText }} >></div>
          </div>
        </el-link>
      </div>
    </div>
    <div class="footer-container">
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
          <div class="footer__left">
            <div class="footer__title">Our service</div>
            <div class="footer__item">
              <div><el-link @click="$router.push('/rent')">Register NFT</el-link></div>
              <div><el-link @click="$router.push('/printer')">Print products</el-link></div>
            </div>
          </div>
          <div class="footer__right">
            <div class="footer__title">Contact us</div>
            <div class="footer__left__content footer__item">
              <div><el-link href="https://www.linkedin.com/company/nftprinter/" target="_blank">Linkedln</el-link></div>
              <div><el-link href="https://twitter.com/nft_printer" target="_blank">Twitter</el-link></div>
              <div><el-link href="https://discord.gg/E7xkv2zBsu" target="_blank">Discord</el-link></div>
              <div><el-link href="https://t.me/nft_printer" target="_blank">Telegram</el-link></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { prviewMaskCloseMixin } from '@/mixin'
import { verificationCodeCheck } from '@/api/traceability'
import _ from 'lodash'
import queryString from 'query-string'
import { Loading } from 'element-ui'
import { getExplorerHost } from '@/utils'

export default {
  name: 'Traceability',
  mixins: [prviewMaskCloseMixin],
  data() {
    return {
      isScan: false,
      info: {}
    }
  },
  computed: {
    linkBCOSExplorer() {
      return (hash) => `${getExplorerHost()}/#/message/detail/${hash}`
    }
  },
  created() {
    const { path, query } = this.$route
    this.isScan = query.scan === '1'

    // remove the scan code
    if (this.isScan) {
      this.$router.replace(`${path}?${queryString.stringify(_.omit(query, 'scan'))}`)
    }

    this.getDetailInfo()
  },
  methods: {
    async getDetailInfo() {
      const loadingInstance = Loading.service({ fullscreen: true })
      try {
        const queryParams = {
          serial_no: this.$route.query.serial_no,
          code: '',
          is_scan: this.isScan
        }
        const { data } = await verificationCodeCheck(queryParams)
        this.info = data || {}
      } finally {
        loadingInstance.close()
      }
    },
    linkScanCodeRecordPage() {
      this.$router.push(`/m/traceability/scan-code-record?id=${this.info.id || ''}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.traceability-query {
  padding-top: rem(28px);
}
.header {
  &-container {
    width: 100%;
    height: rem(70px);
    margin-bottom: rem(25px);
    background: 0px 0px url("~@/assets/ribbons_bg.png") transparent no-repeat;
    background-size: cover;
    position: relative;
  }
  &__content {
    @include font-size-extra-small-rem;
    @include regular-font-family;
    width: 70%;
    height: 100%;
    margin: 0 auto;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__logo {
    width: rem(64px);
    height: rem(64px);
  }
  &__text {
    @include font-size-medium-rem;
    @include special-font-family;
    color: $colorSpecialPrimary;
    margin-left: rem(15px);
  }
}
.content-container {
  padding: 0 rem(15px) rem(55px);
}
.alert-bar {
  @include font-size-extra-small-rem;
  @include regular-font-family;
  width: rem(335px);
  margin: 0 auto rem(33px);
  &__content {
    padding: rem(4px) rem(6px);
    border-radius: 15px;
    color: #E22828;
    background-color: $backgroundColorDanger;
    display: flex;
    align-items: center;
    .svg-icon {
      width: (30px);
      margin-right: rem(5px);
    }
  }
}
.info-detail {
  @include font-size-extra-small-rem;
  @include special-font-family;
  color: $colorPrimary;
  padding: 0 rem(17px);
  margin-bottom: rem(26px);
  &__text, &__text__heavy {
    display: flex;
    justify-content: space-between;
    margin-bottom: rem(8px);
  }
  &__text__heavy {
    > div:first-of-type {
      color: $colorPrimary;
    }
  }
  &__text__heavy {
    color: $colorSpecialPrimary;
    text-align: right;
  }
}
.card {
  overflow: hidden;
}
.card:last-of-type {
  margin-bottom: 0;
}
.traceability {
  &-step {
    padding-bottom: rem(11px);
  }
  &__content {
    @include regular-font-family;
    @include font-size-extra-small-rem;
    margin-left: rem(18px);
    color: $colorPrimary;
  }
  &__title {
    @include font-size-low-medium-rem;
    @include semibold-font-family;
    padding: rem(6px) rem(13px);
    color: #fff;
    background-color: rgba(42, 153, 154, 0.66);
    border-radius: 3px;
  }
  &__right-container,
  &__left-container {
    width: 50%;
    word-break: break-all;
  }
  &__right-container {
    text-align: center;
  }
  &__image ::v-deep {
    width: rem(60px);
    height: rem(60px);
    margin: 0 auto;
    position: relative;
    .el-image,
    .el-image__preview {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      right: 0;
      object-fit: cover;
    }
    &__slot {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $backgroundColorLight;
    }
  }
}
.step {
  font-size: rem(12px);
  padding: rem(9px) rem(13px) rem(11px);
  &__item {
    padding: rem(12px) 0;
    position: relative;
    display: flex;
    &:first-of-type {
      padding-bottom: 0;
    }
    &:last-of-type .step__head::after {
      display: none;
    }
  }
  &__head {
    position: relative;
    &::after {
      content: '';
      width: 0px;
      position: absolute;
      left: 50%;
      top: rem(15px);
      bottom: rem(-26px);
      transform: translate3d(-50%, 0, 0);
      border-left: 1px dashed $colorSpecialPrimary;
      z-index: 0;
    }
    .svg-icon {
      height: rem(16px);
      width: rem(12px);
    }
  }
  &__main {
    width: 100%;
    display: flex;
    flex: 1;
    > * {
      flex: 1;
    }
  }
}
.btn-container {
  .el-button {
    margin-bottom: rem(15px);
    &:last-of-type {
      margin-bottom: 0;
    }
  }
}
.btn-long {
  &__default {
    @include font-size-extra-small-rem;
    @include special-font-family;
    width: 100%;
    padding: rem(7px) rem(13px) rem(7px) rem(22px);
    margin-bottom: rem(15px);
    border-radius: 3px;
    display: inline-block;
    border: 1px solid $colorSpecialPrimary;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  &__content {
    display: flex;
    justify-content: space-between;
    .svg-icon {
      font-size: $fontSizeLowMedium;
      margin-right: rem(12px);
    }
  }
}
.footer {
  &-container {
    padding: rem(21px) 0 rem(23px);
    color: $colorPrimary;
    background: 0px 0px url("~@/assets/grid_bg.png") transparent no-repeat;
    background-size: cover;
    position: relative;
    display: flex;
    justify-content: center;
    &::before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: linear-gradient(225deg, #9EE8E8 0%, #FFC6BF 100%);
      opacity: 0.53;
      z-index: -1;
    }
  }
  &__main {
    width: 100%;
    max-width: 82.6666%;
    display: flex;
    justify-content: space-between;
    overflow: visible;
  }
  &__extras {
    flex: 0 0 36.2666%;
    margin-right: rem(15px);
    &__main {
      margin-top: rem(19px);
    }
    &__info {
      @include font-size-medium;
      @include regular-font-family;
      margin-top: rem(10px);
      color: $colorPrimary;
      > div {
        margin-bottom: rem(6px);
        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
    &__links {
      @include font-size-medium-rem;
      padding: rem(5px) 0px;
      border-style: solid;
      border-color: $colorSpecialPrimary;
      border-width: 0;
      border-top-width: 1px;
      border-bottom-width: 1px;
      display: flex;
      justify-content: center;
    }
    &__link {
      margin-right: rem(18px);
      cursor: pointer;
      &:last-of-type {
        margin-right: 0;
      }
    }
    &__info {
      font-size: rem(10px);
      margin-top: rem(5px);
      > div {
        margin-bottom: 1px;
      }
    }
  }
  &__logo {
    display: flex;
    align-items: center;
    img {
      width: rem(108px);
    }
  }
  &__content, &__content .el-link {
    @include regular-font-family;
    font-size: rem(10px);
  }
  &__content {
    display: flex;
    justify-content: center;
  }
  &__item {
    margin-right: rem(23px);
    display: inline-block;
    &:nth-child(even) {
      margin-right: 0;
    }
    > div {
      margin-bottom: rem(4px);
    }
  }
  &__right {
    margin-left: rem(26px);
  }
  &__title {
    @include medium-font-family;
    margin-bottom: rem(7px);
  }
}
</style>
