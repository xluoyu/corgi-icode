export default function(options: Record<string, any>) {
  return {
    template: `<el-divider>${options.content}</el-divider>`,
  }
}
