<template >
    <el-row :gutter="30">
      <el-col
        :span="17"
        :offset="0"
      >
        <el-card style="position: relative">
          <el-row :gutter="20">
            <el-col :span="9">
              <div class="grid_left">
                <ListCover
                  size="280px"
                  :songListItem="{ coverImgUrl: this.playlist.coverImgUrl }"
                />
              </div>
            </el-col>
            <el-col :span="15">
              <div class="grid_right">
                <h1 style="font-size: 25px">
                  {{ this.playlist.name }}
                </h1>
                <div class="avatar_name_creatime">
                  <img
                    :src="this.playlist.creator.avatarUrl"
                    style="width: 40px; height: 40px; border-radius: 50%"
                  /><span style="color: black; margin-left: 20px; margin-right: 40px">{{ this.playlist.creator.nickname }}</span>
                  <span style="color: rgba(0, 0, 0, 0.5)">{{ this.playlist.createTime }}创建</span>
                </div>
                <div class="right_pollybutton">
                  <span>标签:</span>
                  <PollyButton
                    v-for="(item, index) in this.playlist.tags"
                    :key="index"
                    :content="item"
                    height="30px"
                    width="55px"
                    style="border-radius: 30px; display: inline-block"
                  />
                </div>
                <div :class="
                    this.extend
                      ? 'right_description_extend'
                      : 'right_description_shorten'
                  ">
                  <span>
                    {{ this.playlist.description }}
                  </span>
                </div>
                <span
                  style="color: #f60; cursor: pointer"
                  @click="toggleExtend()"
                  v-if="!extend"
                >
                  全部 >
                </span>
                <span
                  style="color: #f60; cursor: pointer"
                  @click="toggleShorten()"
                  v-else
                >
                  收起
                </span>
                <div class="right_subscribe">
                  <el-button
                    round
                    style="width: 120px"
                  ><i class="el-icon-star-off"></i>收藏</el-button>
                </div>
              </div>
            </el-col>
          </el-row>

          <SongList
            :songList="this.songlist"
            style="margin-top: 20px"
          />
        </el-card>
      </el-col>
      <el-col
        :span="7"
        :offset="0"
      >
        <PollyCard
          title="喜欢这个歌单的人"
          style="margin-bottom: 30px"
        >
          <div style="
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              padding: 10px;
            ">
            <ListCover
              v-for="(item, value) in this.subscribe"
              :key="value"
              size="35px"
              :songListItem="{ coverImgUrl: item.avatarUrl }"
              style="flex: 14.28%; margin: 0"
              @click.native="handlePersonalInfo(item)"
            />
          </div>
        </PollyCard>
        <PollyCard
          title="相关推荐"
          style="margin-bottom: 30px"
        >
          <div
            v-for="(item, value) in this.relatedplaylist"
            :key="value"
            style="position: relative; margin-top: 10px; cursor: pointer"
            @click="handleRelatedSongMenu(item)"
          >
            <ListCover
              size="55px"
              :songListItem="{ coverImgUrl: item.coverImgUrl }"
              style="display: inline-block; margin: 2px"
            />
            <div
              style="position: absolute; top: 0; left: 65px"
              class="related_name"
            >
              {{ item.name }}
            </div>
            <div style="
                position: absolute;
                bottom: 10px;
                left: 65px;
                color: rgba(0, 0, 0, 0.5);
              ">
              By.{{ item.creator.nickname }}
            </div>
          </div>
        </PollyCard>
        <PollyCard title="精彩评论">
          <el-empty
            description="暂无评论"
            v-if="!this.comment.length"
          ></el-empty>

          <div
            v-for="(item, value) in this.comment"
            :key="value"
          >
            <div class="comment">
              <img
                :src="item.user.avatarUrl"
                style="width: 40px; height: 40px; border-radius: 50%"
              />
              <div class="comment_name">
                <div>
                  <strong> {{ item.user.nickname }}</strong>
                  <span style="color: rgba(0, 0, 0, 0.3)">
                    ·{{ item.timeStr }}
                  </span>
                </div>

                <div id="content">
                  {{ item.content }}
                </div>
              </div>
            </div>
          </div>
        </PollyCard>
      </el-col>
    </el-row>
</template>

<script>
import SongList from "@/components/songlist/SongList.vue";
import PollyButton from "@/components/pollybutton/PollyButton.vue";
import PollyCard from "@/components/pollycard/PollyCard.vue";
import ListCover from "@/components/listcover/ListCover.vue";
import { createSong } from "@/model/song";
export default {
  name: "song-menu",
  components: { PollyCard, ListCover, PollyButton, SongList },
  data() {
    return {
      playlist: {
        //歌单相关信息
        creator: {}, //歌单创建者
      },
      songlist: [], //歌单歌曲
      subscribe: [], //收藏者
      relatedplaylist: [], //相关推荐
      comment: [], //歌单评论
      extend: false, //控制歌单简介展开，
    };
  },
  methods: {
    normalize(list) {
      let index = 1;
      return list.map((element) =>
        Object.assign(createSong(element), { index: index++ })
      );
    },
    toggleShorten() {
      this.extend = !this.extend;
    },
    toggleExtend() {
      this.extend = !this.extend;
    },
    handlePersonalInfo(item) {
      console.log("file: SongMenu.vue:191 @ item:", item);
      console.log();
      if (this.$store.getters.isLogin === null)
        this.$message({
          message: "请先登录",
          type: "warning",
        });
      else this.$router.push(`/profile/${item.userId}`);
    },
    handleRelatedSongMenu(item) {
      this.$router.push(`/songmenu/${item.id}`);
      location.reload(); //由于页面缓存的影响不刷新页面不跳转
    },
  },
  async mounted() {
    this.fullscreenLoading = false;
    let res1 = await this.$api.getSongMenu(this.$route.params.id);
    this.playlist = res1.playlist;
    this.playlist.createTime = this.$utils.dateFormat(
      this.playlist.createTime,
      "YYYY-MM-DD"
    );
    let res2 = await this.$api.getSongMenuList(this.$route.params.id);

    let res6 = await this.$api.getSongMenuList(this.$route.params.id, 10, 10);
    this.songlist = this.normalize(res2.songs.concat(res6.songs));

    let res3 = await this.$api.getSongMenuSubscribe(this.$route.params.id);
    this.subscribe = res3.subscribers;

    let res4 = await this.$api.getSongMenuRelated(this.$route.params.id);

    this.relatedplaylist = res4.playlists;
    let res5 = await this.$api.getSongMenuComment(this.$route.params.id, 5);
    this.comment = res5.comments;
  },
  beforeRouteUpdate(to, from, next) {
    //console.log("file: SongMenu.vue:235 @ to:", to);
    if (to.fullPath.includes("songmenu")) location.reload(); //解决点击相关歌单无法返回上一页的问题
    next();
  },
  computed: {},
};
</script>


<style lang="less" scoped>
.grid_right {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  // height: 275px;
  .right_pollybutton {
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    width: 250px;
    justify-content: space-between;
    line-height: 30px;
  }
  .right_subscribe {
    display: flex;
    flex-direction: row-reverse;
  }
  .right_description_shorten {
    span {
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  .right_description_extend {
    span {
      margin-bottom: 10px;
    }
  }
}
.avatar_name_creatime {
  margin-top: 10px;
  display: flex;
  line-height: 40px;
}
.related_name {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  font-weight: 700;
}

.comment {
  margin: 15px;
  display: flex;
  .comment_name {
    margin-left: 15px;
    #content {
      margin: 10px 0 0 0;
      background: rgba(0, 0, 0, 0.05);
      border-radius: 5px;
      padding: 10px;
      color: gray;
    }
  }
}
</style>