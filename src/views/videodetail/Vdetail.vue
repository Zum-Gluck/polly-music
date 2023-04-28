<template>
  <el-row :gutter="30">
    <el-col :span="17" :offset="0">
      <el-card style="position: relative">
        <video
          :src="Urls[0]?.url"
          style="width: 100%"
          autoplay
          controls
        ></video>
        <h1 style="margin: 10px 0">{{ videos.title }}</h1>
        <span
          v-for="item in videos.videoGroup"
          :key="item.id"
          style="
            margin-right: 10px;
            font-size: 14px;
            color: #f60;
            cursor: pointer;
          "
          >#{{ item.name }}</span
        >
        <div style="color: gray; margin-top: 10px">
          <span style="margin-right: 20px">
            发布:&nbsp;&nbsp;{{
              $utils.dateFormat(videos.publishTime, "YYYY-MM-DD")
            }} </span
          ><span>
            播放次数:&nbsp;&nbsp;{{
              $utils.tranNumber(
                videos.playTime ? videos.playTime : videos.playCount,
                0
              )
            }}
          </span>
        </div>
        <div class="video_three">
          <el-button
            style="
              background-color: rgb(241, 241, 241);
              height: 50px;
              border-radius: 20px;
              color: black;
              font-weight: 400;
            "
            icon="el-icon-thumb"
          >
            {{ $utils.tranNumber(videos.praisedCount, 0) }}
          </el-button>
          <el-button
            style="
              background-color: rgb(241, 241, 241);
              height: 50px;
              border-radius: 20px;
              color: black;
              font-weight: 400;
            "
            icon="el-icon-star-off"
          >
            {{ $utils.tranNumber(videos.subscribeCount, 0) }}
          </el-button>
          <el-button
            style="
              background-color: rgb(241, 241, 241);
              height: 50px;
              border-radius: 20px;
              color: black;
              font-weight: 400;
            "
            icon="el-icon-share"
          >
            {{ $utils.tranNumber(videos.shareCount, 0) }}
          </el-button>
        </div>
        <div>
          <i
            class="el-icon-chat-line-square"
            style="font-size: 20px; margin-top: 45px; color: gray"
            >&nbsp;&nbsp;Comments&nbsp;|&nbsp;<span style="color: black"
              >{{ $utils.tranNumber(videos.commentCount, 0) }}&nbsp;条评论</span
            ></i
          >
        </div>
      </el-card>
    </el-col>
    <el-col :span="7" :offset="0">
      <PollyCard title="视频简介" style="margin-bottom: 30px">
        <div style="margin-top: 15px; display: flex">
          <img
            :src="videos?.avatarUrl + '?param=50y50'"
            style="width: 40px; height: 40px; border-radius: 50%"
          />

          <span style="line-height: 40px; margin-left: 15px">
            {{ videos.creator?.nickname }}</span
          >
        </div>

        <div class="profile">
          <div id="content">
            {{ videos.description === null ? "暂无简介" : videos.description }}
          </div>
        </div>
      </PollyCard>
      <PollyCard title="相关推荐" style="margin-bottom: 30px">
        <div
          v-for="(item, index) in relatedvideo"
          :key="index"
          style="margin: 20px 0"
        >
          <VideoCover :data="item"></VideoCover>
          <div style="color: rgba(0, 0, 0, 0.5); margin-top: 5px">
            By.{{ item.creator[0].userName }}
          </div>
        </div>
      </PollyCard>
    </el-col>
  </el-row>
</template>



<script>
import PollyCard from "@/components/pollycard/PollyCard.vue";
import VideoCover from "@/components/videopage/VideoCover.vue";

export default {
  components: { PollyCard, VideoCover },
  inject: ["reload"],
  data() {
    //这里存放数据
    return {
      Urls: [], //视频地址相关信息
      videos: {}, //视频相关信息
      relatedvideo: [], //相关视频
    };
  },
  methods: {},
  async activated() {
    let res;
    if (this.$route.params.id.length > 20) {
      res = await this.$api.getVideoDetail(this.$route.params.id);
      this.videos = res.data;
      let res2 = await this.$api.getVideoPlay(this.$route.params.id);
      this.Urls = res2.urls;
      let res3 = await this.$api.getRelatedVideo(this.$route.params.id);
      console.log("file: Vdetail.vue:138 @ res3:", res3.data);
      this.relatedvideo = res3.data;
    } else {
      res = await this.$api.getMVDetail(this.$route.params.id);
      // let res3=this.$api.getVideoPlay(this.$route.params.id);
      // console.log("file: Vdetail.vue:56 @ res3:", res3)
      // this.Urls=res3;
      //  console.log("file: Vdetail.vue:57 @ this.Urls:", this.Urls)
    }
  },
};
</script>


<style lang="less" scoped>
.video_three {
  margin-top: 15px;
}
.profile {
  display: flex;
  #content {
    margin: 10px 0 0 0;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 5px;
    padding: 10px;
    color: gray;
  }
}
</style>