<template>
  <div class="song-list clearfix">
    <PollyButton class="fr btn"></PollyButton>

    <!--表格开始 -->
    <ElTable
      :data="songList"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      :header-cell-style="{
        background: '#fafafa',
        border: 0,
        color: '#999',
      }"
      :cell-style="{ border: 0 }"
      class="customer-table shadow"
      tooltip-effect="light"
      v-loading="loading"
      @cell-mouse-enter="rowEnter"
      @cell-mouse-leave="rowLeave"
    >

      <!-- 列配置 -->
      <ElTableColumn
        prop="num"
        label="序号"
        width="80"
      >
        <template slot-scope="scope">

          <!-- 数字 -->
          <div style="text-align: center; cursor:pointer">{{scope.row.index}}</div>

        </template>
      </ElTableColumn>
      <ElTableColumn
        prop="name"
        label="歌曲"
      >
        <template slot-scope="scope">
          <span style="cursor:pointer">{{ scope.row.name }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn
        show-overflow-tooltip
        prop="name"
        label="歌手"
        width="180"
      >
        <template slot-scope="scope">
          <span
            style="cursor:pointer"
            v-for="(item,index) in scope.row.singerList"
            :key='index'
          >{{ item.name }}<span v-if="index != scope.row.singerList.length - 1">&nbsp;/&nbsp;</span>
          </span>
        </template>
      </ElTableColumn>
      <ElTableColumn
        show-overflow-tooltip
        prop="name"
        label="专辑"
        width="150"
      >
        <template slot-scope="scope">
          <span style="cursor:pointer">{{ scope.row.name }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn
        prop="duration"
        label="时长"
        width="70"
      >
        <template slot-scope="scope">
          <span style="cursor:pointer">{{ scope.row.duration }}</span>
        </template>
      </ElTableColumn>
    </ElTable>
    <!--表格结束 -->

  </div>
</template>

<script>
import PollyButton from "../pollybutton/PollyButton.vue";
export default {
  // component-name小写命名
  name: "song-list",
  // 组件
  components: {
    PollyButton,
  },
  props: {
    // 歌曲详情数组
    songList: {
      type: Array,
      default: []
    }
  },
  // 变量
  data() {
    return {
      loading: true,
      isCellMouseEnter: false
    };
  },
  // 方法
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 != 0) {
        return "bgc";
      } else {
        return "";
      }
    },
    tableHeaderClassName({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "warning-row";
      }
      return "warning-row";
    },
    rowEnter(row, column, cell, event) {
      const cellEle = event.target.parentNode.firstChild.getElementsByClassName("cell")[0].firstChild
      cellEle.innerHTML = ''
      cellEle.classList.add('icon-play')
      cellEle.classList.add('iconfont')
    },
    rowLeave(row, column, cell, event) {
      const cellEle = event.target.parentNode.firstChild.getElementsByClassName("cell")[0].firstChild
      cellEle.innerHTML = row.index
      cellEle.classList.remove('icon-play')
      cellEle.classList.remove('iconfont')
    }
  },
  // 计算属性
  computed: {},
  // 监控data中的数据变化
  watch: {
    songList: function (newVal, oldVal) {
      this.loading = false
    }
  },
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() { },
  // 生命周期 - 挂载完成(可以访问dom元素)
  mounted() {

    //用户无喜欢的歌曲，页面不会一直loading加载
    this.$on('noneLikedSong', function () {
      this.loading = false;
    })
  },
};
</script>

<style lang="less">
.el-table .bgc {
  background: #fafafa;
}

.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #e8e9ed !important;
  color: @color;
}

.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}
.el-table_1_column_1 {
  text-align: center !important;
}
.btn {
  margin-bottom: 20px;
  border-radius: 20px;
}
</style>
