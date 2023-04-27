<template>
  <div>
    <div :style="{ width: width + 'px', textAlign: 'center' }">
      <div
        class="video_cover"
        :style="{ width: width + 'px', height: height + 'px' }"
      >
        <div class="amount_play" v-if="data.playTime || data.playCount">
          <span>
            {{
              $utils.tranNumber(
                data.playTime ? data.playTime : data.playCount,
                0
              )
            }}</span
          >
        </div>
        <div class="title_duration" v-if="data.durationms || data.duration">
          <span class="cover_title">
            {{
              data.title ? data.title : data.name + "-" + data.artists[0].name
            }}</span
          >
          <span>
            {{
              $utils.formatTime(
                data.durationms ? data.durationms : data.duration
              )
            }}</span
          >
        </div>

        <img
          v-lazy="
            data.coverUrl
              ? data.coverUrl
              : data.cover + `?param=${width}y${height}`
          "
        />
      </div>
      <a
        href="javascript:;"
        class="ellipsis-one"
        style="margin-top: 10px"
        v-if="data.description || data.title || data.name"
        >{{ data.description || data.title || data.name }}</a
      >
    </div>
  </div>
</template>



<script>
export default {
  name: "VideoCover",
  props: {
    width: {
      type: String,
      default: "0",
    },
    height: {
      type: String,
      default: "0",
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    //这里存放数据
    return {};
  },
  methods: {},
};
</script>



<style lang='less' scoped>
.video_cover {
  overflow: hidden;
  position: relative;
}
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

.title_duration {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 25%;
  padding: 0 20px;
  color: #fff;
  font-size: 15px;
  line-height: 16px;
  background-color: rgba(0, 0, 0, 0.7);
  line-height: 50px;
  display: flex;
  justify-content: space-between;
  .cover_title {
    width: 65%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    padding: 0;
  }
}
</style>