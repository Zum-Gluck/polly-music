<template>
  <div class="home_singer">
    <h2>推荐热门歌手</h2>
    <ul>
      <li
        v-for="item of singerList"
        :key="item.id"
      >
        <SingerCover :singer="item"></SingerCover>
      </li>
    </ul>
  </div>
</template>

<script>
import SingerCover from '@/components/singercover/SingerCover.vue';

export default {
  // component-name小写命名
  name: "",
  // 组件
  components: {
    SingerCover
  },
  // 变量
  data() {
    return {
      singerList: []
    };
  },
  // 方法
  methods: {
    // 获取热门歌手
    async getSingerList() {
      let res = await this.$api.HotSinger();
      this.singerList = res.artists
      // this.singerList.length = 10
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
    this.getSingerList();
  },
};
</script>

<style lang="less" scoped>
.home_singer {
  margin: 0 -15px;

  h2 {
    margin: 10px;
  }

  ul {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    li {
      margin-top: 10px;
      padding: 0 10px;
    }
  }
}
</style>
