<template>
  <div>
    <el-card>
      <el-divider><i class="el-icon-video-camera"></i></el-divider>
      <div
        v-loading="loading"
        ref="mainbox"
        style="display: flex; flex-wrap: wrap; justify-content: space-around"
      >
        <div
          v-for="(item, index) in list"
          :key="index"
          style="margin: 23px 10px; cursor: pointer"
          @click="handleVideoDetail(item.data)"
        >
          <VideoCover width="269" height="200" :data="item.data" />
        </div>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="1"
        :total="current + 5"
        :current-page="current"
        @current-change="handleChange"
        style="text-align: center"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import VideoCover from "@/components/videopage/VideoCover.vue";
export default {
  // component-name小写命名
  name: "VideoPage",
  // 组件
  components: { VideoCover },
  // 变量
  data() {
    return {
      list: [], //视频列表
      loading: null, //加载动画
      current: 1, //当前页数
      tagid: null, //标签id
    };
  },
  // 方法
  methods: {
    async handleChange(currentpage) {
      this.current = currentpage;
      this.loading = true;

      let res1 = await this.$api.getTagVideoList(
        this.$route.params.id,
        currentpage * 8
      );
      this.list = res1.datas.filter((item) => item.data.coverUrl !== undefined);
      this.loading = false;
    },
    handleVideoDetail(item) {
      this.$router.push(`/vdetail/${item.vid ? item.vid : item.id}`);
    },
  },
  // 计算属性
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() {},
  // 生命周期 - 挂载完成(可以访问dom元素)
  async activated() {
    let res = await this.$api.getTagVideoList(this.$route.params.id);
    this.list = res.datas;
  },
};
</script>

<style lang="less" scoped>
</style>
