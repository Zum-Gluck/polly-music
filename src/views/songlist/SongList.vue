<template>
  <div>
    <el-card>
      <el-dropdown placement="bottom-start" trigger="click">
        <el-button type="danger">
          全部<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div
              style="
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                width: 800px;
              "
            >
              <div
                v-for="(item, key, index) in category.categories"
                :key="index"
              >
                <h4>
                  {{ item }}
                </h4>
                <div>
                  <el-tag
                    type="info"
                    v-for="(data, index) in group[key]"
                    :key="index"
                    style="margin: 5px"
                    @click="handleClick(data.name, order)"
                    >{{ data.name }}</el-tag
                  >
                </div>
              </div>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      &nbsp;&nbsp;&nbsp;&nbsp; 热门标签: &nbsp;
      <el-tag
        type="danger"
        v-for="item in hotcategory"
        :key="item.id"
        class="hot_tag"
        @click="handleClick(item.name, order)"
      >
        {{ item.name }}
      </el-tag>
      <!--  -->
      <el-button
        type="danger"
        size="small"
        @click="handleHot"
        style="margin-left: 160px"
        plain
        :class="focus ? '' : 'hot_btn'"
      >
        热门
      </el-button>
      <el-button
        size="small"
        type="success"
        @click="handleNew"
        plain
        :class="focus ? 'new_btn' : ''"
      >
        最新
      </el-button>
      <el-divider><i class="el-icon-headset"></i></el-divider>
      <div
        style="display: flex; flex-wrap: wrap; justify-content: space-around"
      >
        <div v-for="(item, index) in list" :key="index" style="margin: 10px">
          <ListCover size="125px" :songListItem="item" />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import ListCover from "@/components/listcover/ListCover.vue";
import _ from "lodash";
export default {
  // component-name小写命名
  name: "song-list",
  // 组件
  components: { ListCover },
  // 变量
  data() {
    return {
      category: [], //歌单分类
      hotcategory: [], //热门分类
      group: [],
      order: "hot", //最新还是热门
      list: [], //歌单
      name: "", //种类名字
      focus: false, //按钮状态
    };
  },
  // 方法
  methods: {
    async handleClick(name, order = this.order) {
      console.log("file: SongList.vue:100 @ order:", order);
      this.name = name;
      //console.log("file: SongList.vue:71 @ data:", data);
      let res = await this.$api.NewHot(49, `%27${order}%27`, name, 0);

      console.log(res.playlists);
      this.list = res.playlists;
    },
    handleHot() {
      this.order = "hot";

      this.focus = false;
    },
    handleNew() {
      this.order = "new";

      this.focus = true;
    },
  },
  // 计算属性
  computed: {},
  // 监控data中的数据变化
  watch: {
    async order(neworder, oldorder) {
      console.log("file: SongList.vue:114 @ neworder:", neworder);

      let res = await this.$api.NewHot(49, `%27${neworder}%27`, this.name, 0);

      this.list = res.playlists;
    },
  },
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() {},
  // 生命周期 - 挂载完成(可以访问dom元素)
  async mounted() {
    let res0 = await this.$api.NewHot(49);
    this.list = res0.playlists;
    let res = await this.$api.SongListHot();
    this.hotcategory = res.tags;
    //console.log("file: SongList.vue:46 @ this.hotcategory:", this.hotcategory);

    let res1 = await this.$api.SongListCategory();
    this.category = res1;

    // console.log(
    //   "file: SongList.vue:45 @ this.category:",
    //   this.category.categories
    // );
    this.group = _.groupBy(this.category.sub, (item) => item.category);
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
.hot_btn {
  background-color: rgb(245, 108, 108);
  color: white;
  border: 1px solid rgb(245, 108, 108);
}
.new_btn {
  background-color: rgb(103, 194, 58);
  color: white;
  border: 1px solid rgb(103, 194, 58);
}
</style>
