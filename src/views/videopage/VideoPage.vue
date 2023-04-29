<template>
  <div>
    <div class="container">
      <div class="head">
        <el-dropdown>
          <el-button size="medium" type="danger" style="height: 100%">
            全部<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <div class="item-tag" style="width: 600px">
              <el-tag
                style="width: 80px"
                v-for="item in group_list"
                :key="item.id"
                @click="handle(item.id, 0)"
                >{{ item.name }}
              </el-tag>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="tag-group">
          <span class="tag-group__title">分类:</span>
          <el-tag
            style="margin: 10px; text-align: center"
            v-for="item in category_list"
            :key="item.id"
            :type="item.type"
            size="medium"
            effect="dark"
            @click="handle(item.id,0)"
          >
            {{ item.name }}
          </el-tag>
        </div>
        <el-button type="danger" style="margin-left: 200px">全部</el-button>
      </div>
    </div>
    <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
    <div class="video">
      <div class="item-container" v-for="item in showData" :key="item.data.vid" style="height:200px;">
        <div class="item_" >
          <div class="amount_play" v-if="3">
            <span> {{ $utils.tranNumber(3, 0) }}</span>
          </div>
          <img :src="item.data.coverUrl" alt="" />
          <div class="video_message">
            <span class="Auto">Auto</span>
            <span class="time">{{item.data.playTime}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import setTime from '@/utils/index.js'
export default {
  // component-name小写命名
  name: "VideoPage",
  // 组件
  components: {},
  // 变量
  data() {
    return {
      items: [
        { type: "", label: "标签一" },
        { type: "success", label: "标签二" },
        { type: "info", label: "标签三" },
        { type: "danger", label: "标签四" },
        { type: "warning", label: "标签五" },
      ],
      group_list: [],
      category_list: [],
      showData: [],
    };
  },
  // 方法
  methods: {
    async getGrouplist() {
      let data = await this.$api.groupList();
      this.group_list = data.data;
    },
    async getCategoryList() {
      let data = await this.$api.category_list();
      //  this.category_list=data.data;
      this.category_list = data.data;
      // console.log(data.data)
    },
    async handle(id, offset) {
      let data = await this.$api.getVideo(id, offset);
      this.showData = data.datas;
      console.log(this.showData);
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
  mounted() {},
};
</script>

<style lang="less" scoped>
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
  .item-container{
    margin-bottom: 10px;
    margin-top:10px;
    margin-left: 10px;
  }
  .item_ {
    position: relative;
    height: 200px;
    width: 290px;
    img{
      height: 100%;
      width:100%;
      };
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
</style>
