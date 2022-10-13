import type { renderWidgetCode } from '@corgi-icode/core'
import { formatArrt } from '@corgi-icode/core'
import componentTemplate from './componentTemplate'

const run: renderWidgetCode = (
  options: Record<string, any>,
) => {
  const attrs = ['header', 'collapse', 'background']
  const attrsStr = attrs
    .map(attr => formatArrt(`${attr}`, options[attr]))
    .filter(Boolean)
    .join(' ')

  if (options.collapse) {
    return {
      template: (children: string) => `<corgi-card ${attrsStr}>${children}</corgi-card>`,
      importList: { '@/components/CorgiCard': 'CorgiCard' },
      componentName: 'CorgiCard',
      componentTemplate,
    }
  } else {
    return {
      template: (children: string) => `<el-card ${attrsStr}>${children}</el-card>`,
    }
  }

  // return {
  //   template: (children: string) => `<corgi-card ${attrsStr}>${children}</corgi-card>`,
  //   importList: { '@/components/CorgiCard': 'CorgiCard' },
  //   componentName: 'CorgiCard',
  //   componentTemplate,
  // }
}

export default run
