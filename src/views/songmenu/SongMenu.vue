<template>
  <div>
    <el-row>
      <el-col :span="20">
        <el-card>
          <el-row :gutter="20">
            <el-col :span="6"
              ><div class="grid-left">
                <ListCover
                  size="250px"
                  :songListItem="{ coverImgUrl: this.playlist.coverImgUrl }"
                /></div
            ></el-col>
            <el-col :span="18">
              <div class="grid-right">
                <h1 style="font-size: 25px">
                  {{ this.playlist.name }}
                </h1>
                <div>
                  <img
                    :src="this.playlist.creator.avatarUrl"
                    style="width: 40px; height: 40px; border-radius: 50%"
                  /><span style="color: black">{{
                    this.playlist.creator.nickname
                  }}</span>
                  <span style="color: rgba(0, 0, 0, 0.5)"
                    >{{ this.playlist.createTime }}创建</span
                  >
                </div>
                <div>
                  <span>标签:</span>
                  <PollyButton
                    v-for="(item, index) in this.playlist.tags"
                    :key="index"
                    :content="item"
                    height="30px"
                    width="60px"
                    style="border-radius: 30px; display: inline-block"
                  />
                </div>
                <div>
                  <span>
                    {{ this.playlist.description }}
                  </span>
                </div>

                <el-button round
                  ><i class="el-icon-star-off"></i>收藏</el-button
                >
              </div>
            </el-col>
          </el-row>
          <SongList :songList="this.songlist" />
        </el-card>
      </el-col>
      <el-col :span="4">
        <PollyCard title="喜欢这个歌单的人">
          <ListCover
            v-for="(item, value) in this.subscribe"
            :key="value"
            size="35px"
            :songListItem="{ coverImgUrl: item.avatarUrl }"
            style="display: inline-block; margin: 2px"
          />
        </PollyCard>
        <PollyCard title="相关推荐">
          <div v-for="(item, value) in this.relatedplaylist" :key="value">
            <ListCover
              size="55px"
              :songListItem="{ coverImgUrl: item.coverImgUrl }"
              style="display: inline-block; margin: 2px"
            />{{ item.name }} By.{{ item.creator.nickname }}
          </div>
        </PollyCard>
        <PollyCard title="精彩评论">
          <div v-for="(item, value) in this.comment" :key="value">
            <img
              :src="item.user.avatarUrl"
              style="width: 40px; height: 40px; border-radius: 50%"
            />
            <span>
              {{ item.user.nickname }}
            </span>
            <div>
              {{ item.content }}
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
import ListCover from "@/components/listcover/ListCover.vue";
import { createSong } from "@/model/song";
export default {
  components: { PollyCard, ListCover, PollyButton, SongList },
  data() {
    return {
      playlist: {
        creator: {},
      },
      songlist: [],
      subscribe: [],
      relatedplaylist: [],
      comment: [],
    };
  },
  async activated() {
    // console.log(this.$route.params.id);
    let res1 = await this.$api.getSongMenu(this.$route.params.id);
    let res2 = await this.$api.getSongMenuList(this.$route.params.id);
    let res3 = await this.$api.getSongMenuSubscribe(this.$route.params.id);
    let res4 = await this.$api.getSongMenuRelated(this.$route.params.id);
    let res5 = await this.$api.getSongMenuComment(this.$route.params.id);
    console.log("file: SongMenu.vue:114 @ res5:", res5.comments);
    this.playlist = res1.playlist;
    this.playlist.createTime = this.$utils.dateFormat(
      this.playlist.createTime,
      "YYYY-MM-DD"
    );
    this.songlist = this.normalize(res2.songs);
    this.subscribe = res3.subscribers;
    this.relatedplaylist = res4.playlists;
    this.comment = res5.comments;
  },
  methods: {
    normalize(list) {
      let index = 1;
      return list.map((element) =>
        Object.assign(createSong(element), { index: index++ })
      );
    },
  },

  computed: {},
};
</script>


<style lang="less" scoped>
// .el-card{
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   .detail_left{
//     flex: 1;
//     display: inline-block;
//   }
//   .detail_right{
//     flex: 1;
//   }
// }
</style>