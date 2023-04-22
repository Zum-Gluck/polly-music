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
                    @click="handleClick(data)"
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
        @click="handleClick(item)"
      >
        {{ item.name }}
      </el-tag>

      <el-button
        type="danger"
        size="small"
        @click="order = 'hot'"
        style="margin-left: 160px"
      >
        热门
      </el-button>
      <el-button size="small" type="success" @click="order = 'new'">
        最新
      </el-button>
      <el-divider><i class="el-icon-headset"></i></el-divider>
      <div
        style="display: flex; flex-wrap: wrap; justify-content: space-around"
      >
        <div v-for="(item, index) in list" :key="index" style="margin: 10px">
          <ListCover
            size="125px"
            :songListItem="{ coverImgUrl: item.coverImgUrl }"
          />
          <h4 class="list_name" style="width: 125px">{{ item.name }}</h4>
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
      order: "热门", //最新还是热门
      list: [], //歌单
    };
  },
  // 方法
  methods: {
    async handleClick(data) {
      //console.log("file: SongList.vue:71 @ data:", data);
      let res = await this.$api.NewHot(49, this.order, data.name, 0);
      console.log("file: SongList.vue:83 @ res:", res);
      this.list = res.playlists;
      console.log("file: SongList.vue:92 @ this.list:", this.list);
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
.list_name {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  text-align: center;
}
.hot_tag {
  margin: 8px;
  cursor: pointer;
  &:hover {
    background-color: rgba(246, 222, 222, 0.8);
  }
}
</style>
