import Input from './input'
import Select from './select'
// import Textarea from './textarea'
import type { IFormList } from './type'
export * from './validate'
export * from './options'

export const GetCompList = (): IFormList => {
  return [
    {
      title: 'basic',
      children: [
        Input,
        Select,
      ],
    },
  ]
}
