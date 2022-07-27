import { formatArrt } from '@/utils/renderTemplate'

export default function(
  formOptions: Record<string, any>,
) {
  const attrs = ['gutter']
  const attrsStr = attrs
    .map(attr => formatArrt(attr, formOptions[attr]))
    .filter(Boolean)
    .join(' ')

  return {
    template: (children: string) => `<el-row ${attrsStr}>${children}</el-row>`,
  }
}
