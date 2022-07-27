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
    console.log(obj, '数组')
    return `[${obj.map(item => objectToString(item)).join(', ')}]`
  }

  if (obj instanceof Object) {
    console.log(obj, '对象')

    return `{${Object.keys(obj).map(key => `${key}: ${obj[key] ? `'${obj[key]}'` : '\'\''}`).join(', ')}}`
  }
  console.log(obj, '其他')

  return JSON.stringify(obj)
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
