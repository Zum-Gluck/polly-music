<template>
  <div
    class="polly_progess"
    @click="progessBarClick"
  >
    <div
      class="finished"
      :style="currentWidth"
    ></div>
    <div
      class="control_button"
      :style="currentLeft"
      @mousedown.stop="btnMouseDown"
      @click.stop=""
    ></div>
  </div>
</template>

<script>
export default {
  // component-name小写命名
  name: "polly-progess",
  // 组件
  components: {},
  // 变量
  data() {
    return {
      percentage: 70
    };
  },
  // 方法
  methods: {
    progessBarClick(e) {
      this.percentage = e.layerX;

      this.$emit('mouseClick', this.percentage);
    },
    btnMouseDown(e) {
      const left = e.target.parentNode.getBoundingClientRect().left

      this.mouseMove(left)
    },
    mouseMove(left) {
      document.onmousemove = (e) => {
        let current = e.pageX - left;
        current = current < 7 ? 7 : current;
        current = current > 107 ? 107 : current;
        this.percentage = current - 7;

        this.mouseUp();
      }
    },
    mouseUp() {
      document.onmouseup = () => {
        document.onmousemove = null;
        this.$emit('mouseUp', this.percentage);
      }

    },

    setPercentage(p) {
      this.percentage = p;
    }
  },
  // 计算属性
  computed: {
    currentWidth() {
      return `width:${this.percentage}%`
    },
    currentLeft() {
      return `left:${this.percentage}%`;
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() { },
  // 生命周期 - 挂载完成(可以访问dom元素)
  mounted() { },
};
</script>

<style lang="less" scoped>
.polly_progess {
  position: relative;
  width: 100px;
  background-color: #e8eaf0;
  margin: 0 15px;
  cursor: pointer;

  .finished {
    width: 70%;
    height: 3px;
    background-color: @color;
  }

  .control_button {
    position: absolute;
    top: -5px;
    width: 13px;
    height: 13px;
    background-color: #fff;
    border: 2px solid @color;
    border-radius: 50%;
    z-index: 999;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: 0 0 0 5px rgba(250, 40, 0, 0.2);
    }
  }
}
</style>
