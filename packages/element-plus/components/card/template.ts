import type { renderWidgetCode } from '@corgi-icode/core'
import { formatArrt } from '@corgi-icode/core'
import componentTemplate from './componentTemplate'

const run: renderWidgetCode = (
  formOptions: Record<string, any>,
) => {
  const attrs = ['title', 'collapse', 'background']
  const attrsStr = attrs
    .map(attr => formatArrt(`${attr}`, formOptions[attr]))
    .filter(Boolean)
    .join(' ')

  return {
    template: (children: string) => `<corgi-card ${attrsStr}>${children}</corgi-card>`,
    importList: { '@/components/CorgiCard': 'CorgiCard' },
    componentName: 'CorgiCard',
    componentTemplate,
  }
}

export default run
