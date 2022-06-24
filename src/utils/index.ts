import { merge } from 'lodash'

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
    expect(mixinValue('class.age.sd', 'auto', { class: { zzc: 'aa' } })).toEqual({ class: { zzc: 'aa', age: { sd: 'auto' } } })
  })
}

export function findDeepItem<T>(list: any[], filter: (a: any) => boolean): T | null {
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    if (filter(item)) {
      return item
    }
    if (item.children) {
      const res: any = findDeepItem(item.children, filter)
      if (res) {
        return res
      }
    }
  }
  return null
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('should findDeepItem', () => {
    const obj = [
      { key: 1, name: '小明' },
      {
        key: 2,
        name: '小蓝',
        children: [
          { key: 3, name: '小红' },
          { key: 4, name: '小绿' },
        ],
      },
    ]
    const item = findDeepItem<any>(obj, ({ key }) => key === 3)
    item.name = '小红2.0'
    expect(obj[1].children && obj[1].children[0].name).toEqual('小红2.0')
  })
}
