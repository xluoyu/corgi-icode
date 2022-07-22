import { merge } from 'lodash'

export * from './template'

export function warnMsg(msg: string) {
  console.warn(`[lowcode-core]: ${msg}`)
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
