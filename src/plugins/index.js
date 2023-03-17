import Vue from 'vue';
import api from '@/api/index.js'

// 全局样式文件
import '@/assets/style/reset.css'
import '@/assets/style/common.css'

// 字体图标
import '@/assets/iconfont/iconfont.css'

// element ui 相关
import { Button, Select, Row, Col, message, Card, Table, TableColumn, Dropdown, DropdownMenu, DropdownItem } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


// 全局导入api模块
Vue.prototype.$api = api
Vue.prototype.$message = message
Vue.prototype.$bus = new Vue();


Vue.use(Button)
Vue.use(Select)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)