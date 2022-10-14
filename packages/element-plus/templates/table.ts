export default {
  title: '数据列表',
  type: 'template',
  key: '1665732072875',
  photo: 'https://pic1.imgdb.cn/item/6349109016f2c2beb1b9bc36.jpg',
  uuId: 8,
  widgetList: [
    {
      title: '卡片',
      type: 'card',
      key: 'card_1',
      component: 'element-plus-card',
      noForm: true,
      children: [
        {
          title: '表单',
          type: 'form',
          key: 'form_2',
          noForm: true,
          children: [
            {
              title: '输入框',
              type: 'input',
              key: 'input_3',
              form: {
                _key: { label: '绑定key', type: 'input', value: 'name' },
                value: { label: '默认值', type: 'input', value: '' },
                label: { label: '标签文本', type: 'input', value: '姓名' },
                type: {
                  label: '输入框类型',
                  type: 'inputTypeSelect',
                  value: 'text',
                },
                placeholder: {
                  label: '占位内容',
                  type: 'input',
                  value: '请输入姓名',
                },
                clearable: { label: '可清空', type: 'switch', value: false },
                required: { label: '必填', type: 'switch', value: false },
                validate: {
                  label: '校验规则',
                  type: 'validateSelect',
                  value: '',
                },
                maxlength: { label: '最大长度', type: 'input', value: '' },
                minlength: { label: '最小长度', type: 'input', value: '' },
                showWordLimit: {
                  label: '显示字数限制',
                  type: 'switch',
                  value: false,
                },
              },
              component: 'element-plus-input',
              parent: 'form_2',
            },
            {
              title: '输入框',
              type: 'input',
              key: 'input_4',
              form: {
                _key: { label: '绑定key', type: 'input', value: 'phone' },
                value: { label: '默认值', type: 'input', value: '' },
                label: { label: '标签文本', type: 'input', value: '手机号' },
                type: {
                  label: '输入框类型',
                  type: 'inputTypeSelect',
                  value: 'number',
                },
                placeholder: {
                  label: '占位内容',
                  type: 'input',
                  value: '请输入手机号',
                },
                clearable: { label: '可清空', type: 'switch', value: false },
                required: { label: '必填', type: 'switch', value: false },
                validate: {
                  label: '校验规则',
                  type: 'validateSelect',
                  value: '',
                },
                maxlength: { label: '最大长度', type: 'input', value: '' },
                minlength: { label: '最小长度', type: 'input', value: '' },
                showWordLimit: {
                  label: '显示字数限制',
                  type: 'switch',
                  value: false,
                },
              },
              component: 'element-plus-input',
              parent: 'form_2',
            },
            {
              title: '日期选择器',
              type: 'date',
              key: 'date_5',
              component: 'element-plus-date',
              form: {
                _key: { label: '绑定key', type: 'input', value: 'date' },
                value: { label: '默认值', type: 'input', value: '' },
                label: {
                  label: '标签文本',
                  type: 'input',
                  value: '加入日期',
                },
                editable: { label: '可输入', type: 'switch', value: true },
                clearable: { label: '可清空', type: 'switch', value: true },
                type: {
                  label: '显示类型',
                  type: 'dateTypeSelect',
                  value: 'date',
                },
                placeholder: {
                  label: '占位内容',
                  type: 'input',
                  value: '请选择时间',
                },
                startPlaceholder: {
                  label: '开始占位内容',
                  type: 'input',
                  value: '开始时间',
                },
                endPlaceholder: {
                  label: '结束占位内容',
                  type: 'input',
                  value: '结束时间',
                },
                rangeSeparator: {
                  label: '范围分隔符',
                  type: 'input',
                  value: '-',
                },
                format: {
                  label: '显示格式',
                  type: 'input',
                  value: 'YYYY-MM-DD',
                },
                valueFormat: {
                  label: '输出格式',
                  type: 'input',
                  value: 'YYYY-MM-DD',
                },
              },
              parent: 'form_2',
            },
          ],
          form: {
            '_key': { label: '数据对象', type: 'input', value: 'form_2' },
            'style.width': { label: '表单宽度', type: 'input', value: '' },
            'inline': { label: '行内模式', type: 'switch', value: true },
            'label-width': { label: '标签宽度', type: 'input', value: '' },
            'label-position': {
              label: '标签位置',
              type: 'labelPosition',
              value: 'left',
            },
            'size': { label: '组件大小', type: 'formSize', value: 'default' },
            'formType': {
              label: '表单类型',
              type: 'formTypeSelect',
              value: 'filter',
            },
          },
          component: 'element-plus-form',
          parent: 'card_1',
        },
      ],
      form: {
        header: { label: '标题', type: 'input', value: '数据筛选' },
        collapse: { label: '折叠', type: 'switch', value: false },
        background: { label: '背景色', type: 'alphaColor', value: '' },
      },
    },
    {
      title: '卡片',
      type: 'card',
      key: 'card_6',
      component: 'element-plus-card',
      noForm: true,
      children: [
        {
          title: '表格',
          type: 'table',
          key: 'table_7',
          noForm: true,
          children: [],
          form: {
            _key: { label: '数据源', type: 'input', value: 'table_7' },
            columns: {
              label: '列表',
              type: 'listOptions',
              value: {
                姓名: 'name',
                // eslint-disable-next-line no-template-curly-in-string
                年龄: '${age}岁',
                手机号: 'phone',
                地址: 'address',
              },
            },
            data: {
              label: '数据',
              type: 'codeEmit',
              value: [
                {
                  name: '张三',
                  age: 18,
                  phone: 13255668899,
                  address: '浙江省杭州市西湖区断桥景点旁第三棵树下',
                },
                {
                  name: '李四',
                  age: 19,
                  phone: 13255668877,
                  address: '浙江省杭州市西湖区断桥景点旁第四棵树下',
                },
              ],
            },
            stripe: { label: '斑马线', type: 'switch', value: false },
            border: { label: '边框', type: 'switch', value: false },
            hasPagination: { label: '需要分页', type: 'switch', value: true },
            pageSize: { label: '每页个数', type: 'inputNumer', value: 20 },
          },
          component: 'element-plus-table',
          parent: 'card_6',
        },
      ],
      form: {
        header: { label: '标题', type: 'input', value: '用户列表' },
        collapse: { label: '折叠', type: 'switch', value: false },
        background: { label: '背景色', type: 'alphaColor', value: '' },
      },
    },
  ],
}
