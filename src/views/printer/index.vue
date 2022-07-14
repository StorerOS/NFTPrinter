<template>
  <div>
    <div class="content-header">
      <div class="header-container">
        <div class="decoration-container" />
        <div class="input-item input-container">
          <el-input
            v-model="form.collection_name"
            placeholder="What do you want to search for?"
            @keyup.enter.native="enterSearch"
            @blur="blurSearch"
          >
            <svg-icon slot="prefix" icon-class="search" />
          </el-input>
        </div>
        <div class="input-item select-container">
          <el-select v-model="form.count_asc" class="input-right" @change="$_paginationMixin_search">
            <el-option
              v-for="item in sortList"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
    </div>
    <main-container>
      <div v-loading="loadingMixin.search" class="box-card">
        <div v-if="dataList && dataList.length > 0" class="content-container">
          <el-row :gutter="15">
            <el-col v-for="item in dataList" :key="item.id" :md="6" :sm="12" class="content-item">
              <div class="content-item__container" @click="linkDetail(item)">
                <div class="content-image">
                  <el-image :src="item.image_url" class="content-image__main">
                    <div slot="placeholder" class="content-image__main__slot">
                      <i class="el-icon-picture-outline" />
                    </div>
                  </el-image>
                </div>
                <div class="content-info">
                  <div class="content-info__heavy text-overflow-ellipsis">{{ item.collection_name }}</div>
                  <div class="content-info__secondary text-overflow-ellipsis">
                    <el-link v-if="isJumpOutLink(item)" :underline="false" type="primary" class="card__link" @click.stop="jumpOutLink(item)">#{{ item.collection_number | hiddenMiddleText(4, 8) }}</el-link>
                    <div v-else>#{{ item.collection_number | hiddenMiddleText(4, 8) }}</div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <empty-container v-else />
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
import { sortList } from '@/utils/data-const'
import { getNftRentList } from '@/api/index'
import { paginationMixin, loadingMixin } from '@/mixin'
import EmptyContainer from '@/components/emptyContainer'

export default {
  name: 'Print',
  components: {
    MainContainer,
    EmptyContainer
  },
  mixins: [paginationMixin, loadingMixin],
  data() {
    return {
      form: {
        count_asc: false
      },
      paginationMixin: {
        currentPage: 1,
        pageSizes: [12, 24, 60, 100],
        pageSize: 12,
        total: 0
      },
      dataList: [],
      sortList
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.home.device === 'mobile'
    },
    isJumpOutLink() {
      return (info) => info.contract_type && info.contract_type.toLocaleUpperCase() === 'ERC721'
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.$_paginationMixin_search()
    },
    async searchData() {
      const queryParams = {
        ...this.form,
        page_no: this.paginationMixin.currentPage - 1,
        page_size: this.paginationMixin.pageSize
      }
      this.$_loadingMixin_start(async() => {
        const { data, header } = await getNftRentList(queryParams)
        this.dataList = data.list || []
        this.paginationMixin.total = header.total || 0
      }, 'search')
    },
    async enterSearch() {
      this.$_paginationMixin_search()
      this.form.collection_name = ''
    },
    blurSearch() {
      const { collection_name } = this.form
      if (!collection_name) return

      this.$_paginationMixin_search()
    },
    linkDetail(info) {
      this.$router.push(`/go-print/${info.id || ''}`)
    },
    jumpOutLink(info) {
      if (!info.contract_type || info.contract_type.toLocaleUpperCase() !== 'ERC721') return
      window.open(`https://opensea.io/assets/ethereum/${info.contract_addr}/${info.collection_number}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card ::v-deep .el-card__body {
  padding: 40px;
}
.content-header {
  padding: 18px 0;
  background: 0px 0px url("~@/assets/content_header_bg.png") #FAFAFA no-repeat;
  background-size: cover;
  text-align: center;
}
.header-container {
  display: inline-block;
  display: flex;
  max-width: 1214px;
  margin: 0 auto;
  padding-right: 30px;
}
.input-container {
  flex: 1;
  .el-input--prefix {
    ::v-deep.el-input__inner {
      padding-left: 81px;
    }
    .svg-icon {
      font-size: 36px;
      left: 19px;
    }
  }
}
.select-container ::v-deep{
  width: 292px;
  padding-left: 10px;
  .el-select {
    width: 100%;
  }
  .el-input__inner {
    padding-left: 20px;
    padding-right: 43px;
  }
  .el-input__suffix {
    right: 18px;
  }
}
.input-item ::v-deep {
  margin-top: 60px;
  .el-input {
    font-size: $fontSizeMedium;
    ::placeholder {
      color: $colorTextLowLightPlaceholder;
    }
  }
  .el-input__inner {
    height: 62px;
    color: $colorSpecialPrimary;
    border-color: $colorSpecialPrimary;
    font-size: $fontSizeLarge;
  }
  .el-select .el-input .el-select__caret::before {
    color: $colorSpecialPrimary;
    position: relative;
  }
}
.decoration-container {
  background: 0px 0px url("~@/assets/search_decoration.png") no-repeat;
  background-size: cover;
  width: 242px;
  height: 363px;
  position: relative;
  left: 10px;
  z-index: 2;
}
.content-container {
  margin-bottom: 10px;
}
.main-container {
  padding: 20px 10px 90px;
}
.content-item {
  margin-bottom: 29px;
  cursor: pointer;
  &__container {
    padding: 20px;
    border: 1px solid transparent;
    transition: all .2s;
    &:hover {
      @include base-box-shadow;
      background: white;
      border-radius: $borderRadiusLowBase;
    }
  }
}
.content-info {
  @include font-size-low-medium;
  color: $colorPrimary;
  margin-top: 10px;
  text-align: center;
  &__heavy {
    @include font-size-medium;
    @include semibold-font-family;
    margin-bottom: 5px;
  }
  &__secondary {
    @include font-size-low-medium;
    @include medium-font-family;
  }

}
.content-image {
  padding-bottom: 100%;
  position: relative;
  border-radius: $borderRadiusLowBase;
  overflow: hidden;
  &__main {
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
      border-radius: $borderRadiusLowBase;
      overflow: hidden;
      object-fit: cover;
    }
  }
}

.card__link {
  display: block;
}

::v-deep .el-input--prefix {
  .el-input__inner {
    padding-left: 45px;
  }
  .svg-icon {
    font-size: $fontSizeLarge;
    position: absolute;
    top: 11px;
    left: 10px;
  }
}
.table-pagination {
  text-align: center;
}

@media only screen and (max-width: 767px) {
  .header-container {
    display: block;
    min-height: 363px;
    padding: 80px 10px 0;
  }
  .decoration-container {
    position: absolute;
    top: 20px;
    left: 0;
    z-index: 0;
  }
  .input-item {
    margin-top: 0;
    opacity: 0.96;
    ::v-deep.el-input__inner {
      height: 50px;
      font-size: $fontSizeMedium;
    }
  }
  .input-container {
    .el-input--prefix {
      ::v-deep.el-input__inner {
        padding-left: 55px;
      }
      .svg-icon {
        font-size: 24px;
        left: 10px;
        top: 13px;
      }
    }
  }
  .select-container {
    padding-left: 0;
    width: 260px;
    margin: 0 0 0 auto;
    margin-top: 20px;
    background-color: transparent!important;
  }
}
</style>
