<template>
  <div class="home_new_song">
    <h2>推荐新歌曲</h2>
    <ul>
      <li
        v-for="item of recommendNewSongList"
        :key="item.id"
      >
        <img
          :src="item.picUrl"
          alt=""
          class="shadow"
        >
        <div class="middle">
          <div> {{item.name}}</div>
          <div>{{
            $utils.tranNameListToString(item.song.artists)
            }}</div>
        </div>
        <div class="duration">{{$utils.formatTime(item.song.duration)}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  // component-name小写命名
  name: "",
  // 组件
  components: {},
  // 变量
  data() {
    return {
      recommendNewSongList: []
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
      let res = await this.$api.getRecommendNewSong(10);
      this.recommendNewSongList = res.result

      console.log(this.recommendNewSongList);
    } catch (err) {
      console.log("获取推荐新歌曲时发生了错误");
      console.log(err);
    }
  },
};
</script>

<style lang="less" scoped>
.home_new_song {
  margin-top: 10px;
  h2 {
    margin-bottom: 10px;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 48%;
      height: 70px;
      margin: 15px 0;
      transition: all .3s;
      
      &:hover {
        color: @color;
      }

      img {
        float: left;
        width: 70px;
        height: 70px;
        border-radius: 5px;
      }

      .middle {
        float: left;
        margin-left: 10px;
        line-height: 35px;

        & div:nth-child(1) {
          font-weight: 500;
        }

        & div:nth-child(2) {
          color: #999;
          font-size: 12px;
        }
      }

      .duration {
        float: right;
        line-height: 70px;
      }
    }
  }
}
</style>
