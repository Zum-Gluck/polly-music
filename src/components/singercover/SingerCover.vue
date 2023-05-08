<template>
  <div class="singer_coer">
    <div class="top">
      <img
        class="pic"
        v-lazy="singer ? singer.img1v1Url+'?param=200y200' : ''"
        @click="goSingerDetail(singer.id)"
      />
      <a
        href="javascript:;"
        @click="goSingerDetail(singer.id)"
      >
        <span class="name">{{ singer ? singer.name : "" }}</span>
      </a>
    </div>
    <span class="count">单曲数{{ singer ? singer.musicSize : "" }}</span>
  </div>
</template>

<script>
export default {
  // component-name小写命名
  name: "singer-cover",
  // 父传子
  props: {
    singer: {
      type: Object,
      default: () => { }
    }
  },
  // 组件
  components: {},
  // 变量
  data() {
    return {};
  },
  // 方法
  methods: {

    /**
     * @method 在这里跳转到歌手详情页
     */
    goSingerDetail(id) {
      this.$router.push(`/singer-detail/${id}`);
    }

  },
  // 计算属性
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() { },
  // 生命周期 - 挂载完成(可以访问dom元素)
  mounted() {
  },
};
</script>

<style lang="less" scoped>
.singer_coer {
  width: 100px;
  height: 160px;
  text-align: center;
  margin: 0 auto;

  .pic {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    margin: 0 auto;
    cursor: pointer;
  }

  .name {
    width: 100%;
    display: inline-block;
    margin-top: 10px;
    font-size: 15px;
    font-weight: 600;
    transition: all 0.3s;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .count {
    display: inline-block;
    font-size: 11px;
    color: @color;
    margin-top: 10px;
  }

  .top {
    line-height: 20px;
  }

  .top:hover .name {
    color: red;
  }
}
</style>
