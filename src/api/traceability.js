import request from '@/utils/request'

// Whether to calibrate for the first time
export function isFirstCheck(data) {
  return request({
    url: '/nft/first/scan',
    method: 'post',
    data
  })
}

// Captcha verification
export function verificationCodeCheck(data) {
  return request({
    url: '/nft/scan/code',
    method: 'post',
    data
  })
}

// Get a list of scan records
export function getScanCodeRecordList(data) {
  return request({
    url: '/nft/list/scan',
    method: 'post',
    data
  })
}

