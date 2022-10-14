import { objectToString } from '@corgi-icode/core'

export default function(options: Record<string, any>) {
  const style: Record<string, any> = {}
  if (!options.block) {
    style.display = 'inline-block,'
  }

  if (options.size !== 'large') {
    style.fontSize = `var(--el-font-size-${options.size})`
  }

  const styleStr = Object.keys(style).length ? `:style="${objectToString(style)}"` : ''

  return {
    template: `<div ${styleStr}>${options.content}</div>`,
  }
}
