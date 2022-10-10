/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-16 16:40:32
 */
export function findDeepItem<T>(
  list: any[],
  filter: (a: any) => boolean,
): T | null {
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

/**
 * JSON 数据美化
 * @param code
 * @returns
 */
export function prettyFormat(code: any) {
  try {
    // console.log(code)
    for (const key in code) {
      console.log(key)
      if (typeof code[key] === 'function') {
        const str = code[key]
        code[key] = unescape(`${str}`.replaceAll(/\\\u/gi, '%u'))
      }
    }
    // console.log(code['职业'])
    // 设置缩进为2个空格
    let str = JSON.stringify(code, null, 2)
    str = str
      .replace(/&/g, '&')
      .replace(/</g, '<')
      .replace(/>/g, '>')
    return str
  } catch (e) {
    console.error(`异常信息:${e}`)
    return ''
  }
}
