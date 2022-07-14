<template>
  <div>
    <div class="content-header">
      <div class="header-container">
        <div class="left-container">
          <div>
            <div class="header-info">
              <div>Reward</div>
              <div class="header-text__heavy">0 TOKEN</div>
            </div>
            <el-button type="primary" class="btn-special" disabled>
              <svg-icon icon-class="awards" />
              <span>Claim Your Rewards</span>
            </el-button>
          </div>
        </div>
        <div class="right-container">
          <div class="decoration-container" />
        </div>
      </div>
    </div>
    <main-container>
      <div class="box-card main-card">
        <div class="table__container">
          <el-table
            v-loading="loadingMixin.search"
            :header-cell-style="{'text-align': 'center'}"
            :cell-style="{'text-align': 'center'}"
            :data="tableData"
          >
            <el-table-column label="Network" :width="isMobile ? 110 : 145" prop="chain_type" />
            <el-table-column label="Name" :min-width="isMobile ? 150 : 300">
              <template v-slot:default="{ row }">
                <div class="cell-container">
                  <el-image v-if="row.image_url" :src="row.image_url" class="table-img">
                    <div slot="placeholder" class="image-slot">
                      <i class="el-icon-picture-outline" />
                    </div>
                  </el-image>
                  <div class="cell-container__text">{{ row.collection_name }}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Token ID" width="150">
              <template v-slot:default="{ row }">
                <el-tooltip effect="dark" :content="`#${row.collection_number}`" placement="top">
                  <div class="text-overflow-ellipsis">#{{ row.collection_number | hiddenMiddleText(4, 8) }}</div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="Reward" prop="eranings" :width="isMobile ? 140 : 170">
              <template>
                0 Token
              </template>
            </el-table-column>
            <el-table-column label="Address" width="155">
              <template v-slot:default="{ row }">
                {{ row.wallet_address | hiddenMiddleText }}
                <i class="el-icon-copy-document" @click="copyText(row.wallet_address)" />
              </template>
            </el-table-column>
            <el-table-column label="Auth. time" prop="approve_date" width="180">
              <template v-slot:default="{ row }">
                {{ row.approve_time | timeFormat }}
              </template>
            </el-table-column>
            <el-table-column label="Operation" :width="isMobile? '160' : '220'" fixed="right" align="center">
              <template v-slot:default="{ row }">
                <el-button
                  :type="row.is_approved ? '' : 'primary'"
                  :class="{ 'default-btn': row.is_approved }"
                  class="large-button table-button"
                  :plain="row.is_approved"
                  :loading="row.approveLoading"
                  @click="togglePermission(row)"
                >{{ operactionText(row.is_approved) }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="table-pagination">
          <el-pagination
            :current-page="paginationMixin.currentPage"
            :page-sizes="paginationMixin.pageSizes"
            :page-size="paginationMixin.pageSize"
            :layout="isMobile ? 'prev, pager, next' : 'total, sizes, prev, pager, next, jumper'"
            :total="paginationMixin.total"
            @size-change="$_paginationMixin_handleSizeChange"
            @current-change="$_paginationMixin_handleCurrentChange"
          />
        </div>
      </div>
    </main-container>
  </div>
</template>

<script>
import MainContainer from '@/components/mainContainer'
import { paginationMixin, loadingMixin } from '@/mixin'
import { getAccountNftRentList, nftRent, cancelNftRent, addNftWallet } from '@/api/index'
import { mapGetters } from 'vuex'
import metaMask from '@/utils/metaMask'
import { signMessage } from '@/utils/index'
import copy from 'copy-to-clipboard'
import { getNftSign, setNftSign } from '@/utils/auth'

export default {
  name: 'Rent',
  components: {
    MainContainer
  },
  mixins: [paginationMixin, loadingMixin],
  data() {
    return {
      tableData: [],
      platformAccountId: ''
    }
  },
  computed: {
    ...mapGetters([
      'metaMaskAccount'
    ]),
    operactionText() {
      return (is_approved) => {
        return is_approved ? 'Cancel' : 'Authorize'
      }
    },
    isMobile() {
      return this.$store.state.home.device === 'mobile'
    }
  },
  watch: {
    metaMaskAccount: {
      handler(newVal) {
        if (newVal) {
          const nftSign = getNftSign()
          this.authorizeNft(nftSign)
        } else {
          this.tableData = []
        }
      },
      immediate: true
    }
  },
  methods: {
    authorizeNft(sign) {
      if (sign) {
        this.addNft(sign)
        return
      }
      metaMask.operationRequest(async(account) => {
        const sign = await signMessage(account, this.metaMaskAccount)
        this.addNft(sign, () => {
          setNftSign(sign)
        })
      })
    },
    addNft(sign, resolve) {
      const queryParams = {
        account_id: this.metaMaskAccount,
        address: this.metaMaskAccount,
        msg: this.metaMaskAccount,
        sig: sign,
        wallet_type: 'MetaMask'
      }
      this.$_loadingMixin_start(async() => {
        await addNftWallet(queryParams)
        resolve && resolve()
        this.$_paginationMixin_search()
      }, 'search')
    },
    async searchData() {
      const queryParams = {
        account_id: this.metaMaskAccount,
        page_no: this.paginationMixin.currentPage - 1,
        page_size: this.paginationMixin.pageSize
      }
      this.$_loadingMixin_start(async() => {
        const { data, header } = await getAccountNftRentList(queryParams)
        this.tableData = data.list || []
        this.platformAccountId = data.platform_account || ''
        this.paginationMixin.total = header.total || 0
      }, 'search')
    },
    async togglePermission(info) {
      const tipText = info.is_approved ? 'Are you sure that you want to cancel the NFT authorization? This means:</br>1. The NFT authorization will be withdrawn.</br>2. No more new rewards will be available.</br>3. Existing valid rewards will not be affected.' : 'Click to confirm the NFT authorization.'
      this.$_loadingMixin_confirm(tipText, async() => {
        metaMask.operationRequest(async(account) => {
          this.$set(info, 'approveLoading', true)
          try {
            let signMsg
            if (info.is_approved) {
              signMsg = `Operation: Cancel Authorize NFT
Authorizer: ${this.metaMaskAccount}
Contract: ${info.contract_addr}
TokenID: #${info.collection_number}`
            } else {
              signMsg = `Operation: Authorize NFT
Authorizer: ${this.metaMaskAccount}
Contract: ${info.contract_addr}
TokenID: #${info.collection_number}`
            }

            const sign = await signMessage(account, signMsg)
            const queryParams = {
              account_id: this.metaMaskAccount,
              collection_id: info.id,
              extra_data: {
                wallet_type: 'MetaMask',
                address: this.metaMaskAccount,
                contract: info.contract_addr,
                token_id: info.collection_number,
                name: info.collection_name,
                msg: signMsg,
                signature: sign
              }
            }
            await (info.is_approved ? cancelNftRent : nftRent)(queryParams)
            this.$message.success('Operation successfully')
            this.searchData()
          } finally {
            this.$set(info, 'approveLoading', false)
          }
        })
      }, '', undefined, { lockScroll: false, dangerouslyUseHTMLString: true })
    },
    copyText(text) {
      copy(text)
      this.$message.success('Copy successfully')
    }
  }
}
</script>

<style lang="scss" scoped>

.content-header {
  padding: 25px 0 10px;
  background: 0px 0px url("~@/assets/content_header_bg.png") #FAFAFA no-repeat;
  background-size: cover;
}
.header-container {
  display: inline-block;
  display: flex;
  max-width: 1140px;
  padding: 0 15px;
  margin: 0 auto;
}
.main-card ::v-deep .el-card__body {
  padding: 28px 0 31px;
}
.box-card {
  margin-bottom: 30px;
  :last-of-type {
    margin-bottom: 0;
  }
}
.header-container {
  display: flex;
  justify-content: space-between;
  .header-info {
    @include font-size-ceil-large;
    @include special-font-family;
    flex: 1;
    color: $colorSpecialPrimary;
    letter-spacing: 1px;
  }
  .header-text__heavy {
    font-size: 32px;
    line-height: 38px;
    margin-top: 2px;
    margin-bottom: 7px;
  }
  .header-operation {
    display: flex;
    align-items: center;
  }
  .left-container {
    display: flex;
    align-items: center;
    .el-button {
      font-size: $fontSizeLarge;
      padding: 16px 41px;
      .svg-icon {
        font-size: 24px;
        margin-right: 15px;
      }
    }
  }
  .right-container {
    display: flex;
    align-items: flex-start;
    .el-button {
      @include font-size-very-large;
      padding: 21px 102px 21px 63px;
      background: linear-gradient(#4FCACB, #066767);
      margin-top: 114px;
      margin-right: -111px;
      cursor: pointer;
      border: none;
      .svg-icon {
        font-size: 26px;
        margin-right: 22px;
      }
    }
    .decoration-container {
      background: 0px 0px url("~@/assets/button_decoration.png") no-repeat;
      background-size: cover;
      width: 194px;
      height: 365px;
    }
  }
}
.operation-btn {
  @include font-size-large;
  @include special-font-family;
  letter-spacing: 1px;
}
.main-container {
  padding-top: 34px;
  padding-bottom: 22px;
}
.table-img, .image-slot {
  width: 100px;
  height: 100px;
  border-radius: $borderRadiusLowBase;
}
.table-img {
  vertical-align: middle;
  ::v-deep img {
    object-fit: cover;
  }
}
.image-slot {
  @include font-size-large;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $backgroundColorLight;
}
.table-button {
  width: 150px;
}
.table-pagination {
  text-align: center;
}
.el-icon-copy-document {
  cursor: pointer;
}
.cell-container {
  &__text {
    text-align: center;
    margin-top: 7px;
  }
}
::v-deep .cell-center {
  display: flex;
  justify-content: center;
}
@media only screen and (max-width: 991px) {
  .table-button {
    width: 100%;
  }
}
@media only screen and (max-width: 767px) {
  .header-container {
    display: block;
  }
  .left-container {
    margin: 30px 0;
    > div {
      width: 100%;
      flex: 1;
    }
  }
  .right-container {
    justify-content: center;
    .el-button {
      max-width: 100%;
    }
  }
}
</style>
