<template>
  <div v-if="isFirst">
    <div class="header-title">
      <svg-icon icon-class="check" />
      <span>Welcome to the 1st NFT Printer scan!</span>
    </div>
    <check-code-input ref="checkCodeInput" @complete="completeFillCheckCode" />
    <div class="tips-container">
      <div class="tips__decoration" />
      <div class="tips__text">
        A message with a verification code has been sent to the email address submitted with the corresponding printing order. Please fill in the code to start the product authentication process.
        <div class="arrow-bottom-skew" />
      </div>
    </div>
  </div>
</template>

<script>
import CheckCodeInput from '@/components/CheckCodeInput'
import { isFirstCheck, verificationCodeCheck } from '@/api/traceability'
import _ from 'lodash'
import queryString from 'query-string'
import { Loading } from 'element-ui'

export default {
  name: 'TraceabilityValidate',
  components: {
    CheckCodeInput
  },
  data() {
    return {
      isFirst: false,
      isScan: false
    }
  },
  created() {
    const { path, query } = this.$route
    this.isScan = query.scan === '1'

    // remove the scan code
    if (this.isScan) {
      this.$router.replace(`${path}?${queryString.stringify(_.omit(query, 'scan'))}`)
    }

    this.getFirstCheckMark()
  },
  methods: {
    async getFirstCheckMark() {
      const loadingInstance = Loading.service({ fullscreen: true })
      try {
        const { data } = await isFirstCheck({ serial_no: this.$route.query.serial_no })
        const isFirst = data && data.result
        this.isFirst = isFirst
        if (isFirst === false) {
          const routerParams = {
            ...this.$route.query
          }
          if (this.isScan) routerParams.scan = '1'
          this.$router.replace(`/m/traceability?${queryString.stringify(routerParams)}`)
        }
      } catch (err) {
        this.isFirst = true
      } finally {
        loadingInstance.close()
      }
    },
    async completeFillCheckCode(value) {
      const queryParams = {
        serial_no: this.$route.query.serial_no,
        code: value,
        is_scan: this.isScan
      }
      try {
        const { data } = await verificationCodeCheck(queryParams)
        if (data && data.id) {
          this.$message.success('Verification code passed')
          window.setTimeout(() => {
            this.$router.replace(`/m/traceability?${queryString.stringify(this.$route.query)}`)
          }, 500)
        } else {
          this.$message.error('incorrect verification code')
          this.$refs.checkCodeInput.clear()
        }
      } catch (err) {
        this.$refs.checkCodeInput.clear()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header-title {
  @include special-font-family;
  @include font-size-medium-rem;
  color: $colorPrimary;
  padding: rem(45px) 0 rem(50px);
  text-align: center;
  .svg-icon {
    margin-right: rem(13px);
  }
}
.input-container {
  display: flex;
  justify-content: center;
}
.tips {
  &-container {
    position: relative;
    padding-top: rem(160px);
  }
  &__decoration {
    background: 0px 0px url("~@/assets/check_decoration.png") transparent no-repeat;
    background-size: cover;
    width: rem(204px);
    height: rem(204px);
    margin-left: rem(24px);
  }
  &__text {
    @include font-size-extra-small-rem;
    @include regular-font-family;
    color: $colorPrimary;
    width: rem(187px);
    padding: rem(9px) rem(10px);
    border: 1px solid #000000;
    border-radius: 11px;
    position: absolute;
    top: rem(34px);
    right: rem(29px);
    background-color: #fff;
    .arrow-bottom-skew {
      width: rem(30px);
      height: rem(17px);
      background: 0px rem(-2px) url("~@/assets/arrow-bottom-skew.png") transparent no-repeat;
      background-size: 100%;
      position: absolute;
      left: rem(9px);
      bottom: rem(-16px);

    }
  }
}
</style>
