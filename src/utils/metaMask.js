import detectEthereumProvider from '@metamask/detect-provider'
import { Message } from 'element-ui'
import store from '@/store'
import MetaMaskOnboarding from '@metamask/onboarding'
import { getWallet, setWallet } from '@/utils/auth'

const onboarding = new MetaMaskOnboarding()

const tipsAndLogs = (msg) => {
  console.error(msg)
  Message.error(msg)
}

const isMetaMaskProvider = async() => {
  const provider = await detectEthereumProvider()
  let msg = ''
  if (provider) {
    if (provider !== window.ethereum) {
      msg = 'Do you have multiple wallets installed?'
    }
  } else {
    msg = 'Please install MetaMask!'
  }
  if (msg) {
    Message.error(msg)
    return false
  }
  return true
}
const isMetaMaskInstalled = () => {
  // Have to check the ethereum binding on the window object to see if it's installed
  const { ethereum } = window

  const isInstallMetaMask = Boolean(ethereum && ethereum.isMetaMask)

  return isInstallMetaMask
}

const handleAccountsChanged = async(accounts) => {
  const isInstalled = isMetaMaskInstalled()
  store.dispatch('user/setIsInstallMetaMask', isInstalled)
  if (accounts && accounts.length > 0) {
    store.dispatch('user/setMetaMaskAccount', accounts[0])
    store.dispatch('user/setIsConnectionMetaMask', true)
    onboarding.stopOnboarding()
  } else {
    store.dispatch('user/setMetaMaskAccount', null)
    store.dispatch('user/setIsConnectionMetaMask', false)
  }
}

const addAccountsChanged = () => {
  // For now, 'eth_accounts' will continue to always return an array
  window.ethereum.on('accountsChanged', handleAccountsChanged)
}

const init = async() => {
  const isInstalled = isMetaMaskInstalled()
  const isProvider = await isMetaMaskProvider()
  store.dispatch('user/setIsInstallMetaMask', isInstalled)

  handleAccountsChanged()

  if (!isInstalled || !isProvider) return

  const walletInfo = getWallet()
  if (walletInfo) {
    const accounts = await window.ethereum.request({
      method: 'eth_accounts'
    })
    if (accounts[0]) {
      store.dispatch('user/setMetaMaskAccount', accounts[0])
      setWallet(accounts[0])
      store.dispatch('user/setIsConnectionMetaMask', true)
    }
  }
  addAccountsChanged()
}

const connection = async(fn) => {
  const msg = 'Please connect to MetaMask.'
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const { metaMaskAccount } = store.state.user
    if (accounts.length === 0) {
      tipsAndLogs(msg)
      return
    } else if (accounts[0] !== metaMaskAccount) {
      store.dispatch('user/setMetaMaskAccount', accounts[0])
      setWallet(accounts[0])
    }
    fn && await fn(store.state.user.metaMaskAccount)
  } catch (err) {
    if (err.code === 4001) {
      // EIP-1193 userRejectedRequest error
      // If this happens, the user rejected the connection request.
      tipsAndLogs(msg)
    } else {
      tipsAndLogs(err)
    }
  }
}

const operationRequest = async(fn) => {
  const isInstalled = isMetaMaskInstalled()
  if (!isInstalled) {
    Message.error('MetaMask is not installed, please install it first')
    window.setTimeout(() => {
      onboarding.startOnboarding()
    }, 1000)
    return
  }
  const { isConnectionMetaMask, metaMaskAccount } = store.state.user
  await (isConnectionMetaMask ? fn(metaMaskAccount) : connection(fn))
}

const initMetaMask = (() => {
  return {
    init,
    connection,
    operationRequest
  }
})()

export default initMetaMask
