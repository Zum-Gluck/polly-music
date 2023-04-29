<template>
  <div v-infinite-scroll="load" :infinite-scroll-delay="500">
    <el-row :gutter="30">
      <el-col :span="17" :offset="0">
        <el-card style="position: relative">
          <video
            :src="Urls.url || Urls[0]?.url"
            style="width: 100%; height: 500px"
            autoplay
            controls
          ></video>
          <h1 style="margin: 10px 0">{{ videos.title }}</h1>
          <span
            v-for="item in videos.videoGroup"
            :key="item?.id"
            style="
              margin-right: 10px;
              font-size: 14px;
              color: #f60;
              cursor: pointer;
            "
            @click="handleToTagVideo(item)"
            >#{{ item?.name }}</span
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
              @click="handlePraised"
            >
              {{ $utils.tranNumber(videos.praisedCount || like, 0) }}
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
              @click="handleSubscribed"
            >
              {{
                $utils.tranNumber(videos.subscribeCount || videos.subCount, 0)
              }}
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
                >{{
                  $utils.tranNumber(videos.commentCount, 0)
                }}&nbsp;条评论</span
              ></i
            >
            <el-card style="margin-top: 15px">
              <div
                style="
                  width: 100%;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <img
                  :src="$store.getters.profile.avatarUrl"
                  style="width: 55px; height: 55px; border-radius: 50%"
                />
                <el-input
                  v-model="input"
                  placeholder="发布一条评论吧"
                  style="width: 70%; margin-right: 15px"
                ></el-input>
                <el-button type="primary">发布</el-button>
              </div>
            </el-card>
            <el-card style="margin-top: 15px" v-loading="loading">
              <div v-for="(item, index) in comments" :key="index">
                <div style="margin-top: 15px; display: flex">
                  <img
                    :src="item?.user.avatarUrl"
                    style="
                      width: 55px;
                      height: 55px;
                      border-radius: 50%;
                      cursor: pointer;
                    "
                    @click="handleToPersonalPage(item.user)"
                  />

                  <span
                    style="
                      line-height: 40px;
                      margin-left: 15px;
                      cursor: pointer;
                    "
                    @click="handleToPersonalPage(item.user)"
                  >
                    {{ item?.user.nickname }}</span
                  >
                  <span
                    style="line-height: 40px; margin-left: 50px; color: gray"
                  >
                    {{ item?.timeStr }}-{{
                      item?.ipLocation.location
                        ? item?.ipLocation.location
                        : "未知"
                    }}</span
                  >
                </div>

                <div class="profile">
                  <div id="content" style="margin-left: 55px">
                    {{ item?.content }}
                  </div>
                  <span
                    style="
                      margin-left: 20px;
                      margin-top: 10px;
                      height: 40px;
                      line-height: 40px;
                      font-size: 20px;
                    "
                  >
                    <i
                      class="el-icon-thumb"
                      style="cursor: pointer"
                      @click="handlePraisedComent(item)"
                    ></i
                    >&nbsp;{{ item?.likedCount }}
                    <span
                      style="font-size: 15px; margin-left: 5px"
                      class="replaybtn"
                      >回复</span
                    >
                  </span>
                </div>
                <div class="comment_replay">
                  <div v-for="(data, index) in item?.beReplied" :key="index">
                    <div style="margin-top: 15px; display: flex">
                      <img
                        :src="data.user.avatarUrl"
                        style="
                          width: 40px;
                          height: 40px;
                          border-radius: 50%;
                          cursor: pointer;
                        "
                        @click="handleToPersonalPage(data.user)"
                      />

                      <span
                        style="
                          line-height: 40px;
                          margin-left: 15px;
                          cursor: pointer;
                        "
                        @click="handleToPersonalPage(data.user)"
                      >
                        {{ data.user.nickname }}</span
                      >
                    </div>

                    <div class="profile">
                      <div id="content" style="margin-left: 55px">
                        {{ data.content }}
                      </div>
                      <span
                        style="
                          margin-left: 20px;
                          margin-top: 10px;
                          height: 40px;
                          line-height: 40px;
                          font-size: 15px;
                        "
                        class="replaybtn"
                      >
                        回复
                      </span>
                    </div>
                  </div>
                </div>
                <el-divider></el-divider>
              </div>
              <span v-if="isnull">没有更多了。。。</span>
            </el-card>
          </div>
        </el-card>
      </el-col>
      <el-col :span="7" :offset="0">
        <PollyCard title="视频简介" style="margin-bottom: 30px">
          <div style="margin-top: 15px; display: flex">
            <img
              :src="
                videos.artists ? videos.artists[0].img1v1Url : videos.avatarUrl
              "
              style="
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
              "
              @click="handleToPersonalPage(videos)"
            />

            <span
              style="line-height: 40px; margin-left: 15px; cursor: pointer"
              @click="handleToPersonalPage(videos)"
            >
              {{ videos.creator?.nickname || videos.artistName }}</span
            >
          </div>

          <div class="profile">
            <div id="content">
              {{
                videos.description === null ||
                videos.desc === "" ||
                videos.description === "" ||
                videos.desc === null
                  ? "暂无简介"
                  : videos.description || videos.desc
              }}
            </div>
          </div>
        </PollyCard>
        <PollyCard title="相关推荐" style="margin-bottom: 30px">
          <div
            v-for="(item, index) in relatedvideo"
            :key="index"
            style="margin: 20px 0; cursor: pointer"
          >
            <div @click="handleToRelatedVideo(item)">
              <VideoCover :data="item"></VideoCover>
            </div>
            <div
              style="color: rgba(0, 0, 0, 0.5); margin-top: 5px"
              @click="handleToPersonalPage(item)"
            >
              By.{{ item?.artistName || item?.creator[0].userName }}
            </div>
          </div>
        </PollyCard>
      </el-col>
    </el-row>
  </div>
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
      like: 0, //点赞数量
      loading: null, //加载动画
      comments: [], //评论
      page: 1,
      isnull: null,
      ispraised: 0, //是否点赞视频
      issub: 0, //是否收藏
      ispraisedcomment: 0, //是否点赞评论
      input: "",
    };
  },
  methods: {
    async load() {
      let res4;
      if (this.isnull) return;
      if (this.$route.params.id?.length > 20) {
        res4 = await this.$api.getVideoComments(
          this.$route.params.id,
          10,
          10 * (this.page - 1)
        );
      } else {
        res4 = await this.$api.getMvComments(
          this.$route.params.id,
          10,
          10 * (this.page - 1)
        );
      }

      if (res4.comments?.length < 10) {
        this.isnull = true;
      }
      this.comments = this.comments.concat(res4.comments);
      this.page++;
    },
    handleToPersonalPage(item) {
      if (item.creator === undefined)
        this.$router.push(`/profile/${item.userId}`);
      else if (item.creator[0])
        this.$router.push(`/profile/${item.creator[0].userId}`);
      else if (item.creator)
        this.$router.push(`/profile/${item.creator.userId}`);
    },
    handleToRelatedVideo(item) {
      this.$router.push(`/vdetail/${item.vid ? item.vid : item.id}`);
    },
    handleToTagVideo(item) {
      this.$router.push(`/partvideopage/${item.id}`);
    },
    async handlePraised() {
      if (this.$store.getters.isLogin === null) {
        this.$message({
          message: "请先登录",
          type: "warning",
        });
      } else {
        if (this.$route.params.id.length > 20) {
          if (this.ispraised === 0) {
            let res = await this.$api.praisingVideo(this.$route.params.id, 1);
            if (res.code === 200) {
              this.$message({
                message: "点赞成功",
                type: "success",
              });
              this.ispraised = 1;
              this.videos.praisedCount++;
            }
          } else {
            let res = await this.$api.praisingVideo(
              this.$route.params.id,
              "其他"
            );
            if (res.code === 200) {
              this.$message({
                message: "已取消点赞",
                type: "success",
              });
              this.ispraised = 0;
              this.videos.praisedCount--;
            }
          }
        } else {
          if (this.ispraised === 0) {
            let res = await this.$api.praisingMV(this.$route.params.id, 1);
            if (res.code === 200) {
              this.$message({
                message: "点赞成功",
                type: "success",
              });
              this.ispraised = 1;
              this.like++;
            }
          } else {
            let res = await this.$api.praisingMV(this.$route.params.id, "其他");
            if (res.code === 200) {
              this.$message({
                message: "已取消点赞",
                type: "success",
              });
              this.ispraised = 0;
              this.like--;
            }
          }
        }
      }
    },
    async handleSubscribed() {
      if (this.$store.getters.isLogin === null) {
        this.$message({
          message: "请先登录",
          type: "warning",
        });
      } else {
        if (this.$route.params.id.length > 20) {
          if (this.issub === 0) {
            let res = await this.$api.subscribeVideo(this.$route.params.id, 1);
            if (res.code === 200) {
              this.$message({
                message: "收藏成功",
                type: "success",
              });
              this.issub = 1;
              this.videos.subscribeCount++;
            }
          } else {
            let res = await this.$api.subscribeVideo(
              this.$route.params.id,
              "其他"
            );
            if (res.code === 200) {
              this.$message({
                message: "已取消收藏",
                type: "success",
              });
              this.issub = 0;
              this.videos.subscribeCount--;
            }
          }
        } else {
          if (this.issub === 0) {
            let res = await this.$api.subscribeMV(this.$route.params.id, 1);
            if (res.code === 200) {
              this.$message({
                message: "收藏成功",
                type: "success",
              });
              this.issub = 1;
              this.videos.subCount++;
            }
          } else {
            let res = await this.$api.subscribeMV(
              this.$route.params.id,
              "其他"
            );
            if (res.code === 200) {
              this.$message({
                message: "已取消收藏",
                type: "success",
              });
              this.issub = 0;
              this.videos.subCount--;
            }
          }
        }
      }
    },
    async handlePraisedComent(item) {
      console.log("file: Vdetail.vue:444 @ item:", item);
      if (this.$store.getters.isLogin === null) {
        this.$message({
          message: "请先登录",
          type: "warning",
        });
      } else {
        if (this.$route.params.id.length > 20) {
          if (this.ispraisedcomment === 0) {
            let res = await this.$api.praisingVideoComments(
              this.$route.params.id,
              item.commentId,
              1
            );
            if (res.code === 200) {
              this.$message({
                message: "点赞成功",
                type: "success",
              });
              this.ispraisedcomment = 1;
              item.likedCount++;
            }
          } else {
            let res = await this.$api.praisingVideoComments(
              this.$route.params.id,
              item.commentId,
              0
            );
            if (res.code === 200) {
              this.$message({
                message: "已取消点赞",
                type: "success",
              });
              this.ispraisedcomment = 0;
              item.likedCount--;
            }
          }
        } else {
          if (this.ispraisedcomment === 0) {
            let res = await this.$api.praisingMVComments(
              this.$route.params.id,
              item.commentId,
              1
            );
            if (res.code === 200) {
              this.$message({
                message: "点赞成功",
                type: "success",
              });
              this.ispraisedcomment = 1;
              item.likedCount++;
            }
          } else {
            let res = await this.$api.praisingMVComments(
              this.$route.params.id,
              item.commentId,
              0
            );
            if (res.code === 200) {
              this.$message({
                message: "已取消点赞",
                type: "success",
              });
              this.ispraisedcomment = 0;
              item.likedCount--;
            }
          }
        }
      }
    },
  },

  async activated() {
    this.comments = [];
    this.loading = true;
    let res;
    if (this.$route.params.id.length > 20) {
      res = await this.$api.getVideoDetail(this.$route.params.id);
      this.videos = res.data;
      let res2 = await this.$api.getVideoPlay(this.$route.params.id);
      this.Urls = res2.urls;
      let res3 = await this.$api.getRelatedVideo(this.$route.params.id);
      this.relatedvideo = res3.data;
      let res4 = await this.$api.getVideoComments(this.$route.params.id, 10, 0);
      this.comments = res4.comments;
    } else {
      res = await this.$api.getMVDetail(this.$route.params.id);
      console.log("file: Vdetail.vue:151 @ res:", res.data);
      this.videos = res.data;
      let res2 = await this.$api.getMVPlay(this.$route.params.id);
      this.Urls = res2.data;
      let res3 = await this.$api.getMVinfo(this.$route.params.id);
      this.like = res3.likedCount;
      let res4 = await this.$api.getRelatedMV(this.$route.params.id);
      this.relatedvideo = res4.mvs;
      let res5 = await this.$api.getMvComments(this.$route.params.id, 10, 0);
      this.comments = res5.comments;
    }

    this.loading = false;
  },
  beforeRouteUpdate(to, from, next) {
    if (to.fullPath.includes("vdetail")) this.reload(); //解决点击相关歌单无法返回上一页的问题
    next();
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
.comment_replay {
  margin-left: 100px;
}
.replaybtn {
  cursor: pointer;
  &:hover {
    color: rgb(0, 193, 245);
  }
}
</style>