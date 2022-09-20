export default function(options: Record<string, any>) {
  return {
    template: `<el-form-item label="${options.label}" prop="${options._key}">
    <el-divider>${options.content}</el-divider>
    </el-form-item>`,
  }
}
