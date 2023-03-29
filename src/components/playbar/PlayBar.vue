<template>
  <transition name="fade">

    <div
      class="play_bar shadow"
      v-show="isPlaying"
    >
      <div class="w">
        <!-- 左边 -->
        <div class="control_btn_layout">
          <div class="control_btn">
            <div
              class="previous"
              @click="prevClick"
            >
              <span class="iconfont icon-shangyishou"></span>
            </div>
            <div
              v-if="isPause"
              class="pause"
              @click="SET_IS_PAUSE(false)"
            >
              <span class="iconfont icon-24gf-play"></span>
            </div>
            <div
              v-else
              class="pause"
              @click="SET_IS_PAUSE(true)"
            >
              <span class="iconfont icon-24gf-pause2"></span>
            </div>

            <div
              class="next"
              @click="nextClick"
            >
              <span class="iconfont icon-xiayishou"></span>
            </div>
          </div>
        </div>
        <!-- 左边结束 -->

        <!-- 右边开始 -->
        <div class="right">
          <div class="volume">
            volume
          </div>
          <div class="other_control_btn">
            other_control_btn
          </div>
        </div>
        <!-- 右边结束 -->

        <!-- 中间开始 -->
        <div class="process_bar">
          <div class="cover">
            <img :src="currentSong ? currentSong.album.picUrl :'' ">
          </div>
          <div class="mid">
            <div class="top">
              <div class="title">
                <a
                  href="javascript:;"
                  class="song_title"
                >
                  <span>{{currentSong ? currentSong.name : ''}}</span>
                </a>
                <a
                  href="javascript:;"
                  class="author"
                >
                  <span>{{currentSong ? currentSong.singerList[0].name :''}}</span>
                </a>
              </div>
              <div class="minute">
                00/00
              </div>
            </div>
            <div class="bottom">
              <el-progress
                :percentage="currentProcess"
                color="#e64124"
                :format="format"
                :show-text="false"
              ></el-progress>
            </div>
          </div>
        </div>
        <!-- 中间结束 -->

      </div>
      <audio
        autoplay
        :src="songUrl"
        ref="audioEle"
      ></audio>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  // component-name小写命名
  name: "play-bar",
  // 组件
  components: {},
  // 变量
  data() {
    return {
      songUrl: '',
      currentProcess: 0
    };
  },
  // 方法
  methods: {
    ...mapMutations(['SET_CURRENT_SONG', 'SET_IS_PAUSE']),
    format(percentage) {
      return percentage === 100 ? '满' : `${percentage}%`;
    },
    nextClick() {
      if (this.currentSong.index === this.songPlayList.length) return this.$message({ type: 'info', message: "已经是最后一首了～" });
      this.SET_IS_PAUSE(false);
      const nextSong = this.songPlayList[this.currentSong.index]
      this.SET_CURRENT_SONG(nextSong);
    },
    prevClick() {
      if (this.currentSong.index === 1) return this.$message({ type: 'info', message: "已经是第一首了～" });
      this.SET_IS_PAUSE(false);
      const prevSong = this.songPlayList[this.currentSong.index - 2]
      this.SET_CURRENT_SONG(prevSong);
    },
    controlProcess() {
    }
  },
  // 计算属性
  computed: {
    ...mapGetters(['isPlaying', 'currentSong', 'songPlayList', 'isPause']),
  },
  // 监控data中的数据变化
  watch: {
    currentSong: async function (newVal) {
      let { copyright, id } = newVal
      if (copyright == 8) this.songUrl = newVal.url;

      // VIP 歌曲单独发送请求
      let res = await this.$api.getSongUrl(id)
      this.songUrl = res.data[0].url
    },
    isPause: function (newVal) {
      if (newVal === true) {
        this.$refs.audioEle.pause()
      } else {
        this.$refs.audioEle.play()
      }
    }
  },
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() { },
  // 生命周期 - 挂载完成(可以访问dom元素)
  mounted() {
    this.controlProcess();
  },
};
</script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.w {
  width: 1200px;
  margin: 0 auto;
}
.play_bar {
  position: fixed;
  width: 100%;
  bottom: 0;
  height: 70px;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 999;

  .control_btn_layout {
    float: left;
    width: 135px;
  }
  .control_btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    color: #fff;

    div {
      cursor: pointer;
    }

    .pause {
      width: 43px;
      height: 43px;
      text-align: center;
      line-height: 43px;
      background: linear-gradient(110deg, #fa2800, #fb8974);
      border-radius: 50%;
      .iconfont {
        font-size: 18px !important;
      }
    }

    .previous {
      color: #fa2800;
      .iconfont {
        font-size: 20px !important;
      }
    }
    .next {
      color: #fa2800;
      .iconfont {
        font-size: 20px !important;
      }
    }
  }

  .right {
    float: right;
    width: 200px;
    height: 70px;
  }

  .process_bar {
    height: 70px;
    margin-left: 135px;
    margin-right: 200px;
    padding: 10px 22px;
    .cover {
      float: left;
      width: 50px;
      height: 50px;
      img {
        width: 100%;
        border-radius: 4px;
      }
    }
    .mid {
      float: left;
      width: 660px;
      padding: 0 20px;
      .top {
        height: 30px;
        .title {
          float: left;

          .song_title {
            margin-right: 10px;
            font-weight: 500;
          }
        }
        .minute {
          float: right;
        }
      }
    }
  }
}
</style>
