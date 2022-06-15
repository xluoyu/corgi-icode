export const validates = {
  phone: /^1[3456789]\d{9}$/,
  email: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
  idcard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
}

export function validateFn(key: string, _rule: RegExp) {
  return (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error(`Please input the ${key}`))
    }
    if (!_rule.test(value)) {
      callback(new Error(`Please input the correct ${key}`))
    } else {
      callback()
    }
  }
}
