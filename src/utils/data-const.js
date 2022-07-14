function findData(list, value, valueKey) {
  return ![undefined, null].includes(value) ? list.find(item => item[valueKey || 'value'] === value) || {} : list
}

export const sortList = [
  {
    value: false,
    text: 'Print Count：high to low'
  },
  {
    value: true,
    text: 'Print Count：low to high'
  }
]

export function walletStatus(code) {
  const list = [
    {
      value: 'MetaMask',
      text: 'MetaMask'
    }
  ]
  return findData(list, code)
}

export const explorerEnv = {
  'dev': 'http://localhost:9527',
  'test': 'http://localhost:9526',
  'prod': 'http://localhost:9525'
}
