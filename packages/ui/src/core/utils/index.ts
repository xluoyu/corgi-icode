/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-15 17:34:18
 */
import { merge } from 'lodash'

export * from './template'

export function errorMsg(msg: string, source: string) {
  console.error(`[lowcode-core]: ${msg}`, source)
}

/**
 * key 为 ‘a.b.c’ 形式的字符串
 * target 为 原始数据
 *
 * 将key拆分成对象, 合并到target中
 *
 * @param key string
 * @param target
 */
export function mixinValue(keyStr: string, value: any, target: any) {
  const res: any = {}
  const keys = keyStr.split('.')

  function de(value: string, obj: any) {
    if (keys.length === 1) {
      obj[keys[0]] = value
    } else {
      const key = keys.shift()
      if (key) {
        obj[key] = {}
        de(value, obj[key])
      }
    }
  }

  de(value, res)

  return merge(target, res)
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('should standardResultType', () => {
    expect(mixinValue('name', 'a', {})).toEqual({ name: 'a' })
    expect(
      mixinValue('class.age.sd', 'auto', { class: { zzc: 'aa' } }),
    ).toEqual({ class: { zzc: 'aa', age: { sd: 'auto' } } })
  })
}

export function objectToString(obj: any): string {
  if (Array.isArray(obj)) {
    return `[${obj.map(item => objectToString(item)).join(', ')}]`
  }

  if (obj instanceof Object) {
    return `{${Object.entries(obj).map(([key, cur]) => `${key}: ${cur ? `${objectToString(cur)}` : '\'\''}`).join(', ')}}`
  }

  if (typeof obj === 'boolean' || typeof obj === 'number' || typeof obj === 'function') {
    return `${obj}`
  }

  if (typeof obj === 'string' && obj.includes(') => {')) {
    return `${obj}`
  }

  return `'${obj}'`
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('should objectToString', () => {
    expect(objectToString({
      name: '你们',
      age: 2,
    })).toEqual('{name: \'你们\', age: \'2\'}')
    expect(
      objectToString([
        { name: '阿松大', age: '2' },
        { name: '阿松二', age: '3' },
      ]),
    ).toEqual('[{name: \'阿松大\', age: \'2\'}, {name: \'阿松二\', age: \'3\'}]')
  })
}

export function importLibs(key) {
  if (process.env.NODE_ENV === 'production') {

  } else {

  }
}
