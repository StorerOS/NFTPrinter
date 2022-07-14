
function validateProduct(rule, val, callback) {
  if (!val) {
    callback(new Error('Please select the product'))
  } else if (!val.selectedSpecs || !val.selectedSpecs.sku_id) {
    callback(new Error('Please select the specification'))
  } else {
    callback()
  }
}

function validateAmount(rule, val, callback) {
  const { product } = this.form
  const reg = /^[0-9]*$/g
  const value = Number(val)
  if (!value || value === 0) {
    callback(new Error('Please enter the quantity'))
  } else if (!reg.test(value)) {
    callback(new Error('Please enter the correct quantity'))
  } else if (product && product.selectedSpecs && value > Number(product.selectedSpecs.inventory)) {
    callback(new Error('The order quantity cannot exceed the stock quantity'))
  } else {
    callback()
  }
}

export function formRules() {
  return {
    product: [
      { required: true, validator: validateProduct.bind(this), trigger: 'change' }
    ],
    amount: [
      { required: true, validator: validateAmount.bind(this), trigger: 'blur' }
    ],
    contact_name: [
      { required: true, message: 'Please enter the full name', trigger: 'blur' }
    ],
    contact_info: [
      { required: true, message: 'Please enter the email', trigger: 'blur' },
      { pattern: /^[\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g, message: 'Please enter the correct email', trigger: 'blur' }
    ],
    contact_address: [
      { required: true, message: 'Please enter the address', trigger: 'blur' }
    ]
  }
}

export { default as SpecAdjoinMatrix } from './spec-adjoin-martix'

