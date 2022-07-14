<template>
  <div class="main-container">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'MainContainer'
}
</script>

<style lang="scss" scoped>
.main-container {
  min-height: 100%;
  width: 100%;
  max-width: $layoutContentWidth;
  margin: 0px auto;
  padding: 40px 10px;
}
</style>
