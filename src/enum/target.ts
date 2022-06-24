/**
 * 最终生成的目标
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const target = {
  name: '表单名称',
  key: 'form01',
  options: [
    { key: 'style.width', value: '100%', comp: 'input' },
    { key: 'inline', value: false, comp: 'switch' },
    { key: 'labelWidth', value: '100px', comp: 'input' },
    { key: 'labelPosition', value: 'left', comp: 'labelPosition' },
  ],
  children: [
    {
      key: 'input01',
      component: 'cg-input',
      optinos: [
        { key: 'label', value: '姓名', comp: 'input' },
        { key: '_key', value: 'name', comp: 'input' },
        { key: 'required', value: true, comp: 'switch' },
        { key: 'type', value: 'password', comp: 'iputTypeSelect' },
        { key: 'validate', value: 'phone', comp: 'validateSelect' },
      ],
    },
    {
      key: 'select01',
      component: 'cg-select',
      optinos: [
        { key: 'label', value: '职位', comp: 'input' },
        { key: '_key', value: 'job', comp: 'input' },
        { key: 'optinos', value: [{ label: '前端', value: 'q' }, { label: '后端', value: 'h' }], comp: 'selectOptions' },
      ],
    },
    {
      key: 'number01',
      component: 'cg-number',
      optinos: [
        { key: 'label', value: '年龄', comp: 'input' },
        { key: '_key', value: 'age', comp: 'input' },
        { key: 'required', value: true, comp: 'switch' },
      ],
    },
    {
      key: 'grid01',
      component: 'cg-grid',
      optinos: [],
      children: [
        {
          key: 'input02',
          component: 'cg-input',
          optinos: [],
        },
      ],
    },
  ],
}
