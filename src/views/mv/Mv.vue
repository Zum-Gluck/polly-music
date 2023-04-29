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
                width: 400px;
                flex-wrap: wrap;
              "
            >
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  flex-direction: column;
                "
              >
                <div v-for="(item, index) in tag.categories" :key="index">
                  <h4>
                    {{ item }}
                  </h4>
                </div>
              </div>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  flex-direction: column;
                "
              >
                <div>
                  <el-tag
                    type="info"
                    v-for="(data, index) in tag.areas"
                    :key="index"
                    style="margin: 5px"
                    @click="area = data"
                    >{{ data }}</el-tag
                  >
                </div>
                <div>
                  <el-tag
                    type="info"
                    v-for="(data, index) in tag.types"
                    :key="index"
                    style="margin: 5px"
                    @click="type = data"
                    >{{ data }}</el-tag
                  >
                </div>
              </div>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      &nbsp;&nbsp;&nbsp;&nbsp; 排序: &nbsp;
      <el-tag
        type="danger"
        v-for="(item, index) in orders"
        :key="index"
        class="hot_tag"
        @click="order = item"
      >
        {{ item }}
      </el-tag>
      <el-button
        type="success"
        size="medium"
        @click="handleAll(0)"
        style="margin-left: 650px"
        plain
        class="all_btn"
      >
        全部MV
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
          @click="handleVideoDetail(item)"
        >
          <VideoCover width="269" height="200" :data="item" />
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
      tag: {
        categories: ["地区", "类型"],
        areas: ["全部", "内地", "港台", "欧美", "日本", "韩国"],
        types: ["全部", "官方版", "现场版", "网易出品"],
      },
      orders: ["上升最快", "最热", "最新"], //排序
      list: [], //视频列表
      area: "全部",
      type: "全部",
      order: "上升最快",
      loading: null, //加载动画
      current: 1, //当前页数
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
      let res = await this.$api.getMVList(
        "全部",
        offset,
        "全部",
        "上升最快",
        8
      );
      this.list = res.data;
      this.loading = false;
    },
    async handleClick(attr, flag, offset = 0) {
      this.loading = true;
      this.current = 1;
      this.isall = false;
      switch (flag) {
        case 1:
          this.area = attr;
          break;
        case 2:
          this.type = attr;
          break;
        case 3:
          this.order = attr;
          break;
        default:
          return;
      }
      let res = await this.$api.getMVList(
        this.area,
        offset,
        this.type,
        this.order,
        8
      );
      this.list = res.data;
      this.loading = false;
    },
    async handleChange(currentpage) {
      this.current = currentpage;
      if (this.isall) {
        this.loading = true;
        let res1 = await this.$api.getMVList(
          "全部",
          currentpage * 8,
          "全部",
          "上升最快",
          8
        );
        this.list = res1.data;
        this.loading = false;
      } else {
        this.loading = true;
        let res = await this.$api.getMVList(
          this.area,
          currentpage * 8,
          this.type,
          this.order,
          8
        );
        this.list = res.data;
        this.loading = false;
      }
    },
    handleVideoDetail(item) {
      this.$router.push(`/vdetail/${item.vid ? item.vid : item.id}`);
    },
  },
  // 计算属性
  computed: {},
  // 监控data中的数据变化
  watch: {
    async area(newarea, oldarea) {
      await this.handleClick(newarea, 1);
    },
    async type(newtype, oldtype) {
      await this.handleClick(newtype, 2);
    },
    async order(neworder, oldorder) {
      await this.handleClick(neworder, 3);
    },
  },
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() {},
  // 生命周期 - 挂载完成(可以访问dom元素)
  async mounted() {
    await this.handleAll();
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
}
</style>
