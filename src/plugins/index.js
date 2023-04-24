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



// 定义懒加载图片或者文件等，自定义指令
Vue.directive('lazy', (el, binding) => {
  let oldSrc = el.src //保存旧的src，方便后期渲染时候赋值src真实路径
  el.src = "" //将渲染的src赋为空，则不会渲染图片出来
  let observer = new IntersectionObserver(([{ isIntersecting }]) => { // 调用方法得到该elDOM元素是否处于可视区域
    if (isIntersecting) { //回调是否处于可视区域，true or false
      el.src = oldSrc //如果处于可视区域额，将最开始保存的真实路径赋予DOM元素渲染
      observer.unobserve(el) // 只需要监听一次即可，第二次滑动到可视区域时候不在监听
    }
  })
  observer.observe(el) // 调用方法
})