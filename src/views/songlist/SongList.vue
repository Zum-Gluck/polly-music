<template>
  <div>
    <el-card >
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
                    >{{ data.name }}</el-tag
                  >
                </div>
              </div>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
     <span style=" margin:0 380px 0 20px;">
       热门标签: &nbsp;
       <span v-for="item in hotcategory" :key="item.id">
         {{ item.name }}&nbsp;&nbsp;
       </span>
     </span>
      <el-button type="danger" size="small"> 热门 </el-button>
      <el-button size="small" type="success"> 最新 </el-button>
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
  components: {},
  // 变量
  data() {
    return {
      category: [], //歌单分类
      hotcategory: [], //热门分类
      group: [],
    };
  },
  // 方法
  methods: {},
  // 计算属性
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() {},
  // 生命周期 - 挂载完成(可以访问dom元素)
  async mounted() {
    let res = await this.$api.SongListHot();
    this.hotcategory = res.tags;
    //console.log("file: SongList.vue:46 @ this.hotcategory:", this.hotcategory);

    let res1 = await this.$api.SongListCategory();
    this.category = res1;

    console.log(
      "file: SongList.vue:45 @ this.category:",
      this.category.categories
    );
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
</style>
