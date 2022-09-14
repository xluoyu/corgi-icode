export default function(options: Record<string, any>) {
  return {
    template: `<div :style="{${
      options.block ? '' : 'display: inline-block,'
    }${
      options.size !== 'large'
        ? `fontSize: var(--el-font-size-${options.size})`
        : ''
    }}">${options.content}</div>`,
  }
}
