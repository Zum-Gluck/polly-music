import Vue from 'vue';
import api from '@/api/index.js'
import utils from '@/utils';

// 全局样式文件
import '@/assets/style/reset.css'
import '@/assets/style/common.css'


// 字体图标
import '@/assets/iconfont/iconfont.css'

// 全局原型挂载
Vue.prototype.$api = api
Vue.prototype.$bus = new Vue();
Vue.prototype.$utils = utils

// element ui 相关
import 'element-ui/lib/theme-chalk/index.css';

import {
    Button,
    Select,
    Row,
    Col,
    message,
    Card,
    Table,
    TableColumn,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Loading
} from 'element-ui';

Vue.prototype.$message = message
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
Vue.use(Loading)