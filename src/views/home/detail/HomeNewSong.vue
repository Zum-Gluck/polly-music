<template>
  <div class="home_new_song">
    <h2>推荐新歌曲</h2>
    <ul>
      <li
        v-for="(item,index) of recommendNewSongList"
        :key="item.id"
        @mouseenter="songMouseEnter"
        @mouseleave="songMouseLeave"
        @dblclick="playClick(item)"
      >
        <img
          v-lazy="item.album + '?param=100y100'"
          alt=""
          class="shadow"
        >
        <div class="middle">
          <div> {{item.name}}</div>
          <div>{{
            $utils.tranNameListToString(item.singerList)
            }}</div>
        </div>
        <div class="duration">{{$utils.formatTime(item.duration)}}</div>
        <!-- 遮罩层 -->
        <div class="mask_play">
          <!-- 播放 -->
          <a
            href="javascript:;"
            v-if="(!isBegin || isPause) || 
            !(index+1 === (currentSong ? currentSong.index : -1))"
            @click="playClick(item)"
          >

            <span class="iconfont icon-24gf-play ">
            </span>
          </a>
          <!-- end -->

          <!-- 暂停 -->
          <a
            href="javascript:;"
            @click="songPause"
            v-else
          > <span class="iconfont icon-24gf-pause2"></span>
          </a>
          <!-- end -->

          <div class="mask_bgc"> </div>
        </div>
        <!-- end -->

      </li>
    </ul>
  </div>
</template>

<script>
import { createSong } from '@/model/song';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  // component-name小写命名
  name: "",
  // 组件
  components: {},
  // 变量
  data() {
    return {
      recommendNewSongList: [],
    };
  },
  // 方法
  methods: {
    ...mapMutations(['SET_SONG_PLAY_LIST', 'SET_CURRENT_SONG']),
    ...mapActions(['selectPlay', 'songPause']),
    songMouseEnter(e) {
      e.target.lastChild.style = 'display:block;';
    },
    songMouseLeave(e) {
      e.target.lastChild.style = 'display:none;';
    },
    // 播放按钮的点击
    playClick(song) {
      this.selectPlay({
        song,
        songList: this.recommendNewSongList,
        page: this.$route.path
      });
    },
    normalize(lists) {
      let res = []
      lists.map((item, index) => {
        item.index = index + 1;
        res.push(createSong(item));
      })
      return res;
    },

  },
  // 计算属性
  computed: {
    ...mapGetters(['isBegin', 'isPause', 'originPage', 'currentSong'])
  },
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() { },
  // 生命周期 - 挂载完成(可以访问dom元素)
  async mounted() {
    try {
      let res = await this.$api.getRecommendNewSong(10);
      this.recommendNewSongList = this.normalize(res.result);
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
      position: relative;
      width: 48%;
      height: 70px;
      margin: 15px 0;
      transition: all 0.3s;

      &:hover {
        color: @color;
      }

      img {
        float: left;
        width: 70px;
        height: 70px;
        border-radius: 5px;
        user-select: none;
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

      .mask_play {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 70px;
        height: 70px;
        line-height: 70px;
        text-align: center;
        color: @color;
        z-index: 998;

        a {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: @color;
          opacity: 1;
          z-index: 999;
        }

        .mask_bgc {
          position: absolute;
          top: 0;
          left: 0;
          width: 70px;
          height: 70px;
          background-color: #000;
          opacity: 0.3;
        }
      }
    }
  }
}
.change_cursor {
  cursor: pointer;
}
</style>
