const getters = {
  sidebar: state => state.home.sidebar,
  metaMaskAccount: state => state.user.metaMaskAccount,
  isInstallMetaMask: state => state.user.isInstallMetaMask,
  isConnectionMetaMask: state => state.user.isConnectionMetaMask
}
export default getters
