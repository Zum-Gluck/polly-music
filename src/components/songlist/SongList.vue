<template>
  <div class="song-list clearfix">
    <PollyButton class="fr btn"></PollyButton>
    <ElTable
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      :header-cell-style="{
        background: '#fafafa',
        border: 0,
        color: '#999',
      }"
      :cell-style="{ border: 0 }"
      class="customer-table shadow"
    >
      <ElTableColumn prop="num" label="序号" width="80">
        <template slot-scope="scope">
          <div style="text-align: center">{{ +scope.row.num }}</div>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="name" label="歌曲">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="address" label="歌手" width="180"> </ElTableColumn>
      <ElTableColumn prop="name" label="专辑" width="150"> </ElTableColumn>
      <ElTableColumn prop="name" label="时长" width="70"> </ElTableColumn>
    </ElTable>
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
  // 变量
  data() {
    return {
      tableData: [
        {
          num: "01",
          name: "Opps",
          province: "上海",
          city: "普陀区",
          address: "上海市普",
          zip: 200333,
        },
          {
          num: "01",
          name: "Opps",
          province: "上海",
          city: "普陀区",
          address: "上海市普",
          zip: 200333,
        },
          {
          num: "01",
          name: "Opps",
          province: "上海",
          city: "普陀区",
          address: "上海市普",
          zip: 200333,
        },
      ],
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
  },
  // 计算属性
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() {},
  // 生命周期 - 挂载完成(可以访问dom元素)
  mounted() {},
};
</script>

<style lang="less">
.el-table .bgc {
  background: #fafafa;
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
