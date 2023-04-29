<template>
  <transition name="fade">
    <div
      class="play_bar shadow"
      v-show="isBegin"
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
          <div class="flex">

            <!-- 音量部分开始 -->
            <div class="volume">
              <a
                href="#"
                @click.prevent="muteClick"
              >
                <span class="iconfont icon-yinliang"></span>
              </a>
              <PollyProgress
                @mouseClick="changeVolume"
                @mouseMove="changeVolume"
                ref='PollyProgress'
              ></PollyProgress>
            </div>
            <!-- 音量部分结束 -->

            <!-- 其他控件开始 -->
            <div class="other_control_btn">
              <ul>
                <li>
                  <!-- play Mode 开始 -->
                  <span
                    class="iconfont icon-shunxubofang"
                    v-if="true"
                  >
                  </span>
                  <span
                    class="iconfont icon-24gl-shuffle"
                    v-else-if="false"
                  >
                  </span>
                  <span
                    class="iconfont icon-hanhan-01-01"
                    v-else
                  >
                  </span>
                  <!-- play Mode 结束 -->
                </li>

                <!--歌词开始  -->
                <li>
                  <span class="iconfont icon-geciweidianji"></span>
                </li>
                <!--歌词结束  -->

                <!-- 播放列表开始 -->
                <li>
                  <!-- CSS:466 -->
                  <transition name="fade">
                    <PlayHistory
                      v-show="isShowHistory"
                      :hisList="hisList"
                      @closeClick="isShowHistory = false"
                      @click.native.stop="isShowHistory = true"
                      @clearHisList='hisList = []'
                    ></PlayHistory>
                  </transition>

                  <span
                    class="iconfont icon-yinleliebiao-"
                    :class="{'active':isShowHistory}"
                    @click.stop="isShowHistory = !isShowHistory"
                  ></span>
                </li>
                <!-- 播放列表结束 -->

              </ul>
            </div>
            <!-- 其他控件结束 -->
          </div>
        </div>
        <!-- 右边结束 -->

        <!-- 中间开始 -->
        <div class="process_bar">
          <div class="cover">
            <img :src="currentSong ? currentSong.album :'' ">
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
                {{currentDuration}} / {{$utils.formatSecondTime(fullDuration)}}
              </div>
            </div>
            <div class="bottom_layout">
              <div
                class="mask"
                @click="maskClick"
                ref="mask"
              >
                <el-progress
                  :percentage="currentProcess ? currentProcess : 0"
                  color="#e64124"
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

      <!-- audio 开始 -->
      <audio
        autoplay
        :src="songUrl"
        ref="audioEle"
        @timeupdate="timeupdate"
        @ended="musicOver"
      ></audio>
      <!-- audio 结束 -->

    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import PollyProgress from './detail/PollyProgress.vue';
import PlayHistory from './detail/PlayHistory.vue';
import { addHistory, getHistory } from '@/common/cache';

export default {
  // component-name小写命名
  name: "play-bar",
  // 组件
  components: {
    PollyProgress,
    PlayHistory
  },
  // 变量
  data() {
    return {
      songUrl: '',
      // 播放进度相关属性
      currentProcess: 0,
      currentDuration: "00:00",
      fullDuration: 0,
      fullSeconds: 0,
      isToastShow: false,
      isChangeBtnPos: true,
      // 音量相关属性
      isMute: false,
      tempPercentage: 50,
      // 是否显示播放历史
      isShowHistory: false,
      // 历史播放
      hisList: []
    };
  },
  // 方法
  methods: {
    ...mapMutations(['SET_CURRENT_SONG', 'SET_IS_PAUSE']),
    // 音乐结束后的回调
    musicOver() {
      if (this.currentDuration === '00:30') {
        this.$message({ type: 'info', message: '试听结束，剩余需要开通网易黑胶会员' })
      } else {
        this.nextClick();
      }
    },
    // 下一首
    nextClick() {
      if (this.currentSong.index === this.songPlayList.length) return this.$message({ type: 'info', message: "已经是最后一首了～" });
      this.SET_IS_PAUSE(false);
      const nextSong = this.songPlayList[this.currentSong.index % 50]
      this.SET_CURRENT_SONG(nextSong);
    },
    // 上一首
    prevClick() {
      if (this.currentSong.index === 1) return this.$message({ type: 'info', message: "已经是第一首了～" });
      this.SET_IS_PAUSE(false);
      const prevSong = this.songPlayList[this.currentSong.index - 2 % 50]
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

    // 播放进度条拖动
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
        const fullSeconds = this.$utils.formatSecond(this.currentSong.duration)

        this.audioEle.currentTime = currentPos / maxPos * fullSeconds
        this.$refs.mask.onmousemove = null
        this.isChangeBtnPos = true
        document.onmouseup = null;
        document.onmousemove = null;
      }
    },

    // 播放进度条点击
    maskClick(e) {
      const maxPos = 620
      const clickPos = e.offsetX
      const fullSeconds = this.$utils.formatSecond(this.currentSong.duration)
      this.audioEle.currentTime = clickPos / maxPos * fullSeconds
    },

    /**
     * @method 音量按钮控制方法
     */
    changeVolume(percentage) {
      this.audioEle.volume = percentage / 100;
    },
    muteClick() {
      if (!this.isMute) {
        this.audioEle.volume = 0
        this.isMute = true;
        this.tempPercentage = this.PollyProgress._data.percentage
        this.PollyProgress.setPercentage(0);
      } else {
        this.audioEle.volume = this.tempPercentage / 100;
        this.isMute = false;
        this.PollyProgress.setPercentage(this.tempPercentage);
      }
    },

    /**
     * @method 绑定快捷键
     */
    bindShortcuts() {
      document.addEventListener('keydown', (e) => {
        // 没有开始播放
        if (!this.isBegin) return;

        switch (e.code) {
          case 'Space': // 按下空格
            e.preventDefault();
            this.SET_IS_PAUSE(!this.isPause);
            break;

          case 'BracketRight':
            this.nextClick();
            break;

          case 'BracketLeft':
            this.prevClick();
            break;

          case 'ArrowUp':
            {
              e.preventDefault();
              const currentPercentage = this.PollyProgress._data.percentage
              if (currentPercentage >= 100) return
              this.audioEle.volume += 0.1
              this.PollyProgress.setPercentage(currentPercentage + 10);
            }
            break;

          case 'ArrowDown':
            {
              e.preventDefault();
              const currentPercentage = this.PollyProgress._data.percentage
              if (currentPercentage <= 0) return
              this.audioEle.volume -= 0.1
              this.PollyProgress.setPercentage(currentPercentage - 10);
            }
            break;

          case 'ArrowRight':
            {
              this.audioEle.currentTime += 3
            }
            break;

          case 'ArrowLeft':
            {
              this.audioEle.currentTime -= 3
            }
            break;

          case 'KeyM':
            this.muteClick()
            break;

          case 'KeyL':
            this.isShowHistory = !this.isShowHistory;
            break;
        }
      })
    }
  },
  // 计算属性
  computed: {
    ...mapGetters(['isBegin', 'currentSong', 'songPlayList', 'isPause', 'profile']),
    PollyProgress() {
      return this.$refs.PollyProgress;
    },
    audioEle() {
      return this.$refs.audioEle;
    }
  },
  // 监控data中的数据变化
  watch: {
    currentSong: async function (newVal) {
      let { copyright, id } = newVal
      if (copyright == 8) this.songUrl = newVal.url;

      let vipType = 0
      if (this.profile) {
        vipType = this.profile.vipType;
      }
      try {
        let res = await this.$api.getSongUrl(id)
        this.songUrl = res.data[0].url


        // 无法播放的VIP歌曲
        if (this.songUrl === null) {
          this.audioEle.currentTime = 0;
          this.SET_IS_PAUSE(true);
          return this.$message({ message: '该歌曲需要购买', type: 'info' })
        }

        if (copyright == 1 && vipType === 0) {
          this.$message({ message: '正在试听vip歌曲(30s)', type: 'success' })
        }


        addHistory(this.currentSong)
        this.hisList = getHistory()

        this.fullSeconds = this.$utils.formatSecond(newVal.duration);
        this.fullDuration = this.$utils.formatSecond(newVal.duration)

      } catch (err) {
        console.log('请求vip 音乐时候出现error');
        console.log(err);
      }


    },
    isPause: function (newVal) {
      if (newVal === true) {
        this.audioEle.pause()
      } else {
        this.audioEle.play()
      }
    },
  },
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() { },
  // 生命周期 - 挂载完成(可以访问dom元素)
  mounted() {
    // 打开页面时默认音量大小 ，若要修改记得改progress的默认进度
    this.audioEle.volume = 0.7

    // 绑定快捷键
    this.bindShortcuts();

    document.addEventListener('click', (e) => {
      this.isShowHistory = false
    })
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
.active {
  color: @color;
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
    width: 310px;
    height: 70px;

    .flex {
      display: flex;
      align-items: center;
      height: 70px;

      .volume {
        display: flex;
        align-items: center;

        a {
          color: @color;
          .iconfont {
            font-size: 19px;
          }
        }
      }
    }

    .other_control_btn {
      ul {
        width: 120px;
        display: flex;
        justify-content: space-between;
        margin-left: 10px;
        li {
          // HTML : 96
          position: relative;
          span {
            cursor: pointer;
            font-size: 18px !important;
          }
        }
      }
    }
  }

  .process_bar {
    height: 70px;
    margin-left: 135px;
    margin-right: 310px;
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