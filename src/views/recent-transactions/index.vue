<template>
  <div :class="[isMobile && 'mobile-container']">
    <div class="content-header">
      <div class="header-container">
        <div class="header__title">
          Recent transactions
        </div>
        <div class="decoration-container" />
      </div>
    </div>
    <main-container>
      <div class="box-card">
        <div class="table__container">
          <el-table
            v-loading="loadingMixin.search"
            :header-cell-style="{'text-align': 'center'}"
            :cell-style="{'text-align': 'center'}"
            :data="tableData"
          >
            <el-table-column label="Order Number" min-width="160" prop="order_no" class-name="number-cell">
              <template v-slot:default="{ row }">
                <el-tooltip effect="dark" :content=" row.order_no" placement="top-start">
                  <div class="text-overflow-ellipsis">{{ row.order_no }}</div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="NFT" min-width="140">
              <template v-slot:default="{ row }">
                <el-image :src="row.collection_url" class="table-img">
                  <div slot="placeholder" class="image-slot">
                    <i class="el-icon-picture-outline" />
                  </div>
                </el-image>
                <div>{{ row.collection_name }}</div>
              </template>
            </el-table-column>
            <el-table-column label="Product" min-width="140" prop="product">
              <template v-slot:default="{ row }">
                <el-image :src="row.product_url" class="table-img">
                  <div slot="placeholder" class="image-slot">
                    <i class="el-icon-picture-outline" />
                  </div>
                </el-image>
                <div>{{ row.product_name }}</div>
              </template>
            </el-table-column>
            <el-table-column label="Quantity" min-width="100" prop="amount" />
            <el-table-column label="Name" min-width="120" prop="contact_name" />
            <el-table-column label="Email" prop="contact_info" width="220" />
            <el-table-column label="Address" prop="contact_address" width="200" />
            <el-table-column label="Txn hash" prop="contact_address" width="160">
              <template v-slot:default="{ row }">
                <el-link :href="linkBCOSExplorer(row.msg_hash)" target="_blank" type="primary" :underline="false" class="heavy-btn">{{ row.msg_hash | hiddenMiddleText }}</el-link>
              </template>
            </el-table-column>
            <el-table-column label="Time" prop="created_time" width="180" />
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
import { mapGetters } from 'vuex'
import { getNftOrderList } from '@/api/index'
import { getExplorerHost } from '@/utils'

export default {
  name: 'RecentTransactions',
  components: {
    MainContainer
  },
  mixins: [paginationMixin, loadingMixin],
  data() {
    return {
      tableData: []
    }
  },
  computed: {
    ...mapGetters([
      'metaMaskAccount'
    ]),
    isMobile() {
      return this.$store.state.home.device === 'mobile'
    },
    linkBCOSExplorer() {
      return (hash) => `${getExplorerHost()}/#/message/detail/${hash}`
    }
  },
  watch: {
    metaMaskAccount: {
      handler(newVal) {
        this.$_paginationMixin_search()
      },
      immediate: true
    }
  },
  methods: {
    async searchData() {
      const queryParams = {
        account_id: this.metaMaskAccount,
        page_no: this.paginationMixin.currentPage - 1,
        page_size: this.paginationMixin.pageSize
      }
      this.$_loadingMixin_start(async() => {
        const { data, header } = await getNftOrderList(queryParams)
        this.tableData = data.list || []
        this.paginationMixin.total = header.total || 0
      }, 'search')
    }
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  padding-bottom: 88px;
}
.content-header {
  padding: 66px 0 37px;
  background: 0px 0px url("~@/assets/content_header_bg.png") #FAFAFA no-repeat;
  background-size: cover;
  text-align: center;
}
.header-container {
  position: relative;
  display: inline-block;
  .header__title {
    @include font-size-very-large;
    @include special-font-family;
    color: #fff;
    position: absolute;
    bottom: 20px;
    left: 84px;
    .svg-icon {
      margin-right: 18px;
    }
  }
  .decoration-container {
    background: 0px 0px url("~@/assets/people_decoration.png") no-repeat;
    background-size: cover;
    width: 496px;
    height: 228px;
  }
}
.main-container {
  max-width: 1480px;
}
.box-card ::v-deep .el-card__body {
  padding: 40px 20px;
}
.table-img, .image-slot {
  width: 96px;
  height: 96px;
  border-radius: $borderRadiusLowBase;
}
.table-img {
  ::v-deep img {
    object-fit: cover;
  }
}
.image-slot {
  @include font-size-large;
  height: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $backgroundColorLight;
}
::v-deep .number-cell {
  padding-left: 10px;
  padding-right: 10px;
}
.table-pagination {
  text-align: center;
}
@media only screen and (max-width: 767px) {
  .header-container{
    padding: 0 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
  }
  .mobile-container {
    .header__title {
      width: 90%;
      height: 72px;
      max-width: 400px;
      border-radius: $borderRadiusTopLarge;
      background-color: $colorSpecialPrimary;
      display: flex;
      align-items: center;
      justify-content: center;
      left: auto;
      border: 1px solid $borderColorPrimary;
    }
    .decoration-container {
      background: 0px 0px url("~@/assets/people_decoration2.png") no-repeat;
      background-size: cover;
      width: 200px;
      height: 228px;
    }
  }
}
</style>
