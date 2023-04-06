<template>
  <div class="home_song_list">
    <h2>推荐歌单</h2>
    <ul>
      <li
        v-for="item of recommendSongList"
        :key="item.id
      "
      >
        <ListCover
          size="120px"
          :songListItem="item"
        ></ListCover>
      </li>
    </ul>
  </div>
</template>

<script>
import ListCover from '@/components/listcover/ListCover.vue';
export default {
  // component-name小写命名
  name: "home-song-list",
  // 组件
  components: {
    ListCover
  },
  // 变量
  data() {
    return {
      recommendSongList: []
    };
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
  async mounted() {
    try {
      let res = await this.$api.getRecommendSongList(24)
      this.recommendSongList = res.result
    } catch (err) {
      console.log('获取推荐歌单时发生了错误');
      console.log(err);
    }
  },
};
</script>

<style lang="less" scoped>
.home_song_list {
  margin-top: 30px;

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;
  }
}
</style>
