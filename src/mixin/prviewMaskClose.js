const imagePrviewClickFn = (e) => {
  if (e.target.parentNode.className === 'el-image-viewer__actions__inner') {
    return
  }
  document.querySelector('.el-image-viewer__close').click()
  document.querySelector('.el-image-viewer__wrapper').removeEventListener('click', imagePrviewClickFn, false)
}

export default {
  methods: {
    imagePrviewMaskClose() {
      this.$nextTick(() => {
        const domImageMask = document.querySelector('.el-image-viewer__wrapper')
        if (!domImageMask) {
          return
        }
        domImageMask.addEventListener('click', imagePrviewClickFn)
      })
    }
  }
}

