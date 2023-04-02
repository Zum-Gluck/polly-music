<template>
  <div id="app">
    <PollyHeader v-if="pathName != LOGIN"></PollyHeader>
    <RouterView></RouterView>
    <PollyFooter v-if="pathName != LOGIN"></PollyFooter>
    <PlayBar v-show="pathName != LOGIN"></PlayBar>
  </div>
</template>
<script>
import PollyHeader from "./components/header/Header.vue";
import PollyFooter from "./components/footer/Footer.vue";
import PlayBar from './components/playbar/PlayBar.vue';

export default {
  name: "app",
  // 组件
  components: {
    PollyHeader,
    PollyFooter,
    PlayBar
  },
  // 变量
  data() {
    return {
      // 解耦常量
      LOGIN: "login",
    };
  },
  // 方法
  methods: {},
  // 计算属性
  computed: {
    pathName() {
      return this.$route.name;
    },
  },
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() { },
  // 生命周期 - 挂载完成(可以访问dom元素)
  mounted() { },
};
</script>

<style lang="less">
</style>
