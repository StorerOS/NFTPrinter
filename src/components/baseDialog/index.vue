<template>
  <el-dialog
    v-bind="$attrs"
    :show-close="false"
    :visible.sync="dialogVisible"
    v-on="$listeners"
  >
    <span v-if="$slots.title" slot="title">
      <slot name="title" />
      <svg-icon icon-class="close" class="close-icon" @click="closeDialog" />
    </span>
    <template v-for="key in Object.keys(filterSlot)" :slot="key">
      <slot :name="key">{{ $slots[key].default }}</slot>
    </template>
  </el-dialog>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'BaseDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {
    filterSlot() {
      return _.omit(this.$slots, ['title'])
    }
  },
  watch: {
    visible(newVal, oldVal) {
      this.dialogVisible = newVal
    }
  },
  methods: {
    hide(cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false)
        this.$emit('close')
        this.closed = true
      }
    },
    closeDialog() {
      const beforeClose = this.$attrs['before-close']
      if (typeof beforeClose === 'function') {
        beforeClose(this.hide)
      } else {
        this.hide()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  border-radius: $borderRadiusSmall;
  .el-dialog__header {
    @include font-size-very-large;
    @include special-font-family;
    padding: 23px 30px;
    color: $colorSpecialPrimary;
    letter-spacing: 1px;
    background-color: $backgroundColorBase;
    border-radius: $borderRadiusLowBase;
    box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.13);
    .close-icon {
      font-size: $fontSizeLarge;
      float: right;
      position: relative;
      top: 5px;
      cursor: pointer;
    }
  }
  .el-dialog__body {
    padding: 30px 40px;
  }
  .el-dialog__footer {
    text-align: center;
    padding-top: 8px;
    padding-bottom: 36px;
    .el-button {
      min-width: 140px;
      border-radius: $borderRadiusTopLarge;
      padding-top: 18px;
      padding-bottom: 18px;
    }
  }
}

@media only screen and (max-width: 767px) {
  ::v-deep .el-dialog {
    width: 90%;
    .el-dialog__header {
      @include font-size-ceil-very-large;
    }
    .el-dialog__body {
      padding: 25px 20px;
    }
  }
}
</style>
