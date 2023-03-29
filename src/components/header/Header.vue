<template>
  <div class="header shadow">
    <div class="container flex-row">
      <div class="logo">
        <router-link :to="{ name: 'home' }"></router-link>
      </div>
      <!-- 导航开始 -->
      <ul class="nav flex-row">
        <li>
          <router-link to="/home"> 发现音乐 </router-link>
        </li>
        <li>
          <router-link to="/rank"> 排行榜 </router-link>
        </li>
        <li>
          <router-link to="/songlist">歌单</router-link>
        </li>
        <li>
          <router-link to="/singer">歌手</router-link>
        </li>
        <li>
          <router-link to="/videopage">视频</router-link>
        </li>
        <li>
          <router-link to="/mv">MV</router-link>
        </li>
        <li>
          <router-link to="/profile">我的</router-link>
        </li>
      </ul>
      <!-- 导航结束 -->

      <!-- 搜索icon start -->
      <div class="search">
        <i class="iconfont nicesearch-o"></i>
      </div>
      <!-- 搜索icon end -->

      <div class="login userbox" v-if="isLogin">
        <el-dropdown>
          <span class="el-dropdown-link">
            <a href="javascript:;">
              <img :src="profile.avatarUrl" alt="">
              <span>{{profile.nickname}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </a>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div class="textBox">
                <span class="iconfont icon-aixin"></span>
                <span>心动模式</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div class="textBox" @click="$router.push('/profile')">
                <span class="iconfont icon-Profile"></span>
                <span>个人主页</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div class="textBox" @click="loginOut">
                <span class="iconfont icon-tuichu"></span>
                <span>退出登陆</span>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </div>

      <div class="login" v-else>
        <router-link to="/login">登录</router-link>
      </div>

      <!-- 搜索输入拟态框 -->

      <!-- 搜索输入拟态框结束 -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: "polly-header",
  // 组件
  components: {},
  // 变量
  data() {
    return {
    };
  },
  // 方法
  methods: {
    ...mapMutations(['SET_LOGIN_STATUS', 'SET_PROFILE']),
    async loginOut() {
      try {
        await this.$api.loginOut()
        if (this.$route.name === 'profile') {
          this.$router.push("/login");
        }
        this.SET_LOGIN_STATUS(false)
        this.SET_PROFILE(null)
        window.localStorage.clear()
        this.$message({ type: 'success', message: "退出成功" });
      } catch (err) {
        console.log("退出登陆时出现了问题");
        console.log(err);
      }
    }
  },
  // 计算属性
  computed: {
    ...mapGetters(['isLogin', 'profile'])
  },
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() {

  },
  // 生命周期 - 挂载完成(可以访问dom元素)
  mounted() {
  },
};
</script>

<style lang="less" scoped>
/deep/ .el-dropdown-menu__item:not(.is-disabled) {
  &:hover {
    color: @color;
    background-color: #fff;
  }
}
.textBox {
  display: flex !important;
  justify-content: center;
  align-items: center;

  span {
    font-size: 15px;
    &:first-child {
      margin-right: 3px;
    }
  }
}
.header {
  height: 70px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: all 400ms ease-in-out;
  background-color: #fff;
  z-index: 2000;

  .container {
    width: 1200px;
  }
  .login {
    border-left: 1px #ccc solid;
    padding-left: 20px;

    & a:hover {
      color: @color;
    }
  }

  .logo {
    width: 146px;
    display: flex;
    align-items: center;
    margin-right: 30px;

    a {
      width: 100%;
      display: block;
      height: 70px;
      background-position: 0px center;
      background-repeat: no-repeat;
      background-size: 146px 46px;
      background-image: url("@/assets/images/logo.jpg");
    }

    img {
      width: 130px;
    }
  }

  .nav {
    flex: 1;

    li {
      font-size: 14px;
      height: 100%;
      padding: 0 15px;

      a {
        position: relative;
        transition: all 0.4s;

        &.router-link-active {
          color: @color;

          &::after {
            content: "";
            position: absolute;
            background: @color;
            left: 0;
            right: 0;
            bottom: -12px;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            margin: 0 auto;
            opacity: 1;
          }
        }
      }
    }
  }

  .search {
    height: 100%;
    display: flex;
    align-items: center;

    i {
      font-size: 22px;
      color: #161e27;
      padding: 0 15px;
      cursor: pointer;
    }
  }

  .userbox {
    position: relative;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 8px;
      }
    }
  }

  .search-wrap {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;

    .overlay {
      width: 100%;
      height: 100vh;
      top: 0;
      left: 0;
      position: absolute;
      background: rgba(120, 129, 147, 0.22);
      opacity: 0;
      -webkit-transition: opacity 0.3s;
      transition: opacity 0.3s;
      -webkit-backface-visibility: hidden;
      -webkit-transition-duration: 0.3s;
      transition-duration: 0.3s;
    }

    .search-body {
      position: relative;
      opacity: 0;
      width: 100%;
      max-width: 790px;
      animation-duration: 0.3s;
      animation-fill-mode: forwards;

      .search-content {
        background: #fff;
        position: relative;
        border-radius: 4px;
        box-shadow: 0 10px 50px -5px rgba(6, 39, 67, 0.12);
        padding: 0;
        border: 0;
        width: 100%;
        height: auto;
        overflow: hidden;

        .search-popup-cover {
          position: relative;
          overflow: hidden;
          padding: 3rem;

          .bg-effect {
            background-image: url("@/assets/images/personal.jpg");
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            filter: blur(8px);
            transform: scale(1.05);
            background-position: center;

            .layer {
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.3);
              position: absolute;
              opacity: 1;
              top: 0;
              left: 0;
              transition: opacity 0.3s ease-in-out;
            }
          }

          .search-form {
            position: relative;
            padding: 3rem 0;

            .text {
              display: block;
              width: 100%;
              background-clip: padding-box;
              transition: border-color 0.15s ease-in-out,
                box-shadow 0.15s ease-in-out;
              font-size: 0.9375rem;
              line-height: 1.5;
              padding: 0.625rem 0.75rem;
              height: calc(1.5em + 1.71875rem + 2px);
              text-align: center;
              font-weight: normal;
              color: #fff;
              border-color: transparent;
              background-color: rgba(255, 255, 255, 0.03);
              transition: all 0.3s ease;
              border-radius: 5px;

              &:hover {
                background-color: rgba(255, 255, 255, 0.04);
                border-color: transparent;
              }

              &:focus {
                background-color: rgba(255, 255, 255, 0.04);
                border-color: transparent;
                color: #fff;
              }

              &::placeholder {
                color: #fff;
                opacity: 1;
              }
            }
          }
        }

        .search-hot {
          padding: 1.5rem 3rem;

          .title {
            margin-bottom: 15px;

            i {
              color: @color;
              font-size: 1.625rem;
              margin-right: 8px;
            }

            .nicelishi {
              font-size: 1.425rem;
            }

            span {
              font-size: 15px;
              flex: 1;
            }

            p {
              color: @color;
              cursor: pointer;
            }
          }

          .tags {
            width: 100%;
            margin: 0 -0.25rem;
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            li {
              padding: 0.25rem;
              cursor: pointer;

              .btn {
                display: flex;
                font-weight: 400;
                color: #6d7685;
                background-color: #f4f4f5;
                text-align: center;
                vertical-align: middle;
                user-select: none;
                border: 1px solid transparent;
                font-size: 0.75rem;
                padding: 0.3125rem 0.75rem;
                line-height: 1.5;
                border-radius: 0.25rem;
                transition: color 0.15s ease-in-out,
                  background-color 0.15s ease-in-out,
                  border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
                border-radius: 4px;

                .close-dark {
                  display: inline-block;
                  background-image: url("@/assets/images/close-dark.svg");
                  background-size: contain;
                  background-position: center;
                  background-repeat: no-repeat;
                  vertical-align: middle;
                  width: 14px;
                  height: 14px;
                  margin-left: 8px;
                  opacity: 0.7;
                }

                &:hover {
                  color: #161e27;

                  .close-dark {
                    opacity: 1;
                  }
                }
              }
            }
          }
        }
      }

      .btn-close {
        position: absolute;
        bottom: -50px;
        left: 0;
        width: 100%;
        z-index: 9999;
        cursor: pointer;
        text-align: center;

        .close-light {
          display: inline-block;
          background-image: url("@/assets/images/close.svg");
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          vertical-align: middle;
          width: 28px;
          height: 28px;
        }
      }
    }

    &.open {
      z-index: 99999;

      .overlay {
        opacity: 1;
        pointer-events: auto;
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
      }

      .search-body {
        pointer-events: auto;
        -webkit-animation-name: tips-open;
        animation-name: tips-open;
      }
    }

    &.close {
      .search-body {
        -webkit-animation-name: tips-close;
        animation-name: tips-close;
      }
    }

    @keyframes tips-open {
      0% {
        opacity: 0;
        -webkit-transform: translate3d(0, 50px, 0);
        transform: translate3d(0, 50px, 0);
      }

      100% {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0px, 0);
      }
    }

    @keyframes tips-close {
      0% {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
      }

      100% {
        opacity: 0;
        -webkit-transform: translate3d(0, 50px, 0);
        transform: translate3d(0, 50px, 0);
      }
    }
  }
}
</style>
