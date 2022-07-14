import { removeAllAuthInfo } from '@/utils/auth'

const getDefaultState = () => {
  return {
    metaMaskAccount: null,
    isInstallMetaMask: false,
    isConnectionMetaMask: false
  }
}

const state = getDefaultState()

const mutations = {
  SET_METAMASK_ACCOUNT: (state, account) => {
    state.metaMaskAccount = account
  },
  SET_IS_INSTALL_METAMASK: (state, flag) => {
    state.isInstallMetaMask = flag
  },
  SET_IS_CONNECTION_METAMASK: (state, flag) => {
    state.isConnectionMetaMask = flag
  }
}

const actions = {
  setMetaMaskAccount: ({ commit }, account) => {
    commit('SET_METAMASK_ACCOUNT', account)
  },
  setIsInstallMetaMask: ({ commit }, flag) => {
    commit('SET_IS_INSTALL_METAMASK', flag)
  },
  setIsConnectionMetaMask: ({ commit }, flag) => {
    commit('SET_IS_CONNECTION_METAMASK', flag)
  },
  resetWallet({ commit }) {
    return new Promise(resolve => {
      removeAllAuthInfo()
      Object.assign(state, getDefaultState())
      resolve()
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
