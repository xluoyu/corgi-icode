import type { ITemplateOptions } from '@corgi-icode/core'

const data: ITemplateOptions = {
  title: '数据列表',
  type: 'template',
  key: '1660290981323',
  photo: 'http://iph.href.lu/200x200?text=数据列表',
  uuId: 10,
  widgetList: [{
    title: '卡片',
    type: 'card',
    key: 'card_3',
    component: 'cg-card',
    noForm: true,
    children: [{
      title: '表单',
      type: 'form',
      key: 'form_4',
      component: 'cg-form',
      noForm: true,
      children: [{
        title: '输入框',
        type: 'input',
        key: 'input_5',
        component: 'cg-input',
        form: {
          _key: {
            label: '绑定key',
            type: 'input',
            value: 'name',
          },
          value: {
            label: '默认值',
            type: 'input',
            value: '',
          },
          label: {
            label: '标签文本',
            type: 'input',
            value: '姓名',
          },
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
          clearable: {
            label: '可清空',
            type: 'switch',
            value: false,
          },
          required: {
            label: '必填',
            type: 'switch',
            value: false,
          },
          validate: {
            label: '校验规则',
            type: 'validateSelect',
            value: '',
          },
          maxlength: {
            label: '最大长度',
            type: 'input',
            value: '',
          },
          minlength: {
            label: '最小长度',
            type: 'input',
            value: '',
          },
          showWordLimit: {
            label: '显示字数限制',
            type: 'switch',
            value: false,
          },
        },
        parent: 'form_4',
      }, {
        title: '输入框',
        type: 'input',
        key: 'input_6',
        component: 'cg-input',
        form: {
          _key: {
            label: '绑定key',
            type: 'input',
            value: 'phone',
          },
          value: {
            label: '默认值',
            type: 'input',
            value: '',
          },
          label: {
            label: '标签文本',
            type: 'input',
            value: '手机号',
          },
          type: {
            label: '输入框类型',
            type: 'inputTypeSelect',
            value: 'text',
          },
          placeholder: {
            label: '占位内容',
            type: 'input',
            value: '请输入手机号',
          },
          clearable: {
            label: '可清空',
            type: 'switch',
            value: false,
          },
          required: {
            label: '必填',
            type: 'switch',
            value: false,
          },
          validate: {
            label: '校验规则',
            type: 'validateSelect',
            value: '',
          },
          maxlength: {
            label: '最大长度',
            type: 'input',
            value: '',
          },
          minlength: {
            label: '最小长度',
            type: 'input',
            value: '',
          },
          showWordLimit: {
            label: '显示字数限制',
            type: 'switch',
            value: false,
          },
        },
        parent: 'form_4',
      }, {
        title: '下拉框',
        type: 'select',
        key: 'select_7',
        component: 'cg-select',
        form: {
          _key: {
            label: '绑定key',
            type: 'input',
            value: 'sex',
          },
          value: {
            label: '默认值',
            type: 'input',
            value: '',
          },
          label: {
            label: '标签文本',
            type: 'input',
            value: '性别',
          },
          options: {
            label: '选项配置',
            type: 'selectOptions',
            value: [{
              label: '男',
              value: 1,
            }, {
              label: '女',
              value: 2,
            }],
          },
          placeholder: {
            label: '占位内容',
            type: 'input',
            value: '请选择性别',
          },
          clearable: {
            label: '可清空',
            type: 'switch',
            value: false,
          },
          required: {
            label: '必填',
            type: 'switch',
            value: false,
          },
          multiple: {
            label: '多选',
            type: 'switch',
            value: false,
          },
          filterable: {
            label: '可搜索',
            type: 'switch',
            value: false,
          },
        },
        parent: 'form_4',
      }],
      form: {
        'dataName': {
          label: '数据对象',
          type: 'input',
          value: '',
        },
        'style.width': {
          label: '表单宽度',
          type: 'input',
          value: '',
        },
        'inline': {
          label: '行内模式',
          type: 'switch',
          value: true,
        },
        'label-width': {
          label: '标签宽度',
          type: 'input',
          value: 'auto',
        },
        'label-position': {
          label: '标签位置',
          type: 'labelPosition',
          value: 'left',
        },
        'size': {
          label: '组件大小',
          type: 'formSize',
          value: 'default',
        },
        'validate': {
          label: '开启验证',
          type: 'switch',
          value: false,
        },
      },
      parent: 'card_3',
    }],
    form: {
      title: {
        label: '标题',
        type: 'input',
        value: '查询条件',
      },
      collapse: {
        label: '折叠',
        type: 'switch',
        value: true,
      },
      background: {
        label: '背景色',
        type: 'alphaColor',
        value: '',
      },
    },
  }, {
    title: '卡片',
    type: 'card',
    key: 'card_8',
    component: 'cg-card',
    noForm: true,
    children: [{
      title: '表格',
      type: 'table',
      key: 'table_9',
      component: 'cg-table',
      noForm: true,
      children: [],
      form: {
        columns: {
          label: '列表',
          type: 'selectOptions',
          value: [{
            label: '名称',
            value: 'name',
          }, {
            label: '年龄',
            value: 'age',
          }, {
            label: '地址',
            value: 'address',
          }],
        },
        data: {
          label: '数据',
          type: 'codeEmit',
          value: [{
            name: '张三',
            age: 18,
            address: '北京市朝阳区',
          }, {
            name: '李四',
            age: 19,
            address: '北京市海淀区',
          }],
        },
      },
      parent: 'card_8',
    }],
    form: {
      title: {
        label: '标题',
        type: 'input',
        value: '数据列表',
      },
      collapse: {
        label: '折叠',
        type: 'switch',
        value: false,
      },
      background: {
        label: '背景色',
        type: 'alphaColor',
        value: '',
      },
    },
  }],
}

export default data
