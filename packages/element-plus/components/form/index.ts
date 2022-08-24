/*
 * @Description:
 * @Author: xluoyu
 * @LastEditTime: 2022-08-24 21:06:49
 */
import Form from './form.vue'
import Template from './template'
import validateFn from './validate'

Form.renderCodeTemplate = Template
Form.validateFn = validateFn

// 本组件下的依赖组件，用于同时挂载
Form.dependents = ['input']

export default Form
