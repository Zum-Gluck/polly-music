<template>
  <div class="polly_card">
    <el-card>
      <div class="liked_song_list">
        <div class="title">
          <a href="javascript:;"><span>{{title}}</span></a>
        </div>
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  // component-name小写命名
  name: "polly-card",
  props: {
    title: {
      type: String,
      default: "标题"
    }
  },
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
.polly_card {
  .liked_song_list {
    .title {
      display: flex;
      font-size: 13px;

      &::before {
        display: block;
        content: "";
        width: 3px;
        height: 20px;
        background-color: @color;
        margin-right: 10px;
      }
    }
  }
}
</style>
