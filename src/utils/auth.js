import Cookies from 'js-cookie'

const TokenKey = 'auth_wallet'
const nftSignKey = 'auth_nft'

export function getWallet() {
  return Cookies.get(TokenKey)
}

export function setWallet(token) {
  return Cookies.set(TokenKey, token)
}

export function removeWallet() {
  return Cookies.remove(TokenKey)
}

export function getNftSign() {
  return Cookies.get(nftSignKey)
}

export function setNftSign(token) {
  return Cookies.set(nftSignKey, token)
}

export function removeNftSign() {
  return Cookies.remove(nftSignKey)
}

export function removeAllAuthInfo() {
  Object.keys(Cookies.get()).forEach((key) => {
    Cookies.remove(key)
  })
  window.localStorage.clear()
}
