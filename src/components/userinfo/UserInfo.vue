<template>
  <div class="userinfo">
    <!-- 用户卡片开始 -->
    <div class=" my-card">
      <div
        class="background "
        v-if="profile.backgroundUrl"
        :style="'background:url( '+ profile.backgroundUrl +')'"
      >
        <div class="portrait">
          <img
            width="70px"
            :src="profile ? profile.avatarUrl :''"
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
              <span> <i class="iconfont icon-level"></i>{{profile.level}}</span>
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
    <!-- 用户卡片结束 -->

    <!-- 用户收藏歌单开始 -->
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
    <!-- 用户收藏歌单结束 -->

  </div>

</template>

<script>
import PollyButton from '@/components/pollybutton/PollyButton.vue';
import PollyCard from '../pollycard/PollyCard.vue';
import ListCover from '../listcover/ListCover.vue';

export default {
  // component-name小写命名
  name: "user-info",
  // 组件
  components: {
    PollyButton,
    PollyCard,
    ListCover
  },
  // 父传子
  props: {
    profile: {
      type: Object,
      default: {}
    }
  },
  // 变量
  data() {
    return {
      //用户收藏的歌单
      userCreatedSongList: []
    };
  },
  // 方法
  methods: {
    async getUserCreatedSongList() {
      //获取用户收藏的歌单
      let res = await this.$api.getUserLikedSongList(this.profile.userId)
      this.userCreatedSongList = res.playlist
    }
  },
  // 计算属性
  computed: {},
  // 监控data中的数据变化
  watch: {},
  updated() {
    this.getUserCreatedSongList()
  },
};
</script>

<style lang="less" scoped>
.mt {
  margin-top: 30px;
}
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
      font-size: 12px;
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
