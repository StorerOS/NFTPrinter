<template>
  <main-container>
    <el-card class="box-card">
      <div class="content-container">
        <div class="image-container">
          <el-link class="back-btn" :underline="false" icon="el-icon-arrow-left" @click="$router.back()">Back</el-link>
          <el-image v-if="info.image_url" :src="info.image_url" class="image-main">
            <div slot="placeholder" class="image-main__slot">
              <i class="el-icon-picture-outline" />
            </div>
          </el-image>
        </div>
        <div class="info-container">
          <div class="info-base">
            <div class="info-base__text info-base__text__heavy">{{ info.collection_name }}</div>
            <div class="info-base__text">#{{ info.collection_number }}</div>
          </div>
          <div class="info-detail-container">
            <div class="info-detail__title">Detail</div>
            <div class="info-detail__body">
              <div class="info-detail__label">Contract address: {{ info.contract_addr }}</div>
              <div class="info-detail__text">
                <div>{{ info.contract_type }}</div>
                <el-tag type="info" class="info-detail__tag">ETH</el-tag>
              </div>
            </div>
          </div>
          <div class="info-btn">
            <el-button type="primary" class="main-btn large-button" @click="goSubmitPrint">Go to print</el-button>
          </div>
        </div>
      </div>
    </el-card>
  </main-container>
</template>

<script>
import MainContainer from '@/components/mainContainer'
import { loadingMixin } from '@/mixin'
import { getNftRentList } from '@/api/index'

export default {
  name: 'Print',
  components: {
    MainContainer
  },
  mixins: [loadingMixin],
  data() {
    return {
      form: {},
      info: {},
      activeName: 'detail'
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        const { id } = to.params
        if (id) {
          this.$set(this.form, 'collection_id', Number(id))
          this.searchData()
        }
      },
      immediate: true
    }
  },
  methods: {
    async searchData() {
      this.$_loadingMixin_start(async() => {
        const { data } = await getNftRentList(this.form)
        this.info = data.list && data.list[0] || {}
      }, 'search')
    },
    goSubmitPrint() {
      this.$router.push(`/submit-print/${this.info.id || ''}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  padding-top: 83px;
}
.box-card {
  position: relative;
  overflow: visible;
}
.box-card ::v-deep .el-card__body {
  padding: 60px 40px;
}
.content-container {
  display: flex;
  > div {
    flex: 1;
  }
}
.back-btn ::v-deep{
  @include font-size-medium;
  position: absolute;
  color: $colorSpecialPrimary;
  font-weight: 400;
  top: 20px;
  left: 35px;
  [class^=el-icon-] {
    color: $colorSpecialPrimary;
    position: relative;
    top: -1px;
    font-weight: 600;
  }
  .el-link--inner {
    margin-left: 2px;
  }
}
.image-container {
  width: 100%;
  max-width: 420px;
}
.image-main {
  width: 100%;
  max-width: 100%;
  min-height: 400px;
  position: relative;
  overflow: hidden;
  border-radius: $borderRadiusLowBase;
  &__slot {
    @include font-size-large;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $backgroundColorLight;
    flex-basis: 100%;
  }
  ::v-deep img {
    min-width: 200px;
    max-height: 600px;
    overflow: hidden;
    border-radius: $borderRadiusLowBase;
  }
}
.info-container {
  max-width: 800px;
  padding-left: 57px;
  padding-top: 6px;
  box-sizing: border-box;
  flex: 4;
}
.info-base {
  @include font-size-medium;
  @include regular-font-family;
  &__text {
    margin-bottom: 10px;
    word-break: break-all;
    &:last-of-type {
      margin-bottom: 0;
    }
    &__heavy {
      @include font-size-very-large;
      @include special-font-family;
      color: $colorPrimary;
    }
  }
}
.info-btn {
  margin-top: 65px;
  .main-btn {
    width: 100%;
    max-width: 240px;
  }
}
.info-detail-container {
  margin-top: 45px;
}
.info-detail {
  &__title {
    @include font-size-ceil-very-large;
    @include semibold-font-family;
    color: $colorPrimary;
    line-height: 28px;
  }
  &__label {
    @include font-size-medium;
    margin: 20px 0 45px;
    word-break: break-all;
  }
  &__text {
    @include font-size-ceil-very-large;
    @include semibold-font-family;
    letter-spacing: 1px;
  }
  &__tag {
    @include font-size-extra-small;
    height: 25px;
    line-height: 25px;
    padding: 0 32px;
    color: $colorTextLightSecondary;
    margin-top: 10px;
    font-weight: 400;
    border-radius: $borderRadiusLowBase;
    border-color: $borderColorHeavyBase;
  }
}

@media only screen and (max-width: 767px) {
  .box-card ::v-deep .el-card__body {
    padding-left: 20px;
    padding-right: 20px;
  }
  .content-container {
    display: block;
  }
  .image-container {
    max-width: none;
  }
  .image-main {
    min-height: 200px;
  }
  .info-container {
    padding-top: 40px;
    padding-left: 0;
  }
  .info-btn {
    text-align: center;
  }
}
</style>
