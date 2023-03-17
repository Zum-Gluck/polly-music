<template>
  <div class="my_input">
    <input
      ref="input"
      type="text"
      :placeholder="hanldePlaceholder"
      @input="$emit('input', $event.target.value)"
      @blur="verifyValue"
    />

    <!-- 字体图标 -->
    <a
      href="javascript:;"
      @click="triggerType"
      v-if="conponentsType === 'password'"
    >
      <span class="iconfont icon-yanjing" v-show="isOpen"></span>
      <span class="iconfont icon-yincang" v-show="!isOpen"></span>
    </a>

    <div class="error" v-show="isShowError">
      {{ hanldeErrorText }}
    </div>
  </div>
</template>

<script>
const ACCOUNT = "account";
const PASSWORD = "password";
const MOBILE = "mobile";
const VERIFICATION = "verification";
const TEXT = "text";

export default {
  name: "polly-input",
  components: {},
  props: {
    conponentsType: {
      type: String,
      default: ACCOUNT,
    },
  },
  data() {
    return {
      placeholderType: {
        whileAccout: "Email/Telephone/Account",
        whilePassword: "Password",
        whileMobile: "Telephone Number",
        whileVerification: "Enter the verification code",
      },
      errorText: {
        account: "Please enter the right account",
        password: "Please enter the right password",
        mobile: "Please enter the reight mobile phone number",
        verificaiton: "Please enter the right code",
      },
      isOpen: false,
      // 表单验证正则
      reg: {
        mobile: /^1[3456789]\d{9}$/,
        email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        // 只能为数组
        verification: /^\d+$/,
      },
      isShowError: false,
    };
  },
  methods: {
    handleInputType(type) {
      if (type !== PASSWORD) return;
      this.$refs.input.type = PASSWORD;
    },

    triggerType() {
      this.isOpen = !this.isOpen;
      let type = this.$refs.input.type;
      this.$refs.input.type = type == PASSWORD ? TEXT : PASSWORD;
    },
    verifyValue(e) {
      let flag = false;
      let value = e.target.value;
      switch (this.conponentsType) {
        case ACCOUNT:
          flag = this.reg.mobile.test(value) || this.reg.email.test(value);
          break;

        case PASSWORD:
          flag = value.length > 6;
          break;

        case MOBILE:
          flag = this.reg.mobile.test(value);
          break;

        case VERIFICATION:
          flag = this.reg.verification.test(value);
          break;

        default:
          flag = false;
          console.log("some err happen");
      }

      if (!flag) {
        this.isShowError = true;
      } else {
        this.isShowError = false;
      }
    },
  },
  computed: {
    hanldePlaceholder() {
      switch (this.conponentsType) {
        case ACCOUNT:
          return this.placeholderType.whileAccout;

        case PASSWORD:
          this.isPassWord = true;
          return this.placeholderType.whilePassword;

        case MOBILE:
          return this.placeholderType.whileMobile;

        case VERIFICATION:
          return this.placeholderType.whileVerification;
      }
    },
    hanldeErrorText() {
      switch (this.conponentsType) {
        case ACCOUNT:
          return this.errorText.account;

        case PASSWORD:
          this.isPassWord = true;
          return this.errorText.password;

        case MOBILE:
          return this.errorText.mobile;

        case VERIFICATION:
          return this.errorText.verificaiton;
      }
    },
  },
  mounted() {
    this.handleInputType(this.conponentsType);
  },
};
</script>

<style lang="less" scoped>
.my_input {
  position: relative;
  width: 100%;
  height: 55px;
  margin: 15px 0;

  // 去掉edge浏览器自带的icoon图标
  input[type="password"]::-ms-reveal,
  input[type="password" i]::-ms-reveal {
    display: none;
  }

  input {
    width: 100%;
    height: 90%;
    outline: 0;
    border: 0;
    border-bottom: 1px solid #eeedee;
  }

  span {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }

  .error {
    color: red;
  }
}
</style>
