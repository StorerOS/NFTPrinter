import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import fileDownload from 'js-file-download'
import _ from 'lodash'

async function getResponseDataAndBlob(res) {
  let resBlobData
  if (res && res.data) resBlobData = res.data
  let resData = null
  try {
    const data = await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.addEventListener('about', reject)
      reader.addEventListener('error', reject)
      reader.addEventListener('loadend', () => {
        resolve(reader.result)
      })
      reader.readAsText(resBlobData)
    })
    resData = JSON.parse(data)
  // eslint-disable-next-line no-empty
  } catch (err) {}
  return { resData, resBlobData }
}

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30 * 1000, // request timeout
  responseType: 'blob'
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Auth-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  async response => {
    const { resData, resBlobData } = await getResponseDataAndBlob(response)
    const resHeader = resData.header

    if ([0].includes(resHeader && resHeader.code)) {
      return resData
    }

    let disposition = response.headers['content-disposition']
    if (disposition) {
      disposition = decodeURIComponent(disposition)
    }

    if (disposition && disposition.includes('attachment')) { // download file
      const fileNameReg = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
      const fileNameMatchList = fileNameReg.exec(disposition)
      let filename
      if (fileNameMatchList && fileNameMatchList[1]) {
        filename = fileNameMatchList[1].replace(/['"]/g, '')
      }
      if (resData) { // If the data can be parsed normally, the download fails.
        return Promise.reject(resData)
      } else { // download success
        fileDownload(resBlobData, filename)
        return
      }
    } else {
      Message.closeAll()
      Message({
        message: resHeader.message || 'Server Error',
        type: 'error',
        duration: 5 * 1000
      })
      const { config } = response
      const resSerialize = JSON.stringify(
        _.assign(resHeader || { message: 'Server Error' }, {
          requestConfigUrl: config.url,
          requestConfigBody: config.data
        })
      )
      return Promise.reject(resSerialize)
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
