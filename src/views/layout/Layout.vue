<template>
  <div class="layout">
    <div class="fluid">
      <keep-alive v-if="isRouterAlive" exclude="song-menu,video-detail">
        <router-view></router-view>
      </keep-alive>
      <el-backtop :visibility-height="500" :right="200"></el-backtop>
    </div>
  </div>
</template>

<script>
export default {
  // component-name小写命名
  name: "layout",
  provide() {
    return {
      reload: this.reload,
    };
  },
  // 组件
  components: {},
  // 变量
  data() {
    return {
      isRouterAlive: true,
    };
  },
  // 方法
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
  // 计算属性
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() {},
  // 生命周期 - 挂载完成(可以访问dom元素)
  mounted() {},
};
</script>

<style lang="less" scoped>
.layout {
  width: 100%;
  min-height: calc(100vh - 252px);
  z-index: 998;
  width: auto;
  min-width: 1024px;
  padding-top: 70px;
  .fluid {
    padding: 20px 0;
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>
