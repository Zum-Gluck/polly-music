<template>
  <div>
    <el-row :gutter="30">
      <el-col
        :span="17"
        :offset="0"
      >
        <el-card style="position: relative">
          <el-row :gutter="20">
            <el-col :span="9">
              <div class="grid_left">
                <img
                  class="cover"
                  :src="this.album.picUrl"
                >
              </div>
            </el-col>
            <el-col :span="15">
              <div class="grid_right">
                <h1 style="font-size: 25px">
                  {{ album.name }}
                </h1>
                <div class="avatar_name_creatime">
                  <img
                    v-if="album.artist"
                    :src="album.artist.picUrl"
                    style="
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    cursor: pointer;
                  "
                  />
                  <span
                    style="
                    color: black;
                    margin-left: 20px;
                    margin-right: 40px;
                    cursor: pointer;
                  "
                    v-if="album.artist"
                  >{{ album.artist.name}}</span>
                  <span style="color: rgba(0, 0, 0, 0.5)">{{ album.publishTime }}创建</span>
                </div>
                <div class="right_pollybutton">
                  <span>公司:{{this.album.company}}</span>
                </div>
                <div :class="
                  extend
                    ? 'right_description_extend'
                    : 'right_description_shorten'
                ">
                  <span>
                    {{ this.album.description }}
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
                    @click="
                    () => {
                      $store.getters.isLogin !== null && isSubscribe === false
                        ? handleSubscribe(1)
                        : handleSubscribe(2);
                    }
                  "
                  ><i class="el-icon-star-off"></i>{{ isSubscribe === true ? "取消收藏" : "收藏" }}</el-button>
                </div>
              </div>
            </el-col>
          </el-row>

          <SongList
            :songList="songlist"
            style="margin-top: 20px"
          />
        </el-card>
      </el-col>
      <el-col
        :span="7"
        :offset="0"
      >
        <PollyCard
          title="热门专辑"
          style="margin-bottom: 30px"
        >
          <div
            v-for="(item, value) in relatedplaylist"
            :key="value"
            style="position: relative; margin-top: 10px; cursor: pointer"
            @click="handleRelatedAlbum(item)"
          >
            <AlbumListCover
              size="55px"
              :AlbumSongListItem="{ coverImgUrl: item.blurPicUrl ,id:item.id }"
              style="display: inline-block; margin: 1px"
              param="100y100"
            />
            <div
              style="position: absolute; top: 0; left: 75px"
              class="related_name"
            >
              {{ item.name }}
            </div>
            <div style="
              position: absolute;
              bottom: 10px;
              left: 75px;
              color: rgba(0, 0, 0, 0.5);
            ">
              By.{{ item.artist.name }}
            </div>
          </div>
        </PollyCard>
        <PollyCard title="精彩评论">
          <el-empty
            description="暂无评论"
            v-if="!comment.length"
          ></el-empty>

          <div
            v-for="(item, value) in comment"
            :key="value"
          >
            <div class="comment">
              <img
                :src="item.user.avatarUrl + '?param=50y50'"
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
  </div>
</template>

<script>
import SongList from "@/components/songlist/SongList.vue";
import PollyButton from "@/components/pollybutton/PollyButton.vue";
import PollyCard from "@/components/pollycard/PollyCard.vue";
import { createSong } from "@/model/song";
import AlbumListCover from '@/components/albumlistcover/AlbumListCover.vue'
export default {
  // component-name小写命名
  name: "aldum-detail",
  // 组件
  components: { PollyCard, PollyButton, SongList, AlbumListCover },
  inject: ["reload"],
  data() {
    return {
      songlist: [], //专辑歌曲
      relatedplaylist: [], //相关专辑
      comment: [], //歌单评论
      extend: false, //控制专辑简介展开，
      isSubscribe: null, //专辑收藏状态
      album: [],    //专辑信息
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
    handleRelatedAlbum(item) {
      this.$route.params.id = item.id;
      this.reload();
    },
    async handleSubscribe(type) {
      if (type === 1) this.isSubscribe = true;
      else this.isSubscribe = false;
      if (this.$store.getters.isLogin === null) {
        this.$message({
          message: "请先登录",
          type: "warning",
        });
      } else {
        await this.$api.ToSub(this.$route.params.id, type);
        this.$message({
          message: type === 1 ? "收藏成功" : "已取消收藏",
          type: "success",
        });
      }
    },
    async judgeSubscribe() {
      let res = await this.$api.getDynamic(this.$route.params.id)
      console.log(res.isSub)
      if (res.isSub === true)
        this.isSubscribe = true;
      else this.isSubscribe = false;
    }
  },
  async activated() {
    this.$store.getters.isLogin !== null
    this.judgeSubscribe();
    let res1 = await this.$api.getAlbum(this.$route.params.id);
    this.album = res1.album
    this.songs = res1.songs;
    this.album.publishTime = this.$utils.dateFormat(
      this.album.publishTime,
      "YYYY-MM-DD"
    );
    // console.log(this.album.blurPicUrl)
    let res2 = await this.$api.getAlbum(this.$route.params.id);
    let res6 = await this.$api.getAlbum(this.$route.params.id, 10, 10);
    this.songlist = this.normalize(res2.songs);
    let res4 = await this.$api.getRelateAlbum(this.album.artist.id, 5);
    console.log(this.album.artist.id)
    this.relatedplaylist = res4.hotAlbums;
    let res5 = await this.$api.getAlbumComment(this.$route.params.id, 5);
    this.comment = res5.comments;
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

::v-deep img {
  -webkit-user-drag: none;
}
.cover {
  border-radius: 10px;
}
</style>
