<template>
  <div class="empty-container">
    <div class="empty-icon"><i class="el-icon-box" /></div>
    <div class="empty-text">No Data</div>
  </div>
</template>

<script>
export default {
  name: 'EmptyContainer'
}
</script>

<style lang="scss" scoped>
.empty-container {
  padding: 80px 0px;
  text-align: center;
  color: $colorTextSecondary;
  .empty-icon i[class^=el-icon-] {
    font-size: 60px;
    color: $colorTextLight;
  }
  .empty-text {
    padding: 5px 0px;
  }
}
</style>
