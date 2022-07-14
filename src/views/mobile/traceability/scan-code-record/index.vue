<template>
  <div class="detail-table">
    <div class="detail-header">
      <div class="detail-row">
        <div class="detail-column" />
        <div class="detail-column" />
        <div class="detail-column">Scan Time (GMT)</div>
        <div class="detail-column">Scan Details</div>
      </div>
    </div>
    <div class="detail-body">
      <div v-for="item in list" :key="item.count" class="detail-row">
        <div class="detail-column column-decoration"><svg-icon icon-class="round" /></div>
        <div class="detail-column">{{ item.count }}</div>
        <div class="detail-column">{{ item.created_time }}</div>
        <div class="detail-column">{{ item.city }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getScanCodeRecordList } from '@/api/traceability'
import { Loading } from 'element-ui'

export default {
  name: 'TraceabilityScanCodeRecord',
  data() {
    return {
      list: []
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        const { id } = to.query
        if (!id) return

        this.getRecordList(id)
      },
      immediate: true
    }
  },
  methods: {
    async getRecordList(id) {
      const loadingInstance = Loading.service({ fullscreen: true })
      try {
        const { data } = await getScanCodeRecordList({ id: Number(id) })
        this.list = data && data.list || []
      } finally {
        loadingInstance.close()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-table {
  padding: rem(20px) rem(16px);
}
.detail-header {
  @include font-size-low-medium-rem;
  @include special-font-family;
  color: #fff;
  background: linear-gradient(95deg, #FFFFFF 0%, #92CBCB 35%, #2A999A 100%);
  border-radius: 3px;
  position: relative;
  margin-bottom: rem(20px);
  .detail-column {
    padding: rem(4px) 0;
    &:nth-child(2) {
      width: rem(75px);
    }
  }
  &::after {
    content: '';
    background: 0px 0px url("~@/assets/table_decoration.png") transparent no-repeat;
    background-size: cover;
    width: rem(54px);
    height: rem(39px);
    position: absolute;
    top: 0;
    left: 0;
  }
}
.detail-row {
  display: flex;
  .detail-column {
    @include text-ellipsis;
    flex: 1;
    text-align: center;
  }
  .detail-column:nth-child(1) {
    flex: none;
  }
  .detail-column:nth-child(2) {
    flex: none;
  }
}
.detail-body {
  @include font-size-extra-small-rem;
  @include regular-font-family;
  padding-left: rem(10px);
  .detail-row {
    &:last-of-type .column-decoration::after {
      display: none;
    }
  }
  .detail-column {
    padding-bottom: rem(15px);
    &:nth-child(2) {
      width: rem(50px);
    }
  }
  .column-decoration {
    position: relative;
    margin-right: rem(5px);
    &::after {
      content: '';
      width: 0px;
      height: 100%;
      position: absolute;
      left: 50%;
      transform: translate3d(-50%, 0px, 0px);
      top: rem(18px);
      border-left: 1px dashed $colorSpecialPrimary;
      z-index: -1;
    }
    .svg-icon {
      height: rem(18px);
      width: rem(14px);
      padding-right: rem(2px);
      position: relative;
      left: rem(1px);
    }
  }
}
</style>
