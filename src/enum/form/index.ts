import type { IFormList } from './type'
import Input from './input'
import Select from './select'
import Textarea from './textarea'
import Switch from './switch'
import Color from './color'
import Radio from './radio'
import Checkbox from './checkbox'
export * from './validate'
export * from './options'

export const GetCompList = (): IFormList => {
  return [
    {
      title: 'basic',
      children: [
        Input,
        Select,
        Textarea,
        Switch,
        Color,
        Radio,
        Checkbox,
      ],
    },
  ]
}
