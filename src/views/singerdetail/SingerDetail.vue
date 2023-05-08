<template>
  <div class="singer_detail">
    <div class="top_bg">
      <div class="mask_bl"></div>
      <div class="mask"></div>
    </div>
    <div class="singer_info">
      <div class="avatar">
        <img :src="singer.avatar ? singer.avatar+'?param=200y200' : ''">
      </div>
      <h1>{{singer.name}}</h1>
      <div class="follow">
        <span>关注TA</span>
      </div>
      <p class="desc">{{singer.briefDesc}}</p>
      <ul>
        <li>
          <p>{{singer.musicSize}}</p>
          <p>单曲数</p>
        </li>
        <li>
          <p>{{singer.albumSize}}</p>
          <p>专辑数</p>
        </li>
        <li>
          <p>{{singer.mvSize}}</p>
          <p>MV数</p>
        </li>
        <li>
          <p>{{fansCnt}}</p>
          <p>粉丝</p>
        </li>
      </ul>
    </div>
    <div class="tab_bar">
      <ul>
        <li>作品</li>
        <li class="mr">专辑</li>
        <li class="mr">MV</li>
        <li class="mr">歌手详情</li>
        <li class="mr">相似歌手</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  // component-name小写命名
  name: "singer-detail",
  // 组件
  components: {},
  // 变量
  data() {
    return {
      singer: {},
      isFollow: false,
      fansCnt: 0
    };
  },
  // 方法
  methods: {
    async init() {
      const { id } = this.$route.params
      const { data } = await this.$api.getSingerDetail(id);
      this.singer = data.artist

      // 获取follow相关信息
      const { data: followData } = await this.$api.getSingerFollowers(id)
      this.isFollow = followData.isFollow;
      this.fansCnt = followData.fansCnt
    }
  },
  // 计算属性
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() { },
  // 生命周期 - 挂载完成(可以访问dom元素)
  mounted() {
    this.init();
  },
};
</script>

<style lang="less" scoped>
.tab_bar {
  height: 30px;
  ul {
    display: flex;
    justify-content: space-around;
    width: 600px;
    margin: 0 auto;

    li {
      cursor: pointer;
      &:hover {
        color: @color;
      }
    }
  }
}
.singer_detail {
  .top_bg {
    position: absolute;
    width: 100%;
    top: 70px;
    left: 0;
    height: 570px;
    background-image: url("../../assets/images/top-bg.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    .mask_bl {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
    }

    .mask {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      height: 137px;
      background-image: url("../../assets/images/arrow-lr.png");
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  .singer_info {
    position: relative;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px 0 0;

    .avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 2px solid #eaeee4;
      transition: all 0.15s;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }

      &:hover {
        box-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
      }
    }
    .desc {
      width: 740px;
      height: 50px;
      text-align: center;
      display: -webkit-box;
      -webkit-line-clamp: 3; /* 显示的行数 */
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    h1 {
      margin: 20px 0;
      color: #fff;
      font-size: 24px;
    }

    .follow {
      width: 95px;
      height: 35px;
      color: #fff;
      line-height: 32px;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.6);
      border-radius: 18px;
      cursor: pointer;
      transition: all 0.15s;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid #fff;
      }
    }

    p {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.6);
      margin: 30px 0;
    }

    ul {
      display: flex;
      width: 510px;
      height: 150px;
      justify-content: space-between;

      li {
        text-align: center;

        & p:first-child {
          font-size: 23px;
        }

        & p:last-child {
          font-size: 14px;
          line-height: 14px;
          color: rgba(255, 255, 255, 0.6);
        }

        p {
          color: #fff;
          margin: 0;
        }
      }
    }
  }
}
</style>
