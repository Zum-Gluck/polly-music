<template>
  <div>
    <el-card>
      <el-dropdown placement="bottom-start" trigger="click">
        <el-button type="danger">
          所有分类<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div
              style="
                display: flex;
                justify-content: space-around;
                width: 800px;
                flex-wrap: wrap;
              "
            >
              <el-tag
                type="info"
                v-for="(data, index) in tag"
                :key="index"
                style="margin: 5px"
                @click="handleClick(data.id)"
                >{{ data.name }}</el-tag
              >
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      &nbsp;&nbsp;&nbsp;&nbsp; 热门分类: &nbsp;
      <el-tag
        type="danger"
        v-for="item in category"
        :key="item.id"
        class="hot_tag"
        @click="handleClick(item.id)"
      >
        {{ item.name }}
      </el-tag>
      <el-button
        type="success"
        size="medium"
        @click="handleAll"
        style="margin-left: 220px"
        plain
      >
        全部视频
      </el-button>
      <el-divider><i class="el-icon-video-camera"></i></el-divider>
      <div
        v-loading="loading"
        ref="mainbox"
        style="display: flex; flex-wrap: wrap; justify-content: space-around"
      >
        <div
          v-for="(item, index) in list"
          :key="index"
          style="margin: 23px 10px"
        >
          <VideoCover width="269" height="200" :data="item.data" />
        </div>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="8"
        :total="100"
        style="text-align: center"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import VideoCover from "@/components/videopage/VideoCover.vue";
import _ from "lodash";
export default {
  // component-name小写命名
  name: "VideoPage",
  // 组件
  components: { VideoCover },
  // 变量
  data() {
    return {
      category: [], //视频分类
      tag: [], //视频标签
      list: [], //视频列表
      loading: null, //加载动画
    };
  },
  // 方法
  methods: {
    async handleAll() {
      this.loading = true;
      let res = await this.$api.getVideoList();
      this.list = res.datas.filter((item) => item.data.coverUrl !== undefined);
      this.loading = false;
    },
    async handleClick(id) {
      this.loading = true;
      let res = await this.$api.getTagVideoList(id);
      this.list = res.datas.filter((item) => item.data.coverUrl !== undefined);
      this.loading = false;
    },
  },
  // 计算属性
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() {},
  // 生命周期 - 挂载完成(可以访问dom元素)
  async mounted() {
    await this.handleAll();
    let res = await this.$api.getVideoCategory();
    this.category = res.data;
    let res0 = await this.$api.getVideoTag();
    this.tag = res0.data;
  },
};
</script>

<style lang="less" scoped>
.el-dropdown-menu :hover {
  background-color: white !important;
  h4 {
    color: rgba(0, 0, 0, 0.7);
  }
  div {
    color: rgba(0, 0, 0, 0.7);
  }
  cursor: default;
}
.hot_tag {
  margin: 8px;
  cursor: pointer;
  &:hover {
    background-color: rgba(246, 222, 222, 0.8);
  }
}
</style>
