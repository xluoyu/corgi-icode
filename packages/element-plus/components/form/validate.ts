/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-24 20:40:07
 */
export default function validateFn(key: string, _rule: RegExp) {
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
