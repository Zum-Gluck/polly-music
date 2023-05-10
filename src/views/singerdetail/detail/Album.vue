<template>
  <div class="album">
    <AlbumListCover
      v-for="item of albumList"
      :key="item.id"
      :AlbumSongListItem="item"
    ></AlbumListCover>
  </div>
</template>

<script>
import AlbumListCover from '@/components/albumlistcover/AlbumListCover.vue';

export default {
  // component-name小写命名
  name: "",
  // 组件
  props: {
    albumList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    AlbumListCover
  },
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
.album {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 -110px;
}
</style>
