import Vue from 'vue'
import App from './App.vue'

import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/css.css'

import $$ from '@/libs/index'
Vue.prototype.$$ = $$

import { 
  Button,
  Select,
  Option,
  Row,
  Col,
  Tabs,
  TabPane,
  Form,
  FormItem,
  Loading,
  MessageBox,
  Message,
  Dialog,
  Radio,
  RadioGroup,
  RadioButton,
  Table,
  TableColumn,
  Switch,
  Input,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
} from 'element-ui'
Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(Row)
Vue.use(Col)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Loading)
Vue.use(Dialog)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Input)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Popover)
Vue.use(Tooltip)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$message = Message

Vue.config.productionTip = false

Vue.prototype.copyTxt = function(cont) {
  let id = 'copyInputSelectContent'
  let _input = document.createElement('input')
  _input.type = 'text'
  _input.value = cont
  _input.id = id
  document.body.append(_input)
  document.getElementById(id).select()
  document.execCommand("Copy")
  if (cont.length > 60) {
    this.msgSuccess('Copy ' + $$.cutOut(cont, 12, 8) + ' succeeded!')
  } else {
    this.msgSuccess('Copy ' + cont + ' succeeded!')
  }
  document.getElementById(id).remove()
  _input = null
  id = null
}

Vue.prototype.msgError = function(txt) {
  if (txt && txt.error) {
    txt = txt.error
  }
  this.$message({
    showClose: true,
    message: txt,
    type: 'error',
    customClass:'mzindex'
  })
}

Vue.prototype.msgSuccess = function(txt) {
  this.$message({
    showClose: true,
    message: txt,
    type: 'success',
    customClass:'mzindex'
  })
}

Vue.prototype.msgWarning = function(txt) {
  this.$message({
    showClose: true,
    message: txt,
    type: 'warning',
    customClass:'mzindex'
  })
}

new Vue({
  render: h => h(App),
}).$mount('#app')
