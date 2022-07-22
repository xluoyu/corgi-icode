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
