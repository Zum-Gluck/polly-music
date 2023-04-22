<template>
  <div class="play_history">
    <h1>history</h1>
  </div>
</template>

<script>
export default {
  // component-name小写命名
  name: "play-history",
  // 组件
  components: {},
  // 变量
  data() {
    return {};
  },
  // 方法
  methods: {},
  // 计算属性
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() { },
  // 生命周期 - 挂载完成(可以访问dom元素)
  mounted() { },
};
</script>

<style lang="less" scoped>
.play_history {
  position: absolute;
  top: -500px;
  left: -251px;
  width: 350px;
  height: 460px;
  background-color: pink;
}
</style>
