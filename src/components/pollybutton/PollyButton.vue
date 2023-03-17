<template>
  <div class="polly-button" :style="styleObj">
    <span class="content">
      {{ content || "播放全部" }}
    </span>
  </div>
</template>

<script>
export default {
  // component-name小写命名
  name: "polly-button",
  // 父传子
  props: ["content", "width", "height"],
  // 组件
  components: {},
  // 变量
  data() {
    return {
      propList: [],
    };
  },
  // 方法
  methods: {
    filterProps(props) {
      // 兼容 40px 和 40 的写法
      for (let key in props) {
        if (!props[key] || key == "content") continue;
        if (props[key].indexOf("px") === -1) {
          this.propList.push({
            key,
            value: props[key],
          });
        } else {
          let end = props[key].indexOf("px");
          this.propList.push({
            key,
            value: props[key].slice(0, end),
          });
        }
      }
    },
  },
  // 计算属性
  computed: {
    // 兼容 40px 和 40 的写法
    styleObj() {
      let obj = {
        //默认宽高
        width: "120px",
        height: "40px",
      };

      this.propList.forEach((item) => {
        obj[item.key] = item.value + "px";
      });

      return obj;
    },
  },
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() {
    this.filterProps(this.$props);
  },
  // 生命周期 - 挂载完成(可以访问dom元素)
  mounted() {},
};
</script>

<style lang="less" scoped>
.polly-button {
  color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  border-radius: 5px;
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  cursor: pointer;
}
</style>
