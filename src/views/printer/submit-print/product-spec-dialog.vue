<template>
  <base-dialog
    :visible.sync="visible"
    :before-close="closeDialog"
    class="custom-dialog"
  >
    <span slot="title">
      Clothing attributes
    </span>
    <div class="content-container">
      <div class="image-container">
        <div class="image-layer">
          <el-image class="image__main" :src="mainImageUrl" :preview-src-list="[mainImageUrl]" @click.stop="imagePrviewMaskClose">
            <div slot="placeholder" class="image__slot">
              <i class="el-icon-picture-outline" />
            </div>
          </el-image>
        </div>
      </div>
      <div class="content-main">
        <div class="base-info">
          <div class="base-info__text"><svg-icon icon-class="money" class="money-icon" />{{ selectedSpecs.price || product.price || 0 }}</div>
          <div class="base-info__tag">stock: {{ selectedSpecs.inventory || product.inventory || 0 }}</div>
        </div>
        <div class="detail-info">
          <div v-for="(item, pIndex) in specList" :key="item.title" class="info-item">
            <div class="info-item__title">{{ item.title }}</div>
            <div class="info-item__container">
              <div v-for="(value, index) in item.list" :key="index" class="info-item__select" :class="statusClass(value)" @click="toggleSpec(value, pIndex)">
                {{ value }}
              </div>
            </div>
          </div>
        </div>
        <div class="btn-operation">
          <el-button type="primary" :loading="confirmLoading" @click="confirm">Confirm</el-button>
        </div>
      </div>
    </div>
  </base-dialog>
</template>

<script>
import { loadingMixin } from '@/mixin'
import BaseDialog from '@/components/baseDialog'
import { prviewMaskCloseMixin } from '@/mixin'
import { SpecAdjoinMatrix } from './utils/index'
import { getProductSpecInfo, getProductDetail } from '@/api'
import _ from 'lodash'

const defaultSelectedSpecs = { specs: [] }

export default {
  name: 'ProductSpecDialog',
  components: {
    BaseDialog
  },
  mixins: [loadingMixin, prviewMaskCloseMixin],
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    product: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      submitForm: {},
      specList: [],
      specCombinationList: [],
      optionSpecs: [],
      selectedSpecs: _.cloneDeep(defaultSelectedSpecs),
      confirmLoading: false
    }
  },
  computed: {
    statusClass() {
      return (value) => {
        return {
          selected: this.selectedSpecs.specs.includes(value),
          disabled: !this.optionSpecs.includes(value)
        }
      }
    },
    mainImageUrl() {
      return this.selectedSpecs.image_url || this.product.image_url || ''
    }
  },
  watch: {
    visible(newVal, oldVal) {
      this.$emit('update:visible', newVal)
      if (newVal) {
        const { selectedSpecs } = this.product
        selectedSpecs && (this.selectedSpecs = selectedSpecs)
        this.init()
      }
    }
  },
  methods: {
    async init() {
      // data input
      const { specList, specCombinationList } = await this.getSpecInfo()
      this.specList = specList
      this.specCombinationList = specCombinationList
      if (this.selectedSpecs.specs.length <= 0) this.$set(this.selectedSpecs, 'specs', Array(this.specList.length).fill(''))

      this.fillMatrix()
    },
    fillMatrix() {
      const specAdjoinMatrix = new SpecAdjoinMatrix(this.specList, this.specCombinationList)
      const optionSpecs = specAdjoinMatrix.getSpecscOptions(this.selectedSpecs.specs)
      this.optionSpecs = optionSpecs
    },
    async getSpecInfo() {
      const { data } = await getProductSpecInfo({ product_id: this.product.id })
      const attrList = []

      // modify key
      ;(data.attr_list || []).forEach(item => {
        attrList.push({
          title: item.attr_key,
          list: item.attr_value
        })
      })

      return { specList: attrList, specCombinationList: data.spec_list || [] }
    },
    closeDialog() {
      this.$emit('update:visible', false)

      // prevents confirmation events from being triggered multiple times with successive clicks
      setTimeout(() => {
        this.selectedSpecs = _.cloneDeep(defaultSelectedSpecs)
        this.confirmLoading = false
      }, 500)
    },
    async confirm() {
      const { specs, inventory } = this.selectedSpecs
      for (const [index, val] of specs.entries()) {
        if (!val) {
          this.$message.error(`Please select the ${this.specList[index].title}`)
          return
        }
      }
      if (specs.length <= 0) {
        this.$message.error('Please select the specification')
        return
      }
      if (inventory <= 0) {
        this.$message.error('This specification is not in stock')
        return
      }

      this.confirmLoading = true // Prevent multiple clicks

      this.$emit('confirm', this.selectedSpecs)
      this.closeDialog()
    },
    async toggleSpec(value, pIndex) {
      const { specs } = this.selectedSpecs
      if (specs[pIndex] !== value && !this.optionSpecs.includes(value)) return
      specs.splice(pIndex, 1, specs[pIndex] === value ? '' : value)

      this.fillMatrix()

      // get specification details
      if (this.selectedSpecs.specs.every(Boolean) && this.selectedSpecs.specs.length === this.specList.length) {
        const productInfo = await this.getProductDetail(this.selectedSpecs)

        const matchSpec = this.findMatchSpec()
        this.selectedSpecs = {
          ...this.selectedSpecs,
          ..._.omit(matchSpec, ['specs']),
          ...productInfo
        }

        if (productInfo.inventory <= 0) {
          this.$message.error('This specification is not in stock')
          return
        }
      } else {
        this.selectedSpecs = { ..._.pick(this.selectedSpecs, ['specs']) }
      }
    },
    findMatchSpec() {
      // get the corresponding information for your specification
      const matchSpec = this.specCombinationList.find(item => {
        const intersectionArr = _.intersection(item.specs, this.selectedSpecs.specs)
        return intersectionArr && intersectionArr.length === this.specList.length
      })
      return matchSpec
    },
    async getProductDetail(selectedSpecs) {
      const queryParams = this.getProductDetaiQueryParams(selectedSpecs, this.specList, this.product)
      const { data } = await getProductDetail(queryParams)
      return data.list && data.list[0] || {}
    },
    getProductDetaiQueryParams(selectedSpecs, specList, product) {
      const queryParams = {
        product_id: product.id
      }
      const attr = []
      for (const [index, val] of selectedSpecs.specs.entries()) {
        attr.push({
          attr_key: specList[index].title,
          attr_value: val
        })
      }
      queryParams.attr = attr

      return queryParams
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-dialog ::v-deep .el-dialog {
  width: 90%;
  max-width: 940px;
}
.content-container {
  display: flex;
}
.image {
  margin-bottom: 23px;
  overflow: hidden;
  &-container {
    flex: 0 0 314px;
  }
  &-layer {
    padding-bottom: 100%;
    border: 1px solid $borderColorLowBase;
    border-radius: $borderRadiusLowBase;
    position: relative;
    overflow: hidden;
  }
  &__main {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    ::v-deep.el-image__inner {
      object-fit: cover;
    }
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
.content-main {
  margin-left: 36px;
}
.base-info {
  margin-top: 5px;
  &__text {
    @include font-size-ceil-large;
    @include semibold-font-family;
    color: $colorPrimary;
    .svg-icon {
      font-size: $fontSizeLarge;
      margin-right: 14px;
    }
  }
  &__tag {
    @include regular-font-family;
    font-size: $fontSizeExtraSmall;
    height: 21px;
    line-height: 21px;
    margin-top: 3px;
    margin-bottom: 4px;
    display: inline-block;
    padding: 0 35px;
    color: $colorTextLowLightSecondary;
    border-radius: $borderRadiusLowBase;
    text-align: center;
    background-color: $backgroundColorLowLighter;
    > span {
      margin-right: 14px;
      &:last-of-type {
        margin-right: 0;
      }
    }
    &:last-of-type {
      margin-bottom: 0;
    }
  }
}
.detail-info {
  margin-top: 25px;
}
.info-item {
  color: $colorPrimary;
  margin-bottom: 17px;
  &:last-of-type {
    margin-bottom: 0;
  }
  &__container {
    margin-top: 17px;
  }
  &__title {
    @include font-size-large;
    @include semibold-font-family;
  }
  &__select {
    @include font-size-large;
    @include regular-font-family;
    min-width: 115px;
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 17px;
    padding: 5px 10px;
    color: $colorTextSecondary;
    background-color: #fff;
    text-align: center;
    border-radius: $borderRadiusLowBase;
    border: 1px solid transparent;
    cursor: pointer;
    &.disabled {
      color: $colorTextLowLightSecondary;
      background-color: $backgroundColorLowLighter;
      cursor: no-drop;
    }
    &.selected {
      color: $colorSpecialPrimary;
      border: 1px solid $colorSpecialPrimary;
      background-color: rgba(42, 153, 154, 0.05);
    }
  }
}
.btn-operation {
  margin-top: 37px;
  .el-button {
    padding: 18px 70px;
  }
}

@media only screen and (max-width: 767px) {
  ::v-deep .el-dialog {
    margin-top: 5vh!important;
  }
  .content-container {
    display: block;
    position: relative;
  }
  .image-container {
    width: 100px;
  }
  .base-info {
    position: absolute;
    top: 0;
    left: 120px;
  }
  .content-main {
    margin-left: 0;
    margin-top: 20px;
  }
  .info-item__title {
    @include font-size-medium;
  }
  .info-item__container {
    margin-top: 10px;
  }
  .info-item__select {
    @include font-size-low-medium;
    min-width: 90px;
    margin-right: 5px;
    margin-bottom: 10px;
  }
  .btn-operation {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
