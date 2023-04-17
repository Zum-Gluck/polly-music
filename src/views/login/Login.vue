<template>
  <div class="login">
    <el-row>
      <el-col :span="9">
        <div class="left">
          <!-- logo start -->
          <h1>
            <RouterLink to="/home">
              <a href="javascript:;">
                <img
                  src="@/assets/images/logo.jpg"
                  width="215px"
                />
              </a>
            </RouterLink>
          </h1>
          <!-- logo end -->

          <div
            class="box"
            :class="{
              isReverseFront: isReverseFront,
              isReverseBack: isReverseBack,
            }"
          >
            <!-- 正面开始 -->
            <div
              class="login_form front"
              ref="front"
            >
              <!-- 正面start -->
              <h1>
                <a href="javascript:;">Login via password</a>
              </h1>
              <p>
                <a href="javascript:;">
                  The account is your neteasemusic account
                </a>
              </p>

              <!-- 表单开始 -->
              <PollyInput
                conponentsType="account"
                v-model="userInfo.account"
                ref="account"
              >
              </PollyInput>

              <PollyInput
                conponentsType="password"
                v-model="userInfo.password"
                ref="password"
              >
              </PollyInput>
              <!-- 表单结束 -->

              <div class="forget">
                <a href="javascript:;"> <span>forget your password?</span></a>
                <div class="br"></div>
                <a
                  href="javascript:;"
                  @click="triggerLoginMethod"
                >
                  <span>login via QR code</span>
                </a>
              </div>
              <button @click="loginByPassword">sign in</button>
              <a
                href="javascript:;"
                class="switch"
              >
                <span>switch into Chinese</span>
              </a>
            </div>
            <!-- 正面结束 -->

            <!-- 反面开始 -->
            <div
              class="login_form back"
              ref="back"
              v-if="isShowBack"
            >
              <h1>
                <a href="javascript:;">login via QR code</a>
              </h1>
              <p>
                <a href="javascript:;">
                  Open your neteasemusic app to scan the QR code
                </a>
              </p>

              <!-- 二维码start -->
              <div class="qrCode ">
                <div
                  class="qrText"
                  @click="reGetQrCode"
                  v-if="isShowQrText"
                >
                  <a href="javascript:;">
                    <div>二维码已过期</div>
                    <div>点击重新获取</div>
                  </a>
                </div>
                <div
                  class="qrTextScan"
                  v-show="isScanSuccess"
                >
                  扫码成功请授权
                </div>
                <img
                  :class="{'qrFliter':isShowQrText || isScanSuccess}"
                  :src="qrCodeUrl"
                >
              </div>
              <!-- 二维码end -->

              <div class="forget">
                <a href="javascript:;">
                  <span>The telephone number is no longer use? </span></a>
                <div class="br"></div>
                <a
                  href="javascript:;"
                  @click="triggerLoginMethod"
                >
                  <span>login via password</span>
                </a>
              </div>
              <button @click="regeneratingBtn">
                Regenerating QR code
              </button>

              <a
                href="javascript:;"
                class="switch"
              >
                <span>switch to Chinese</span>
              </a>
            </div>
            <!-- 反面结束 -->
          </div>
        </div>
      </el-col>
      <el-col :span="15">
        <div class="right">
          <div class="title">PollyMusic</div>
          <h1>
            "Welcome to PollyMusic,We are committed to a better life for you"
          </h1>
          <div class="copy flex-center">
            © Copyright PollyMusic. Designed by fj in 2023-3.
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PollyInput from "./detail/PollyInput.vue";
import { createProfile } from '@/model/profile';

import { mapMutations } from 'vuex'

export default {
  name: "login",
  components: {
    PollyInput,
  },
  data() {
    return {
      // 正面信息
      userInfo: {
        account: "",
        password: "",
      },
      // 验证码的信息
      verificationInfo: {
        telephone: "",
        code: "'",
      },
      isReverseFront: false,
      isReverseBack: false,
      isSent: false,
      isAbleClick: true,
      countdwon: 10,
      isShowSignIn: false,
      qrCodeUrl: "",
      isShowBack: false,
      isShowQrText: false,
      isScanSuccess: false
    };
  },
  methods: {
    ...mapMutations(['SET_LOGIN_STATUS', 'SET_PROFILE']),
    //切换登录方式
    triggerLoginMethod() {
      if (this.isReverseFront) {
        setTimeout(() => {
          this.$refs.front.style.display = "block";
        }, 1000);
        this.isReverseBack = true;
        this.isReverseFront = false;
      } else {
        setTimeout(() => {
          this.$refs.front.style.display = "none";
        }, 1000);
        this.isReverseFront = true;
        this.isReverseBack = false;
      }

      //请求二维码 且只有第一次翻转盒子时发送网络请求
      if (this.isShowBack) return;
      this.QrCodeInit();
    },
    // 账号密码登陆按钮点击
    loginByPassword() {

      return this.$message({
        message: "网易限制,请使用二维码登陆",
        type: 'error',
        duration: 1000 * 6
      })


      /**
       * @bug 网易限制账号密码登陆，暂时绕不过，等更新吧
       */


      let isPassReg = !(
        this.$refs.account.$data.isShowError ||
        this.$refs.password.$data.isShowError
      );

      // 正则未通过
      if (!isPassReg) return false;

      // 账号或密码为空
      let userFlag = !this.userInfo.account || !this.userInfo.password;
      if (userFlag) return this.$message({ message: "account or password can not be empty", type: "error", });

      // 提交表单

    },
    // 发送验证码按钮
    async sendCodeClick() {
      if (!this.isAbleClick) return

      let isPassReg = !this.$refs.mobile.$data.isShowError

      // 正则未通过
      if (!isPassReg) return false;


      // 账号或密码为空
      let verificationFlag = !this.verificationInfo.telephone || !this.verificationInfo.code;
      if (verificationFlag) return this.$message({ message: "telephone or code can not be empty", type: "error", });

      // 发送验证码
      let { telephone } = this.verificationInfo;

      try {
        await this.$api.sendCaptcha(telephone)
        this.$message({
          message: "the ctcode has sent",
          type: "success"
        })
      } catch (error) {
        // 发送失败的打印
        console.log(error);
        this.$message({
          message: "the ctcode fail to send ",
          type: "error"
        })
      }

      this.isAbleClick = false;
      this.isShowSignIn = true;
      // 60秒后可以重新点击

      let timer = setInterval(() => {
        this.countdwon--;

        if (this.countdwon === 0) {
          clearInterval(timer)
          this.countdwon = 10
          this.isAbleClick = true;
        }
      }, 1000);
    },

    // 获取验证码 return:验证码的key
    async getQrCode() {
      try {
        let res = await this.$api.getKey();
        let key = res.data.unikey
        let data = await this.$api.getQrCode(key)
        this.qrCodeUrl = data.data.qrimg
        return key;
      } catch (err) {
        console.log("二维码获取失败");
        console.log(err);
      }
    },
    // 检查验证码状态 return 800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
    async checkQrcode(key) {
      try {
        const res = await this.$api.checkQrStatus(key);
        return res
      } catch (err) {
        console.log("检查验证码状态时发生了错误");
        console.log(err);
      }
    },
    pollStatus(key) {
      let statusInfo = null
      let statusCode = null;

      let timer = setInterval(async () => {

        // 授权成功终止轮询
        if (statusCode === 803 && statusCode !== null) clearInterval(timer);

        switch (statusCode) {
          case 800: //过期
            this.isShowQrText = true
            this.isScanSuccess = false
            clearInterval(timer);
            break;

          case 802: //扫码成功
            // console.log(statusInfo);
            this.isScanSuccess = true
            break;

          case 803: //授权成功
            window.localStorage.setItem('cookie', statusInfo.cookie);
            window.localStorage.setItem('isLogin', true);
            this.SET_LOGIN_STATUS(true);

            const userId = await this.getUserInfo()

            this.$router.push(`/profile/${userId}`);
            this.$message({
              type: 'success',
              message: "login success"
            })
            break;

          default:
            break;
        }

        statusInfo = await this.checkQrcode(key)
        statusCode = statusInfo.code;


      }, 1000);
    },
    async getUserInfo() {
      const status = await this.$api.getLoginStatus()
      const { profile } = status.data
      
      this.profile = profile

      let { userId } = profile
      // 用户信息加入缓存
      window.localStorage.setItem("profile", JSON.stringify(profile))
      this.SET_PROFILE(profile);

      return userId
    },
    // 调用以上QRcode有关的方法
    async QrCodeInit() {
      this.isShowBack = true; //显示背面
      const key = await this.getQrCode()
      this.pollStatus(key);

    },
    // 重新获取二维码的点击时间
    reGetQrCode() {
      this.isShowQrText = false;
      this.QrCodeInit();
    },
    regeneratingBtn() {
      if (!this.isShowQrText) return this.$message({ type: 'warnning', message: 'this QR code still valid' })
      this.isShowQrText = false;
      this.QrCodeInit();
    },
    isFromNotLogin() {
      if (this.$route.query.code == 301) {
        this.$message({
          type: 'info',
          message: "访问个人主页需要先登陆"
        })
      }
    }
  },
  computed: {
  },
  mounted() {
    this.isFromNotLogin();
  },
};
</script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
@keyframes front_reverse_animation {
  0% {
    transform: translate(-50%, -50%) scale(1, 1);
  }

  10% {
    transform: translate(-50%, -50%) scale(1.1, 1.1);
  }

  11% {
    transform: translate(-50%, -50%) scale(1.1, 1.1) rotateY(0);
  }

  50% {
    transform: translate(-50%, -50%) scale(1.1, 1.1) rotateY(90deg);
  }

  51% {
    transform: translate(-50%, -50%) scale(1.1, 1.1) rotateY(90deg);
  }

  90% {
    transform: translate(-50%, -50%) scale(1.1, 1.1) rotateY(180deg);
  }

  100% {
    transform: translate(-50%, -50%) scale(1, 1) rotateY(180deg);
  }
}

@keyframes back_reverse_animation {
  0% {
    transform: translate(-50%, -50%) scale(1, 1) rotateY(180deg);
  }

  10% {
    transform: translate(-50%, -50%) scale(1.1, 1.1) rotateY(180deg);
  }

  11% {
    transform: translate(-50%, -50%) scale(1.1, 1.1) rotateY(180deg);
  }

  50% {
    transform: translate(-50%, -50%) scale(1.1, 1.1) rotateY(90deg);
  }

  51% {
    transform: translate(-50%, -50%) scale(1.1, 1.1) rotateY(90deg);
  }

  90% {
    transform: translate(-50%, -50%) scale(1.1, 1.1) rotateY(0);
  }

  100% {
    transform: translate(-50%, -50%) scale(1, 1);
  }
}

.isReverseFront {
  animation: front_reverse_animation 2s forwards;
}

.isReverseBack {
  animation: back_reverse_animation 2s forwards;
}

.login {
  perspective: 1300px;
  .left {
    position: relative;
    height: 100vh;
    padding: 13px 30px 0;
    transform-style: preserve-3d;
    overflow: hidden;

    .box {
      position: relative;
      top: 50%;
      left: 50%;
      width: 350px;
      height: 550px;
      transform: translate(-50%, -50%);
      transform-style: preserve-3d;
    }

    .login_form {
      position: absolute;
      top: 0;
      left: 0;
      width: 350px;
      height: 550px;
      .qrCode {
        position: relative;
        height: 145px;
        padding-left: 40px;

        img {
          margin-top: -10px;
        }

        .qrText {
          position: absolute;
          top: 55px;
          left: 75px;
          color: #000;
          font-size: 19px;
          font-weight: 900;
          opacity: 1;
          z-index: 999;
        }
        .qrTextScan {
          position: absolute;
          top: 55px;
          left: 65px;
          color: #000;
          font-size: 19px;
          font-weight: 900;
          opacity: 1;
          z-index: 999;
        }
      }

      .qrFliter {
        opacity: 0.2;
      }

      h1 {
        color: #000;
        font-size: 23px;
      }
      p {
        margin: 10px 0 10px;
        color: #242121;
        font-weight: 500;
      }

      .forget {
        display: flex;
        flex-direction: column;
        margin-top: 30px;
        .br {
          width: 100%;
          height: 20px;
        }
      }
    }
    .front {
      z-index: 99;
      backface-visibility: hidden;
      background-color: #fff;
    }

    .back {
      z-index: -1;
      transform: rotateY(180deg);
      background-color: #fff;
    }

    a {
      &:hover {
        color: #7f6767;
        transition: all 0.3s;
      }
    }

    button {
      display: block;
      width: 100%;
      height: 50px;
      color: #fff;
      // background-color: #080e1b;
      background-color: #080e1b;
      margin-top: 30px;
      cursor: pointer;

      &:hover {
        background-color: #2a344c;
        transition: all 0.3s;
      }
    }

    .switch {
      float: right;
      display: block;
      margin-top: 10px;
    }
  }

  .right {
    position: relative;
    color: #fff;
    height: calc(100vh);
    background: url("../../assets/images/background.png") no-repeat 0/100% 100%;
    background-color: #ccc;

    .title {
      font-size: 20px;
      line-height: 15px;
      padding-top: 40px;

      &::before {
        content: "";
        display: block;
        float: left;
        width: 3px;
        height: 20px;
        margin-right: 10px;
        border-radius: 5px;
        background-color: #fa2800;
      }
    }

    h1 {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 765px;
      height: 175px;
      font-size: 39px;
      text-align: center;
      font-family: "Helvetica", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
    }

    .copy {
      position: absolute;
      top: calc(100vh - 60px);
      width: 100%;
      height: 60px;
    }
  }
}
</style>