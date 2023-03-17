<template>
  <div class="footer">
    <ul>
      <li>
        <router-link to="/home">
          <a href="javacsript:;">PollyMusic</a>
        </router-link>
      </li>
      <li>
        <a href="javascript:;">商务合作</a>
      </li>
      <li>
        <a href="javascript:;">关于我们</a>
      </li>
      <li>
        <a href="javascript:;">意见反馈</a>
      </li>
      <li>
        <!-- icon图标  -->
        <a href="javascript:;">
          <span class="iconfont icon-weixin"> </span>
        </a>
        <a href="javascript:;">
          <span class="iconfont icon-github-fill"> </span>
        </a>
        <a href="javascript:;">
          <span class="iconfont icon-gitee-fill-round"></span>
        </a>
      </li>
    </ul>
    <div class="copy flex-center">
      © Copyright PollyMusic. Designed by fj in 2023-3.
    </div>
  </div>
</template>

<script>
export default {
  // component-name小写命名
  name: "polly-footer",
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
  created() {},
  // 生命周期 - 挂载完成(可以访问dom元素)
  mounted() {},
};
</script>

<style lang="less" scoped>
.footer {
  position: relative;
  width: 100%;
  color: #fff;
  padding: 0 0 60px 0;
  background-color: #1a1b1a;
  ul {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 90%;
    height: 80px;
    margin: 0 auto;
    padding-top: 20px;
    font-size: 14px;
    font-weight: 500;
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);

    li {
      &:last-child {
        align-self: flex-end;
        display: flex;
        justify-content: space-between;
        width: 120px;
        font-size: 18px !important  ;
        span {
          font-size: 23px;
          color: #ccc;

          &:hover {
            color: #fff;
          }
        }
      }
      a {
        color: #fff;
      }
    }
  }

  .copy {
    position: absolute;
    top: 80px;
    width: 100%;
    height: 60px;
  }
}
</style>
