import { formatArrt } from '@/utils/renderTemplate'

export default function(
  formOptions: Record<string, any>,
) {
  const attrs = ['span', 'offset', 'push', 'pull']
  const attrsStr = attrs
    .map(attr => formatArrt(`:${attr}`, formOptions[attr]))
    .filter(Boolean)
    .join(' ')

  return {
    template: (children: string) => `<el-col ${attrsStr}>${children}</el-col>`,
  }
}
