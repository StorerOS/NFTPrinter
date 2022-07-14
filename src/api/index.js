import request from '@/utils/request'

// get chain info
export function getCHRChainConfig() {
  return request({
    url: '/nft/chr/chain',
    method: 'post',
    data: {}
  })
}

// add NFT wallet address
export function addNftWallet(data) {
  return request({
    url: '/nft/add/wallet',
    method: 'post',
    data
  })
}

// get NFT rent list
export function getNftRentList(data) {
  return request({
    url: '/nft/list/collection',
    method: 'post',
    data
  })
}

// get account NFT rent list
export function getAccountNftRentList(data) {
  return request({
    url: '/nft/account/collection',
    method: 'post',
    data
  })
}

// get product list
export function getProduct(data) {
  return request({
    url: '/nft/list/product',
    method: 'post',
    data
  })
}

// NFT rent
export function nftRent(data) {
  return request({
    url: '/nft/rent/collection',
    method: 'post',
    data
  })
}

// cancel NFT rent
export function cancelNftRent(data) {
  return request({
    url: '/nft/cancel/collection',
    method: 'post',
    data
  })
}

// NFT print
export function nftPrint(data) {
  return request({
    url: '/nft/add/order',
    method: 'post',
    data
  })
}

// NFT order list
export function getNftOrderList(data) {
  return request({
    url: '/nft/list/order',
    method: 'post',
    data
  })
}

// get product specification information
export function getProductSpecInfo(data) {
  return request({
    url: '/nft/product/attr',
    method: 'post',
    data
  })
}

// get product detail
export function getProductDetail(data) {
  return request({
    url: '/nft/product/detail',
    method: 'post',
    data
  })
}

