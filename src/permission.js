import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'

function isMobile() {
  const limitWidth = 767
  const rect = document.body.getBoundingClientRect()
  return rect.width - 1 < limitWidth
}

function setMobileStyle(path) {
  if (/^\/m\//.test(path)) {
    document.documentElement.style.fontSize = '10vw'
    if (isMobile()) {
      document.documentElement.classList.remove('desktop-limit')
    } else {
      document.documentElement.classList.add('desktop-limit')
    }
  } else {
    document.documentElement.style.fontSize = ''
  }
}

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  setMobileStyle(to.path)
  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  next()

  NProgress.done()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
