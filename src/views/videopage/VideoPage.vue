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
        @click="handleAll(0)"
        style="margin-left: 220px"
        plain
        class="all_btn"
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
      category: [], //视频分类
      tag: [], //视频标签
      list: [], //视频列表
      loading: null, //加载动画
      current: 1, //当前页数
      tagid: null, //标签id
      isall: null, //判断是非为全部视频
    };
  },
  // 方法
  methods: {
    async handleAll(offset = 0) {
      if (this.isall) return;
      this.loading = true;
      this.isall = true;
      this.current = 1;
      let res = await this.$api.getVideoList(offset);
      this.list = res.datas.filter((item) => item.data.coverUrl !== undefined);
      this.loading = false;
    },
    async handleClick(id = null, offset = 0) {
      this.loading = true;
      this.current = 1;
      this.tagid = id;
      this.isall = false;
      let res = await this.$api.getTagVideoList(this.tagid, offset);
      this.list = res.datas.filter((item) => item.data.coverUrl !== undefined);
      this.loading = false;
    },
    async handleChange(currentpage) {
      this.current = currentpage;

      if (this.isall) {
        this.loading = true;
        let res1 = await this.$api.getVideoList(currentpage * 8);
        this.list = res1.datas.filter(
          (item) => item.data.coverUrl !== undefined
        );
        this.loading = false;
      } else {
        this.loading = true;
        let res = await this.$api.getTagVideoList(this.tagid, currentpage * 8);
        this.list = res.datas.filter(
          (item) => item.data.coverUrl !== undefined
        );
        this.loading = false;
      }
    },
    handleVideoDetail(item) {
      this.$router.push(`/vdetail?id=${item.vid ? item.vid : item.id}`);
    },
  },
  // 计算属性
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() {
    this.getGrouplist();
    this.getCategoryList();
  },
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
.all_btn {
  background-color: rgb(103, 194, 58);
  color: white;
  border: 1px solid rgb(103, 194, 58);
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .container {
    height: 50px;
    .head {
      width: 100%;
      display: flex;
      float: left;
      background-color: #ede6e6;
    }
  }
  .tag-group__title {
    height: 100%;
    font-size: 20px;
    margin: 10px;
  }
  .video {
    display: flex;
    flex-wrap: wrap;
    .item-container {
      margin-bottom: 10px;
      margin-top: 10px;
      margin-left: 10px;
    }
    .item_ {
      position: relative;
      height: 200px;
      width: 290px;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .amount_play {
      position: absolute;
      top: 3px;
      right: 5px;
      height: 16px;
      border-radius: 4px;
      padding: 0 6px;
      color: #fff;
      font-size: 12px;
      font-weight: 500;
      line-height: 16px;
      background-color: rgba(0, 0, 0, 0.7);

      &::before {
        content: "";
        display: inline-block;
        width: 0px;
        height: 0px;
        border: 5px solid transparent;
        border-left-color: #fff;
        margin-top: -3px;
        margin-right: -3px;
        vertical-align: middle;
      }
    }
    .video_message {
      position: absolute;
      top: 170px;
      height: 30px;
      width: 100%;
      border-radius: 4px;
      padding: 0 6px;
      color: #fff;
      font-size: 12px;
      font-weight: 500;
      line-height: 16px;
      background-color: rgba(0, 0, 0, 0.7);
      .time {
        position: relative;
        left: 210px;
        top: 4px;
      }
      .Auto {
        position: relative;
        top: 4px;
      }
    }
  }
}
</style>