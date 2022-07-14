<template>
  <main-container>
    <div class="header-card">
      <div v-loading="loadingMixin.rent" class="header-container">
        <div class="image-container">
          <div class="header-image image-main-container">
            <el-image v-if="rentInfo.image_url" :src="rentInfo.image_url" class="image-main">
              <div slot="placeholder" class="image-main__slot">
                <i class="el-icon-picture-outline" />
              </div>
            </el-image>
          </div>
        </div>
        <div class="info-base">
          <div class="info-base__text info-base__text__heavy">{{ rentInfo.collection_name }}</div>
          <div class="info-base__text info-base__text__secondary">#{{ rentInfo.collection_number }}</div>
        </div>
      </div>
      <div class="decoration-container" />
    </div>
    <div v-loading="loadingMixin.product" class="box-card">
      <el-form ref="ruleForm" :label-position="formLabelPosition" class="form-container" :model="form" :rules="formRules" label-width="140px">
        <el-form-item label="Product" prop="product" class="product-item">
          <div class="image-items">
            <el-row :gutter="30">
              <el-col v-for="item in productList" :key="item.id" :xs="12" :sm="6" :md="6" :lg="4" class="image-cell">
                <el-radio v-model="form.product" :label="item" border @change="clearAmount" @click.native="selectProductSpec(item)">
                  <div class="radio-content">
                    <div class="image-layout">
                      <div class="radio-iamge image-main-container">
                        <el-image :src="specsInfo(item, 'image_url') || item.image_url" class="image-main">
                          <div slot="placeholder" class="image-main__slot">
                            <i class="el-icon-picture-outline" />
                          </div>
                        </el-image>
                      </div>
                    </div>
                    <div class="radio-info">
                      <el-tooltip class="text-overflow-ellipsis" effect="dark" :content="item.name" placement="top-start">
                        <div class="radio-info__title">{{ item.name }}</div>
                      </el-tooltip>
                      <el-tooltip effect="dark" :content="`$${item.price}`" placement="top-start">
                        <div class="radio-info__heavy"><svg-icon icon-class="money" class="money-icon" /><div class="text-overflow-ellipsis">{{ specsInfo.price || item.price }}</div></div>
                      </el-tooltip>
                      <div class="radio-info__tags">
                        <el-tooltip class="text-overflow-ellipsis" effect="dark" :content="`${item.inventory}`" placement="top">
                          <div class="radio-info__tag">stock: {{ specsInfo(item, 'inventory') || item.inventory }}</div>
                        </el-tooltip>
                        <el-tooltip class="text-overflow-ellipsis" :class="{'visibility-hidden': !specsInfo(item, 'sku_id')}" effect="dark" :content="specsText(item)" placement="top">
                          <div class="radio-info__tag text-special">
                            {{ specsText(item) }}
                          </div>
                        </el-tooltip>
                      </div>
                    </div>
                    <div class="radio-checked">
                      <svg-icon icon-class="checked" />
                    </div>
                  </div>
                </el-radio>
              </el-col>
            </el-row>
          </div>
        </el-form-item>
        <el-form-item label="Quantity" prop="amount">
          <el-input v-model="form.amount" oninput="value=value.replace(/[^\d]/g,'')" class="hidden-number-arrow" placeholder="Please enter the quantity" />
        </el-form-item>
        <el-form-item label="Full name" prop="contact_name">
          <el-input v-model="form.contact_name" placeholder="Please enter the full name" />
        </el-form-item>
        <el-form-item label="Email" prop="contact_info">
          <el-input v-model="form.contact_info" placeholder="Please enter the email" />
        </el-form-item>
        <el-form-item label="Address" prop="contact_address">
          <el-input v-model="form.contact_address" placeholder="Please enter the address" />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input v-model="form.remark" type="textarea" rows="6" maxlength="250" />
        </el-form-item>
      </el-form>
      <div class="btn-container">
        <el-button type="primary" class="submit-btn large-button" :loading="loadingMixin.print" @click="submit">Print</el-button>
      </div>
    </div>
    <product-spec-dialog :visible.sync="productSpecVisible" :product="form.product" @confirm="confirmProductSpec" />
  </main-container>
</template>

<script>
import MainContainer from '@/components/mainContainer'
import { formRules } from './utils/index'
import { loadingMixin } from '@/mixin'
import { getNftRentList, getProduct, nftPrint } from '@/api/index'
import _ from 'lodash'
import { mapGetters } from 'vuex'
import metaMask from '@/utils/metaMask'
import { signMessage } from '@/utils/index'
import ProductSpecDialog from './product-spec-dialog.vue'

export default {
  name: 'SubmitPrint',
  components: {
    MainContainer,
    ProductSpecDialog
  },
  mixins: [loadingMixin],
  data() {
    return {
      productSpecVisible: false,
      rentForm: {},
      form: {},
      rentInfo: {},
      productList: []
    }
  },
  computed: {
    ...mapGetters([
      'metaMaskAccount'
    ]),
    formRules() {
      return formRules.call(this)
    },
    isMobile() {
      return this.$store.state.home.device === 'mobile'
    },
    formLabelPosition() {
      return this.isMobile ? 'top' : 'right'
    },
    specsInfo() {
      return (info, key) => {
        const { selectedSpecs } = info
        return selectedSpecs && selectedSpecs && selectedSpecs[key]
      }
    },
    specsText() {
      return (info) => {
        const specs = info.selectedSpecs && info.selectedSpecs.specs
        return specs && specs.join(',') || ''
      }
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        const { id } = to.params
        if (id) {
          this.$set(this.rentForm, 'collection_id', Number(id))
          this.getRentInfo()
        }
      },
      immediate: true
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getProductList()
    },
    getRentInfo() {
      this.$_loadingMixin_start(async() => {
        const { data } = await getNftRentList(this.rentForm)
        this.rentInfo = data.list && data.list[0] || {}
      }, 'rent')
    },
    getProductList() {
      this.$_loadingMixin_start(async() => {
        const { data } = await getProduct({})
        this.productList = data.list || []
      }, 'product')
    },
    submit() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) return
        this.$_loadingMixin_confirm('Sure you want to print?', async() => {
          await metaMask.operationRequest(async(account) => {
            const { contract_addr, collection_number, collection_name } = this.rentInfo
            const { amount } = this.form
            const { name, merchant_id, id, selectedSpecs } = this.form.product
            const selectedSpecsInfo = selectedSpecs || {}
            const productStr = `${name}  ${selectedSpecsInfo.specs && selectedSpecsInfo.specs.join(',') || ''}`

            const signMsg = `Operation: Print NFT
Offerer: ${this.metaMaskAccount}
Prodcut: ${productStr}
Amount: ${amount}
Contract: ${contract_addr}
TokenID: #${collection_number}`

            const sign = await signMessage(account, signMsg)
            const queryParams = {
              ..._.omit(this.form, 'product'),
              amount: Number(amount),
              product_id: id,
              collection_id: this.rentInfo.id,
              account_id: this.metaMaskAccount,
              sku_id: selectedSpecsInfo.sku_id,
              merchant_id,
              extra_data: {
                wallet_type: 'MetaMask',
                address: this.metaMaskAccount,
                contract: contract_addr,
                token_id: collection_number,
                name: collection_name,
                product: productStr,
                money: String(Number(selectedSpecsInfo.price) * Number(amount)),
                msg: signMsg,
                signature: sign
              }
            }
            await nftPrint(queryParams)
            this.form = {}
            this.$message.success('Printed successfully')
            this.$router.push('/recent-transactions')
          })
        }, 'print', undefined, { lockScroll: false })
      })
    },
    clearAmount() {
      const { form } = this
      if (form.amount) form.amount = ''
    },
    selectProductSpec(info) {
      setTimeout(() => {
        this.productSpecVisible = true
      }, 0)
    },
    confirmProductSpec(selectedSpecs) {
      this.$set(this.form.product, 'selectedSpecs', selectedSpecs)
      this.clearAmount()
    }
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  padding-top: 47px;
  padding-bottom: 135px;
}
.header-card {
  margin-bottom: 84px;
  padding-left: 140px;
  ::v-deep .el-card__body {
    padding: 30px 0px 30px 40px;
  }
}
.box-card {
  ::v-deep .el-card__body {
    padding: 40px;
  }
}
.header-container {
  display: flex;
  align-items: center;
}
.decoration-container {
  background: 0px 0px url("~@/assets/ribbons.png") #FAFAFA repeat;
  background-size: cover;
  width: 100%;
  height: 46px;
  position: absolute;
  left: 0;
  top: 82px;
  z-index: -1;
}
.image-container {
  width: 117px;
  max-height: 200px;
  border-radius: $borderRadiusLowBase;
  overflow: hidden;
  flex: 0 0 117px;
}
.image-main-container {
  padding-bottom: 100%;
  position: relative;
}
.image-main {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  &__slot {
    @include font-size-large;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $backgroundColorLight;
  }
  ::v-deep img {
    object-fit: cover;
  }
}
.info-base {
  @include font-size-low-medium;
  color: $colorPrimary;
  flex: 1;
  margin-left: 57px;
  margin-top: 9px;

  &__text {
    display: inline-block;
    color: $colorSpecialPrimary;
    word-break: break-all;
    &__heavy {
      @include font-size-very-large;
      @include special-font-family;
      margin-right: 56px;
    }
    &__secondary {
      @include font-size-medium;
    }
  }
}
 ::v-deep.form-container {
  &.el-form--label-right {
    .el-form-item .el-form-item__label {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 50px;
    }
  }
  .el-form-item {
    margin-bottom: 35px;
    .el-form-item__label {
      font-weight: 600;
    }
  }
  .product-item {
    margin-bottom: 20px;
  }
}
.btn-container {
  padding-top: 30px;
  text-align: center;
  .submit-btn {
    padding: 14px 20px;
    font-size: $fontSizeVeryLarge;
    width: 240px;
  }
}
.image-items {
  overflow: hidden;
  ::v-deep .el-radio {
    max-width: 170px;
    width: 100%;
    height: auto;
    padding: 16px 16px 7px;
    display: block;
    .el-radio__input {
      display: none;
    }
    .el-radio__label {
      display: block;
      padding-left: 0;
    }
  }
}
.image-cell {
  display: inline-block;
  margin-bottom: 20px;
  box-sizing: border-box;
  .el-radio {
    .radio-checked {
      position: absolute;
      right: 2px;
      bottom: 2px;
      opacity: 0;
      transition: opacity .1s;
      ::v-deep .svg-icon {
        font-size: 28px;
      }
    }
    &.is-bordered {
      border: 1px solid $borderColorLowBase;
      border-radius: $borderRadiusLowBase;
    }
    &.is-bordered.is-checked, .el-radio:hover {
      border-color: $colorSpecialPrimary;
    }
    &.is-checked {
      .radio-checked {
        opacity: 1;
      }
    }
  }

}
.radio-content {
  @include font-size-low-medium;
  @include regular-font-family;
  color: $colorTextRegular;
}
.image-layout {
  max-width: 135px;
  width: 100%;
  margin: 0 auto;
  border-radius: $borderRadiusLowBase;
  overflow: hidden;
}
.radio-iamge {
  width: 100%;
}
.radio-info {
  @include font-size-medium;
  color: $colorPrimary;
  margin-top: 10px;
  &__heavy {
    @include font-size-ceil-large;
    @include semibold-font-family;
    margin-top: 6px;
    display: flex;
    align-items: center;
    .money-icon {
      @include font-size-large;
      flex: 0 0 18px;
      margin-right: 14px;
    }
  }
  &__tags {
    margin-top: 12px;
  }
  &__tag {
    @include regular-font-family;
    font-size: $fontSizeExtraSmall;
    height: 21px;
    line-height: 21px;
    margin-bottom: 4px;
    padding: 0 5px;
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
.text-special {
  @include semibold-font-family;
  color: $colorSpecialPrimary;
}

.visibility-hidden {
  visibility: hidden;
}

@media only screen and (max-width: 767px) {
  .header-card {
    padding-left: 0px;
    padding: 0;
  }
  .header-container {
    display: block;
  }
  .image-container {
    margin-bottom: 20px;
  }
  .info-base {
    margin-left: 0;
    margin-top: 0;
    &__text {
      display: block;
      &__heavy {
        margin-bottom: 10px;
      }
      &__secondary {
        margin-left: 0;
      }
    }
  }
}

</style>
