<template>
  <div class="profile">
    <div class="left">
      <ElCard>
        <SongList :songList="userLikedSongList"></SongList>
      </ElCard>
    </div>
    <div class="right">

      <!-- 用户信息开始 -->
      <div class=" my-card">
        <div
          class="background "
          v-if="profile.backgroundUrl"
          :style="'background:url( '+ profile.backgroundUrl +')'"
        >
          <div class="portrait">
            <img
              width="70px"
              :src="profile.avatarUrl"
            />
            <a href="javascript:;"> {{profile.nickname}}</a>

            <PollyButton
              class="fr"
              content="签到"
              width="60"
              height="30"
            ></PollyButton>
          </div>
        </div>
        <div class="user_info">
          <div
            class="signature"
            v-if="profile.signature"
          ><a href="javascript:;">
              {{profile.signature}}</a></div>

          <ul>
            <li>
              <a href="javascript:;">
                <span class="level">等级:</span>
                <span> <i class="iconfont icon-level"></i>{{userfLeveInfo.level}}</span>
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <span class="level">年龄:</span>
                <span>{{$utils.getAstro(profile.birthday)}}</span>
                <span
                  v-if="profile.gender == 1"
                  class="iconfont icon-nanxing"
                ></span>

                <span
                  v-else
                  class="iconfont icon-nv1"
                ></span>
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <span class="level">地区:</span>
                <span>{{$utils.getCityText(profile.city)}}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <!-- 用户信息结束 -->

      <!-- 收藏歌单开始 -->
      <el-card class="mt">
        <div class="liked_song_list">
          <div class="title">
            <a href="javascript:;"><span>我创建的歌单</span></a>
          </div>
        </div>
      </el-card>
      <!-- 收藏歌单结束 -->
    </div>
  </div>
</template>

<script>
import SongList from "@/components/songlist/SongList"
import PollyButton from '@/components/pollybutton/PollyButton.vue';
import { mapMutations } from 'vuex';
import { createSong } from "@/model/song"

export default {
  // component-name小写命名
  name: "profile",
  // 组件
  components: {
    SongList,
    PollyButton
  },
  // 变量
  data() {
    return {
      userInfo: {
        nickname: "",
        pictureUrl: ""
      },
      userLikedSongList: [],
      profile: {},
      userfLeveInfo: {},
    };
  },
  // 方法
  methods: {
    // 检查登陆状态并返回用户喜欢的音乐ID
    async getUserInfoAndRetrunIds() {
      const status = await this.$api.getLoginStatus()
      const { profile } = status.data
      // console.log(profile);
      this.profile = profile

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
    ...mapMutations(['SET_PROFILE']),
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

    //获取用户等级信息
    let { data } = await this.$api.getUserLevel()
    this.userfLeveInfo = data

    //获取用户收藏的歌单
    let res = await this.$api.getUserLikedSongList(this.profile.userId)
    console.log(res);

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

    .my-card {
      border-radius: 4px;
      border: 1px solid #ebeef5;
      overflow: hidden;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

      .background {
        position: relative;
        height: 130px;
        background-size: 100% !important;

        .portrait {
          position: absolute;
          top: 110px;
          left: 20px;
          width: 89%;
          img {
            border-radius: 5px;
            border: 1px solid #ccc;
            vertical-align: middle;
            margin-right: 6px;
          }
          a:hover {
            color: @color;
          }
          .polly-button {
            margin-top: 22px;
          }
        }
      }

      .user_info {
        padding: 60px 20px 15px;
        background-color: #fff;
        .signature {
          font-size: 8px;
          cursor: pointer;

          a {
            color: #999;
          }

          &:hover a {
            color: @color;
          }
        }

        ul {
          margin-top: 10px;
          li {
            display: flex;
            align-items: center;
            margin-bottom: 4px;
            &::before {
              content: "";
              display: block;
              width: 7px;
              height: 7px;
              background-color: @color;
              border-radius: 50%;
            }

            span {
              margin-left: 9px;
              font-size: 13px;
            }

            a:hover {
              color: @color;
            }

            .icon-nanxing {
              color: #4d95cb;
              font-size: 14px;
            }
            .icon-nv1 {
              color: #eb50c4;
              font-size: 14px;
            }
            .icon-level {
              margin-right: -1px;
              font-size: 13px;
            }
          }
        }
      }
    }
  }

  .liked_song_list {
    height: 300px;

    .title {
      display: flex;
      font-size: 13px;

      &::before {
        display: block;
        content: "";
        width: 3px;
        height: 20px;
        background-color: @color;
        margin-right: 10px;
      }
    }
  }
}

.el-card {
  background: no-repeat;
}
</style>
