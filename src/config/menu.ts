import Input from './components/input'
import Select from './components/select'
import Textarea from './components/textarea'
import Switch from './components/switch'
import Color from './components/color'
import Radio from './components/radio'
import Checkbox from './components/checkbox'
import Text from './components/text'
import Divider from './components/divider'
import Button from './components/button'
import Grid from './components/grid'
import Time from './components/time'
import Date from './components/date'
import Card from './components/card'
import Table from './components/table'
import Form from './components/form'
import Base from './templates/baseForm'

export const Menu = [
  {
    title: '布局',
    children: [Form, Table, Grid, Card],
  },
  {
    title: '基础组件',
    children: [
      Input,
      Select,
      Textarea,
      Switch,
      Color,
      Radio,
      Checkbox,
      Text,
      Divider,
      Button,
      Time,
      Date,
    ],
  },
]

export const TemplateList = [
  Base,
]
