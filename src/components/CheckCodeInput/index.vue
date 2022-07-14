<template>
  <div class="input-container" @click="inputFocus">
    <el-input ref="inputCode" v-model="val" type="text" :maxlength="count" class="input-layer" @keydown.native.delete="backInput" @keyup.native="inputChange" />
    <div v-for="index in count" :key="index" :input-key="index" class="text-item">
      {{ form[`value${index}`] }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckCodeInput',
  props: {
    count: {
      type: Number,
      default: 6
    }
  },
  data() {
    return {
      form: {},
      val: ''
    }
  },
  methods: {
    inputFocus() {
      this.$refs.inputCode.focus()
    },
    inputChange() {
      const { val } = this
      if (val) {
        const textList = document.querySelectorAll('.text-item')
        for (const index in val) {
          textList[Number(index)].classList.add('active')
          this.$set(this.form, `value${Number(index) + 1}`, val[index])
        }

        if (val.length >= this.count) {
          this.$refs.inputCode.blur()
          this.$emit('complete', this.val)
        }
      }
    },
    backInput(e) {
      const curText = document.querySelectorAll('.text-item')[this.val.length - 1]
      curText && curText.classList.remove('active')
      this.form[`value${this.val.length}`] = ''
    },
    clear() {
      Object.keys(this.form).forEach(key => {
        this.form[key] = ''
      })
      this.val = ''
      const curText = document.querySelectorAll('.text-item')
      for (const el of curText) {
        el.classList.remove('active')
      }
      this.$refs.inputCode.blur()
    }
  }
}
</script>

<style lang="scss" scoped>
.input-container {
  text-align: center;
  display: inline-block;
  position: relative;
  height: rem(30px);
  .input-layer {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    z-index: -9999;
  }
  .text-item {
    height: 100%;
    width: rem(26px);
    margin: 0 rem(10px);
    display: inline-block;
    position: relative;
    color: $colorSpecialPrimary;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: rem(3px);
      border-radius: 3px;
      background-color: #dddddd;
    }
    &.active::after {
      background-color: $colorSpecialPrimary;
    }
    ::v-deep.el-input__inner {
      padding: 0;
      border: none;
      text-align: center;
      color: $colorSpecialPrimary;
    }
  }
}
</style>
