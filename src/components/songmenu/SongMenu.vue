<template>
  <div>
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

            <el-button round><i class="el-icon-star-off"></i>收藏</el-button>
          </div></el-col
        >
      </el-row>
      <SongList :songList="this.songlist.songs" />
    </el-card>
  </div>
</template>

<script>
import SongList from "../songlist/SongList.vue";
import PollyButton from "../pollybutton/PollyButton.vue";
import PollyCard from "../pollycard/PollyCard.vue";
import ListCover from "../listcover/ListCover.vue";
import utils from "../../utils/index.js";
export default {
  components: { PollyCard, ListCover, PollyButton, SongList },
  data() {
    return {
      playlist: {
        creator: {},
      },
      songlist: {},
    };
  },
  async activated() {
    // console.log(this.$route.params.id);
    let res1 = await this.$api.getSongMenu(this.$route.params.id);
    let res2 = await this.$api.getSongMenuList(this.$route.params.id);

    this.playlist = res1.playlist;
    this.songlist = res2;
    this.playlist.createTime = utils.dateFormat(
      this.playlist.createTime,
      "YYYY-MM-DD"
    );
    // console.log(res2)
    console.log(this.playlist);
    console.log(this.songlist.songs);
  },
  methods: {},

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