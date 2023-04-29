import Vue from "vue";
import api from "@/api/index.js";
import utils from "@/utils";

// 全局样式文件
import "@/assets/style/reset.css";
import "@/assets/style/common.css";
import "@/assets/style/custom.css";

// 字体图标
import "@/assets/iconfont/iconfont.css";

// 全局原型挂载
Vue.prototype.$api = api;
Vue.prototype.$bus = new Vue();
Vue.prototype.$utils = utils;

// 图片懒加载插件
import VueLazyload from "vue-lazyload";
import infiniteScroll from "vue-infinite-scroll";
Vue.use(VueLazyload);
Vue.use(infiniteScroll);

// element ui 相关
import "element-ui/lib/theme-chalk/index.css";
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
  Loading,
  Progress,
  Tooltip,
  Notification,
  Empty,
  Pagination,
  Divider,
  Tag,
  Backtop,
  Icon,
  Input,
} from "element-ui";

Vue.prototype.$message = message;
Vue.prototype.$notify = Notification;
Vue.use(Button);
Vue.use(Select);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Loading);
Vue.use(Progress);
Vue.use(Tooltip);
Vue.use(Empty);
Vue.use(Pagination);
Vue.use(Tag);
Vue.use(Divider);
Vue.use(Backtop);
Vue.use(Icon);
Vue.use(Input);
