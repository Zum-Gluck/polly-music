<template>
  <div class="profile">
    <div class="left">
      <PollyCard :title="userinfo.nickname + '喜欢的音乐'">
        <ul class="nav_bar">
          <li
            v-for="(item,index) of songListType"
            :key="index"
            :class="{'isActive':currentType === index}"
            @click="toggleSongListDaye(item)"
          >
            {{item.type}}
          </li>
        </ul>
        <SongList :songList="songListDate"></SongList>
      </PollyCard>
      <div class="layout">
        <el-pagination
          background
          v-show="currentType === 0"
          layout="prev, pager, next"
          :current-page="currentPage"
          :total="totalSongs"
          :page-size="50"
          @next-click="ChangeClick"
          @prev-click="ChangeClick"
          @current-change="ChangeClick"
        >
        </el-pagination>
      </div>
    </div>
    <div class="right">
      <UserInfo
        :profile="userinfo"
        :userCreatedSongList="playlist"
      ></UserInfo>
    </div>
  </div>
</template>

<script>
import SongList from "@/components/songlist/SongList"
import ListCover from '@/components/listcover/ListCover.vue';
import PollyCard from '@/components/pollycard/PollyCard.vue';
import UserInfo from '@/components/userinfo/UserInfo.vue';


import { mapMutations } from 'vuex';
import { createSong } from "@/model/song"
import { createProfile } from "@/model/profile"


export default {
  // component-name小写命名
  name: "profile",
  // 组件
  components: {
    SongList,
    ListCover,
    PollyCard,
    UserInfo,
  },
  // 变量
  data() {
    return {
      userInfo: {
        nickname: "",
        pictureUrl: ""
      },
      // 默认用户喜欢的音乐
      songListDate: [],
      profile: {},
      userfLeveInfo: {},
      // 用户收藏（创建）的歌单
      userCreatedSongList: [],
      // userInfo组件需要的数据
      userinfo: {},
      // 歌曲类型
      songListType: [
        { type: '我喜欢的', value: 0 },
        { type: '最近一周', value: 1 },
        { type: '所有时间', value: 2 },
      ],
      currentType: 0,
      playlist: [],
      totalSongs: 1000,
      offset: 0,
      currentPage: 1
    };
  },
  // 方法
  methods: {
    ...mapMutations(['SET_PROFILE']),
    /**
     * @method 1.处理歌曲
     */
    async getUserLikedList(limit = 50, offset = 0) {
      const id = this.$route.params.id
      // 如果uid存在，则是其他用户的主页
      if (id) return this.getOtherPersonInfo(id, limit, offset);
    },
    // 格式化歌曲
    normalizeSongList(lists) {
      let res = []
      lists.forEach((item, index) => {
        // console.log(item);
        item.index = ++index;
        res.push(createSong(item));
      });

      return res
    },
    async normalizeUserInfo(profile) {
      //获取用户等级信息
      let { data } = await this.$api.getUserLevel()
      this.userfLeveInfo = data
      profile.level = this.userfLeveInfo.level
      return createProfile(profile);
    },

    /**
     * @mthod 获取其他用户的信息
     * @param {number} id 
     */
    async getOtherPersonInfo(id, limit, offset = 0) {
      let info = await this.$api.getUserLikedSongList(id)
      this.playlist = info.playlist
      this.totalSongs = this.playlist[0].trackCount
      this.userinfo = await this.normalizeUserInfo(this.playlist[0].creator)

      let userLikedList = await this.$api.getSongMenuList(this.playlist[0].id, limit, offset)

      let list = this.normalizeSongList(userLikedList.songs)

      //没有喜欢的音乐
      if (!list) {
        this.$bus.$emit('noneLikedSong')
        return []
      }
      return list
    },

    /**
     * @method 获取最近一周听歌数据
     */

    // 切换歌单数据
    async toggleSongListDaye(item) {
      const { value } = item
      if (this.currentType === value) return;
      this.currentType = value;

      switch (value) {
        // 我喜欢的音乐
        case 0:
          this.songListDate = await this.getUserLikedList(50, this.offset);
          break;

        // 最近一周听歌排行
        case 1:
          this.songListDate = await this.weekDateSongList();
          break;

        // 所有时间听歌排行
        case 2:
          this.songListDate = await this.allDateSongList();
          break;
        default:
          console.log('error');
          break;
      }
    },
    async weekDateSongList() {
      let uid = this.userinfo.userId;
      let res = await this.$api.getUserRecord(uid)
      let songlist = []
      res.weekData.map(item => {
        songlist.push(item.song)
      })
      return this.normalizeSongList(songlist)
    },
    async allDateSongList() {
      let uid = this.userinfo.userId;
      let res = await this.$api.getUserRecord(uid, 0)
      let songlist = []
      res.allData.map(item => {
        songlist.push(item.song)
      })
      return this.normalizeSongList(songlist)
    },
    async ChangeClick(current) {
      this.currentPage = current;
      this.offset = (current - 1) * 50
      this.songListDate = await this.getUserLikedList(50, this.offset);
    }
  },
  // 计算属性
  computed: {},
  // 监控data中的数据变化
  watch: {
    $route: async function (newVal) {
      if (newVal.name !== 'profile') return
      let profile = JSON.parse(localStorage.getItem('profile'));
      const currentId = this.$route.params.id
      if (currentId !== profile.id) {
        this.songListDate = await this.getUserLikedList()
        this.getOtherPersonInfo(currentId);
      }
    }
  },
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() { },
  // 生命周期 - 挂载完成(可以访问dom元素)
  async mounted() {
    // 默认获取用户喜欢的音乐
    this.songListDate = await this.getUserLikedList()
  },
  activated() {
    if (this.currentType !== 0) this.currentType = 0;
    this.ChangeClick(this.currentPage);
  },
  beforeRouteEnter(to, from, next) {
    // 访问的不是Profile页面放行
    if (to.name != "profile") next()

    let isLogin = window.localStorage.getItem('isLogin');

    if (isLogin) {
      next()
    } else {
      next({
        path: "login?code=301",
      })
    }

  },
};
</script>

<style lang="less" scoped>
.isActive {
  color: @color;
}
.profile {
  display: flex;
  justify-content: space-between;
  align-items: top;
  .left,
  .right {
    border-radius: 30px;
  }

  .left {
    position: relative;

    width: 100%;
    margin-right: 20px;

    .nav_bar {
      position: absolute;
      right: 167px;
      top: 48px;
      display: flex;
      margin-top: 5px;
      font-size: 13px;
      li {
        margin-right: 10px;
        cursor: pointer;
      }
    }
    .layout {
      display: flex;
      justify-content: center;
      margin-top: 15px;
    }
  }

  .right {
    width: 350px;
    flex-shrink: 0;
  }
}
</style>
