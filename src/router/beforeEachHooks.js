import queryString from 'query-string'

export default {
  // To prevent users from refreshing the page, the number of scans will increase, so add a [scan] logo and delete the logo after reaching the target page
  locationValidatePage: (to, from, next) => {
    if (to.path === '/m/traceability/check') {
      const params = {
        ...to.query,
        scan: 1
      }
      next({ path: `/m/traceability/validate?${queryString.stringify(params)}`, replace: true })
      return
    }
    next()
  }
}
