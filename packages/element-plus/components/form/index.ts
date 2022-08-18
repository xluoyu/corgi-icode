/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-18 10:30:06
 */
import type { App } from 'vue'
import pkg from '../../package.json'
import Input from '../input/input.vue'
import Form from './form.vue'
import Template from './template'

Form.renderCodeTemplate = Template

/**
 * 由于form中默认携带一个input
 *
 * 在注册form组件时同时注册input
 *
 * 否则可能会造成input注册延迟、页面不显示
 * @param app
 */
Form.install = (app: App) => {
  app.component(`${pkg.name.substring(pkg.name.lastIndexOf('/') + 1)}-form`, Form)
  app.component(`${pkg.name.substring(pkg.name.lastIndexOf('/') + 1)}-input`, Input)
}
export default Form
