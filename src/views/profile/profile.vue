<template>
  <div class="profile">
    <div class="left">
      <ElCard>
        <SongList></SongList>
      </ElCard>
    </div>
    <div class="right">
      <ElCard>
        123
      </ElCard>
    </div>
  </div>
</template>

<script>
import SongList from "@/components/songlist/SongList.vue"
import { mapMutations } from 'vuex';

export default {
  // component-name小写命名
  name: "profile",
  // 组件
  components: {
    SongList
  },
  // 变量
  data() {
    return {
      userInfo: {
        nickname: "",
        pictureUrl: ""
      }
    };
  },
  // 方法
  methods: {
    async getUserInfoAndRetrunId() {
      const status = await this.$api.getLoginStatus()
      const { profile } = status.data
      let { userId } = profile

      // 用户信息加入缓存
      window.localStorage.setItem("profile", JSON.stringify(profile))
      this.SET_PROFILE(profile);

      return userId
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
    const userId = await this.getUserInfoAndRetrunId()
    const res = await this.$api.getUserLikeList(userId);
    console.log(res);
  },
  beforeRouteEnter(to, from, next) {
    // 访问的不是我的页面放行
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
</style>
