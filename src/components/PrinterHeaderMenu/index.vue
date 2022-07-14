<template>
  <el-dropdown-item @click.native="$router.push('/recent-transactions')">
    <span>Recent Transactions</span>
  </el-dropdown-item>
</template>

<script>
export default {
  name: 'PrinterHeaderMenu'
}
</script>

<style>

</style>
