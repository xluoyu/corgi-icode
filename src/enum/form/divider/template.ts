import type { IFormItemOptions } from '../type'

export default function(options: IFormItemOptions) {
  return {
    template: `<el-divider>${options.content.value}</el-divider>`,
  }
}
