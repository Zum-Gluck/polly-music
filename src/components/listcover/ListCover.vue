<template>
  <div class="song_list_cover">
    <div
      class="images shadow"
      @click="coverClick"
      :style="{
        width:size,
        height:size
      }"
    >
      <div class="amount_play">
        <span> {{$utils.tranNumber(songListItem.playCount)}}</span>
      </div>
      <img
        :src="songListItem.coverImgUrl || songListItem.picUrl "
        width="105px"
      >
    </div>
    <div
      class="song_list_name"
      :style="{
        width:size
      }"
    >
      <a
        href="javascript:;"
        class="ellipsis-two"
        :title="songListItem.name"
      >{{songListItem.name}}</a>
    </div>
  </div>
</template>

<script>
export default {
  // component-name小写命名
  name: "list-cover",
  props: {
    songListItem: {
      type: Object,
      default: {}
    },

    // 设置宽高
    size: {
      type: String,
      default: '140px'
    }
  },
  // 组件
  components: {},
  // 变量
  data() {
    return {
    };
  },
  // 方法
  methods: {
    coverClick() {
      console.log(this.songListItem.name);
    }
  },
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
.song_list_cover {
  margin-bottom: 20px;
  width: 140px;
}

.images {
  position: relative;
  width: 140px;
  height: 140px;
  cursor: pointer;

  .amount_play {
    position: absolute;
    top: 3px;
    right: 5px;
    height: 16px;
    border-radius: 4px;
    padding: 0 6px;
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    background-color: rgba(0, 0, 0, 0.7);

    &::before {
      content: "";
      display: inline-block;
      width: 0px;
      height: 0px;
      border: 5px solid transparent;
      border-left-color: #fff;
      margin-top: -3px;
      margin-right: -3px;
      vertical-align: middle;
    }
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 3%;
  }
}

.song_list_name {
  width: 140px;
  margin-top: 10px;
}
</style>