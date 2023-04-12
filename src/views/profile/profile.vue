<template>
  <div class="profile">
    <div class="left">
      <ElCard>
        <SongList :songList="userLikedSongList"></SongList>
      </ElCard>
    </div>
    <div class="right">

      <!-- 用户信息开始 -->
      <UserInfo :profile="userinfo"></UserInfo>
      <!-- 用户信息结束 -->

      <!-- 收藏歌单开始 -->
      <div class="mt">
        <PollyCard title="收藏的歌单">
          <div class="cover_layout">
            <ListCover
              v-for="item in userCreatedSongList"
              :key="item.id"
              :songListItem="item"
            ></ListCover>
          </div>
        </PollyCard>
      </div>
      <!-- 收藏歌单结束 -->
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
    UserInfo
  },
  // 变量
  data() {
    return {
      userInfo: {
        nickname: "",
        pictureUrl: ""
      },
      // 用户喜欢的音乐
      userLikedSongList: [],
      profile: {},
      userfLeveInfo: {},
      // 用户收藏（创建）的歌单
      userCreatedSongList: [],
      // userInfo组件需要的数据
      userinfo:{}
    };
  },
  // 方法
  methods: {
    ...mapMutations(['SET_PROFILE']),
    // 检查登陆状态并返回用户喜欢的音乐ID
    async getUserInfoAndRetrunIds() {
      const status = await this.$api.getLoginStatus()
      const { profile } = status.data
      // console.log(profile);
      this.profile = profile

      this.userinfo = await this.normalizeUserInfo(this.profile)

      let { userId } = profile
      // 用户信息加入缓存
      window.localStorage.setItem("profile", JSON.stringify(profile))
      this.SET_PROFILE(profile);

      const ids = await this.$api.getUserLikeList(userId);
      return ids
    },
    // 获取音乐详情信息
    async getUserDetail() {
      let { ids } = await this.getUserInfoAndRetrunIds()

      let idsStr = ids.join(',')
      let { songs } = await this.$api.getSongDetail(idsStr)
      return songs;
    },
    async normalizeSongList() {
      let res = []
      let songsDetai = await this.getUserDetail();


      //没有喜欢的音乐
      if (!songsDetai) {
        this.$bus.$emit('noneLikedSong')
        return []
      }


      songsDetai.forEach((item, index) => {
        // console.log(item);
        item.index = ++index;
        res.push(createSong(item));
      });
      // console.log(res);
      return res

    },

    async normalizeUserInfo(profile) {
      //获取用户等级信息
      let { data } = await this.$api.getUserLevel()
      this.userfLeveInfo = data
      profile.level = this.userfLeveInfo.level
      return createProfile(profile);
    }
  },
  // 计算属性
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() { },
  // 生命周期 - 挂载完成(可以访问dom元素)
  async mounted() {
    // 获取用户喜欢的音乐
    this.userLikedSongList = await this.normalizeSongList()

    //获取用户收藏的歌单
    let res = await this.$api.getUserLikedSongList(this.profile.userId)
    this.userCreatedSongList = res.playlist
    // console.log(this.userCreatedSongList);

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
.mt {
  margin-top: 30px;
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
    width: 100%;
    margin-right: 20px;
  }

  .right {
    width: 350px;
    flex-shrink: 0;
  }
}

.el-card {
  background: no-repeat;
}

.cover_layout {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;

  .song_list_cover:nth-child(3),
  .song_list_cover:nth-child(4) {
    margin-bottom: 0;
  }
}
</style>
