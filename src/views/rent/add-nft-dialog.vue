<template>
  <base-dialog
    :visible.sync="visible"
    :before-close="closeDialog"
    class="custom-dialog"
  >
    <span slot="title">
      Add NFT
    </span>
    <div>
      <el-form ref="ruleForm" :rules="formRules" :label-position="formLabelPosition" :model="submitForm" label-width="120px">
        <el-form-item label="Wallet：" prop="wallet_type">
          <el-select v-model="submitForm.wallet_type" placeholder="Please select wallet">
            <el-option v-for="item in walletList" :key="item.value" :label="item.text" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" :loading="loadingMixin.operation" @click="confirm">Approve</el-button>
    </span>
  </base-dialog>
</template>

<script>
import { addNftWallet } from '@/api/'
import { loadingMixin } from '@/mixin'
import { walletStatus } from '@/utils/data-const'
import metaMask from '@/utils/metaMask'
import { addNftFormRules } from './utils'
import { mapGetters } from 'vuex'
import { signMessage } from '@/utils/index'
import BaseDialog from '@/components/baseDialog'

const defaultSubmitForm = () => ({
  wallet_type: 'MetaMask'
})

export default {
  name: 'AddNftDialog',
  components: {
    BaseDialog
  },
  mixins: [loadingMixin],
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      submitForm: defaultSubmitForm(),
      walletList: walletStatus()
    }
  },
  computed: {
    ...mapGetters([
      'metaMaskAccount'
    ]),
    formRules() {
      return addNftFormRules
    },
    isMobile() {
      return this.$store.state.home.device === 'mobile'
    },
    formLabelPosition() {
      return this.isMobile ? 'top' : 'right'
    }
  },
  watch: {
    visible(newVal, _oldVal) {
      this.$emit('update:visible', newVal)
    }
  },
  methods: {
    closeDialog() {
      this.submitForm = defaultSubmitForm()
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.$emit('update:visible', false)
    },
    async confirm() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) return
        metaMask.operationRequest(async(account) => {
          try {
            const sign = await signMessage(account, this.metaMaskAccount)
            const queryParams = {
              account_id: this.metaMaskAccount,
              address: account,
              msg: this.metaMaskAccount,
              sig: sign,
              wallet_type: this.submitForm.wallet_type
            }
            this.$_loadingMixin_start(async() => {
              await addNftWallet(queryParams)
              this.$message.success('Add successfully')
              this.closeDialog()
              this.$emit('confirm')
            }, 'operation')
          } catch (err) {
            console.error(err)
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-dialog ::v-deep .el-dialog {
  max-width: 590px;
  .el-dialog__body {
    padding: 47px 40px 19px;
      .el-form-item {
        .el-input__inner {
          @include font-size-low-medium;
          @include regular-font-family;
          border-color: $colorSpecialPrimary;
          &::placeholder {
            color: $colorTextLowLightPlaceholder;
          }
        }
        .el-form-item__label {
          @include font-size-ceil-large;
        }
        .el-select__caret {
          color: $colorSpecialPrimary;
        }
      }
      .el-form:not(.el-form--label-top):not(.el-form--label-left) .el-form-item .el-form-item__label {
        display: flex;
        align-items: center;
        justify-content: end;
      }
    }
  .el-dialog__footer .el-button--primary{
    width: 227px;
  }
}
@media only screen and (max-width: 767px) {
  .custom-dialog ::v-deep .el-dialog {
    .el-dialog__body {
      padding: 35px 20px 10px;
    }
  }
}
</style>
