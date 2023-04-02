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
                {{currentDuration}} / {{fullDuration}}
              </div>
            </div>
            <div class="bottom_layout">
              <div
                class="mask"
                @click="maskClick"
                ref="mask"
              >
                <el-progress
                  :percentage="currentProcess"
                  color="#e64124"
                  :format="format"
                  :show-text="false"
                ></el-progress>
              </div>
              <!-- 拖拽条开始 -->
              <div
                class="move"
                ref="progress_button"
              >

                <div
                  class="progress_button"
                  @mouseenter="isToastShow = true"
                  @mouseleave="isToastShow = false"
                  @mousedown="progressBtnDown"
                >
                  <transition name="fade">
                    <div
                      class="toast"
                      v-show="isToastShow"
                    >{{ currentDuration}}</div>
                  </transition>
                </div>
              </div>
              <!-- 拖拽条结束 -->

            </div>
          </div>
        </div>
        <!-- 中间结束 -->

      </div>
      <audio
        autoplay
        :src="songUrl"
        ref="audioEle"
        @timeupdate="timeupdate"
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
      currentProcess: 0,
      currentDuration: "00:00",
      fullDuration: "00:00",
      fullSeconds: 0,
      isToastShow: false,
      isChangeBtnPos: true
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
    timeupdate(e) {
      let currentTime = Math.floor(e.target.currentTime)
      this.currentDuration = this.$utils.formatSecondTime(currentTime);
      if (this.isChangeBtnPos) {
        this.$refs.progress_button.style.left = `${this.currentProcess}%`;
        this.currentProcess = currentTime / this.fullSeconds * 100
      }
    },

    // 进度条拖动
    progressBtnDown() {
      this.isChangeBtnPos = false
      const leftDistance = this.$refs.mask.getBoundingClientRect().left

      document.onmousemove = (e) => {
        const maxPos = 620;
        let currentPos = e.pageX - leftDistance;

        currentPos = currentPos < 0 ? 0 : currentPos
        currentPos = currentPos > maxPos ? maxPos : currentPos


        this.currentProcess = currentPos / maxPos * 100
        this.$refs.progress_button.style.left = `${this.currentProcess}%`;


        this.cancelMouseMove(maxPos, currentPos)
      }
    },
    cancelMouseMove(maxPos, currentPos) {

      document.onmouseup = () => {
        const fullSeconds = this.$utils.strConvertSecond(this.fullDuration)
        this.$refs.audioEle.currentTime = currentPos / maxPos * fullSeconds
        this.$refs.mask.onmousemove = null
        this.isChangeBtnPos = true
        document.onmouseup = null;
        document.onmousemove = null;
      }
    },

    // 点击进度条
    maskClick(e) {
      const maxPos = 620
      const clickPos = e.offsetX
      const fullSeconds = this.$utils.strConvertSecond(this.fullDuration)
      this.$refs.audioEle.currentTime = clickPos / maxPos * fullSeconds
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

      this.fullSeconds = this.$utils.strConvertSecond(newVal.duration);
      this.fullDuration = newVal.duration

    },
    isPause: function (newVal) {
      if (newVal === true) {
        this.$refs.audioEle.pause()
      } else {
        this.$refs.audioEle.play()
      }
    },
  },
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() { },
  // 生命周期 - 挂载完成(可以访问dom元素)
  mounted() {

  },
};
</script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
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
      user-select: none;

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
          user-select: none;
          .song_title {
            margin-right: 10px;
            font-weight: 500;
          }
        }
        .minute {
          float: right;
          user-select: none;
        }
      }

      .bottom_layout {
        position: relative;

        .mask {
          height: 10px;
          line-height: 10px;
          padding-top: 3px;
          width: 100%;
          cursor: pointer;
        }
        .move {
          position: absolute;
          top: -6px;
          left: 0%;
        }
        .progress_button {
          margin-top: 3px;
          width: 13px;
          height: 13px;
          border: 2px solid @color;
          border-radius: 50%;
          background-color: #fff;
          transition: all 0.3s;
          &:hover {
            box-shadow: 0 0 0 5px rgba(250, 40, 0, 0.2);
          }
        }

        .toast {
          position: absolute;
          top: -36px;
          left: -18px;
          height: 30px;
          min-width: 50px;
          text-align: center;
          line-height: 30px;
          background-color: #303133;
          border-radius: 3px;
          color: #fff;

          &::after {
            content: "";
            display: block;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border: 3px solid transparent;
            border-top-color: #303133;
          }
        }
      }
    }
  }
}
</style>
