<template>
  <div class="song_list clearfix">
    <PollyButton
      class="fr btn"
      @click.native="playAllClick"
    ></PollyButton>

    <!--表格开始 -->
    <ElTable
      :data="songList"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      :header-cell-style="{
        background: '#fafafa',
        border: 0,
        color: '#999',
      }"
      :cell-style="{ border: 0 }"
      class="customer-table shadow"
      tooltip-effect="light"
      v-loading="loading"
      @cell-mouse-enter="rowEnter"
      @cell-mouse-leave="rowLeave"
      @cell-dblclick="rowDbclick"
    >
      <!-- 列配置 -->
      <ElTableColumn
        prop="num"
        label="序号"
        width="80"
      >
        <template slot-scope="scope">
          <!-- 数字&播放按钮 start-->
          <div
            @click="songPlayClick(scope.row)"
            style="text-align: center; cursor: pointer"
          >
            <span>
              <span v-show="scope.row.isShow">
                {{ scope.row.index }}
              </span>
            </span>
          </div>
          <!-- 数字&播放按钮 end-->

          <!-- Playing start -->
          <div
            class="playing"
            :class="{
              index_active:
                (currentSong ? currentSong.name : -1) == scope.row.name,
            }"
            v-show="isShowPlaying && !isPause"
          >
            <div class="box">
              <div style="animation-delay: -1.2s"></div>
              <div></div>
              <div style="animation-delay: -1.5s"></div>
              <div style="animation-delay: -1.2s"></div>
              <div style="animation-delay: -0.9s"></div>
              <div style="animation-delay: -0.6s"></div>
            </div>
          </div>
          <!-- Playing end -->

          <!-- Pause start -->
          <div
            v-if="!isPause"
            @click="SET_IS_PAUSE(true)"
            class="pause"
            :class="{
              index_active:
                (currentSong ? currentSong.name : -1) == scope.row.name,
            }"
          >
            <span class="iconfont icon-24gf-pause2"></span>
          </div>
          <!-- Pause end -->

          <!-- 播放 start -->
          <div
            v-else
            @click="SET_IS_PAUSE(false)"
            class="pause"
            :class="{
              index_active:
                (currentSong ? currentSong.name : -1) == scope.row.name,
            }"
          >
            <span class="iconfont icon-play"> </span>
          </div>
          <!-- 播放 end -->
        </template>
      </ElTableColumn>
      <ElTableColumn
        prop="name"
        label="歌曲"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span style="cursor: pointer">{{ scope.row.name }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn
        show-overflow-tooltip
        prop="name"
        label="歌手"
        width="180"
      >
        <template slot-scope="scope">
          <!-- {{ scope.row.ar[0] }} -->
          <span
            style="cursor: pointer"
            v-for="(item, index) in scope.row.singerList"
            :key="index"
          >{{ item.name
            }}<span v-if="index != scope.row.singerList.length - 1">&nbsp;/&nbsp;</span>
          </span>
        </template>
      </ElTableColumn>
      <ElTableColumn
        show-overflow-tooltip
        prop="name"
        label="专辑"
        width="150"
      >
        <template slot-scope="scope">
          <span style="cursor: pointer">{{ scope.row.name }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn
        prop="duration"
        label="时长"
        width="70"
      >
        <template slot-scope="scope">
          <span style="cursor: pointer">{{
            $utils.formatTime(scope.row.duration)
          }}</span>
        </template>
      </ElTableColumn>
    </ElTable>
    <!--表格结束 -->
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import PollyButton from "../pollybutton/PollyButton.vue";
export default {
  // component-name小写命名
  name: "song-list",
  // 组件
  components: {
    PollyButton,
  },
  props: {
    // 歌曲详情数组
    songList: {
      type: Array,
      default: () => [],
    },
  },
  // 变量
  data() {
    return {
      loading: true,
      isShowPlaying: false,
      showText: true,
      currentHoverIndex:0
    };
  },
  // 方法
  methods: {
    ...mapMutations(["SET_IS_PAUSE"]),
    ...mapActions(["selectPlay", "allPlay"]),
    // 配置行类名
    tableRowClassName({ row, rowIndex }) {
      if (
        this.currentSong &&
        this.currentSong.name == row.name
      ) {
        return "active";
      }

      if (rowIndex % 2 != 0) {
        return "bgc";
      }
    },
    tableHeaderClassName({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "warning-row";
      }
      return "warning-row";
    },
    rowEnter(row, column, cell, event) {
      if (this.currentSong && this.currentSong.index === row.index) {
        this.isShowPlaying = false;
      }
      const cellEle =
        event.target.parentNode.firstChild.getElementsByClassName("cell")[0]
          .firstChild;
      row.isShow = false
      cellEle.classList.add("icon-play");
      cellEle.classList.add("iconfont");
    },
    rowLeave(row, column, cell, event) {
      if (this.currentSong && this.currentSong.index === row.index) {
        this.isShowPlaying = true;
      }
      const cellEle =
        event.target.parentNode.firstChild.getElementsByClassName("cell")[0]
          .firstChild;
      row.isShow = true
      cellEle.classList.remove("icon-play");
      cellEle.classList.remove("iconfont");
    },
    rowDbclick(row) {
      this.songPlayClick(row);
    },
    // 播放按钮的点击
    songPlayClick(row) {
      this.isShowPlaying = false;

      this.selectPlay({
        song: row,
        songList: this.songList,
        page: this.$route.path,
      });
    },
    // 播放全部按钮的点击
    playAllClick() {
      this.allPlay(this.songList);
    },
  },
  // 计算属性
  computed: {
    ...mapGetters(["currentSong", "isPause", "originPage"]),
  },
  // 监控data中的数据变化
  watch: {
    songList: function (newVal, oldVal) {
      this.loading = false;
    },
  },
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() { },
  // 生命周期 - 挂载完成(可以访问dom元素)
  mounted() {
    //用户无喜欢的歌曲，页面不会一直loading加载
    this.$on("noneLikedSong", function () {
      this.loading = false;
    });
  },
};
</script>

<style lang="less" scoped>
.icon-play {
  font-size: 20px !important;
}

.song_list {
  .playing {
    display: none;
    z-index: 998;
    background-color: #e8e9ec;
    .box {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      div {
        width: 2px;
        height: 100%;
        background-color: red;
        animation: play 0.9s linear infinite alternate;
      }
    }
  }
  .pause {
    display: none;
    color: @color;
    background-color: #e8e9ec;
  }
  .index_active {
    display: inline;
    position: absolute;
    top: 11px;
    left: 25px;
    width: 25px;
    height: 25px;
    overflow: hidden;
  }
}

.btn {
  margin-bottom: 20px;
  border-radius: 20px;
}
</style>
