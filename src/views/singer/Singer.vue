<template>
  <div class="wrapper">
    <div class="filter">
      <ul class="filter_type">
        <li
          :class="{
            filter_type_item: true,
            'filter_type_item-active': index === areaArrActiveIndex,
          }"
          v-for="(item, index) of areaArr"
          :key="item.value"
          @click="() => changeFilter('area', item.value, index)"
        >
          {{ item.label }}
        </li>
      </ul>
      <ul class="filter_type filter_type_singer">
        <li
          :class="{
            filter_type_item: true,
            'filter_type_item-active': index === singerArrActiveIndex,
          }"
          v-for="(item, index) of singerArr"
          :key="item.value"
          @click="() => changeFilter('singer', item.value, index)"
        >
          {{ item.label }}
        </li>
      </ul>
      <ul class="filter_type filter_type_name">
        <li
          :class="{
            filter_type_item: true,
            'filter_type_item-active': index === alphaArrayActiveIndex,
          }"
          v-for="(item, index) of alphaArray"
          :key="item.value"
          @click="() => changeFilter('alpha', item.value, index)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
    <div
      class="content"
      v-loading="isLoading"
    >
      <div
        class="content_item"
        v-for="item of singerList"
        :key="item.id"
      >
        <SingerCover :singer="item" />
      </div>
    </div>
  </div>
</template>

<script>
import { areaArr, singerArr, alphaArray } from './constant'
import SingerCover from '@/components/singercover/SingerCover.vue';

export default {
  // component-name小写命名
  name: "singer",
  // 组件
  components: { SingerCover },
  // 变量
  data() {
    return {
      areaArr,
      areaArrActiveIndex: 0,
      singerArr,
      singerArrActiveIndex: 0,
      alphaArray,
      alphaArrayActiveIndex: 0,
      queryParams: {
        // 返回数量
        limit: 40,
        // 偏移数量
        offset: 0,
        // 分类
        type: -1,
        // 地区
        area: -1,
        // 字母A_Z
        initial: -1
      },
      singerList: [],
      isLoading: true
    };
  },
  // 方法
  methods: {
    // 获取歌手列表
    async getSingerList() {
      const res = await this.$api.getSingerList(this.queryParams);
      this.singerList = res.artists
      this.isLoading = false
    },
    // 改变筛选项
    changeFilter(type, val, index) {
      this.isLoading = true
      if (type === 'area') {
        this.areaArrActiveIndex = index;
        this.queryParams.area = val;
      } else if (type === 'singer') {
        this.singerArrActiveIndex = index;
        this.queryParams.type = val;
      } else {
        this.alphaArrayActiveIndex = index;
        this.queryParams.initial = val;
      }
      this.queryParams.offset = 0
      this.singerList = []
      this.getSingerList()
    }
  },
  // 计算属性
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() { },
  // 生命周期 - 挂载完成(可以访问dom元素)
  mounted() {
    this.getSingerList()
  },
};
</script>

<style lang="less" scoped>
.filter_type {
  display: flex;
  margin-bottom: 20px;
  &_item {
    width: 56px;
    height: 28px;
    line-height: 29px;
    font-size: 13px;
    text-align: center;
    cursor: pointer;
    margin-right: 6px;
    &-active {
      background: #fa2800;
      font-weight: 700;
      color: #fff;
      border-radius: 14px;
    }
  }
  &_singer {
    .filter_type_item {
      width: auto;
      padding: 0 15px;
    }
  }
  &_name {
    margin-bottom: 0;
    .filter_type_item {
      width: 28px;
      margin-right: 12px;
      border-radius: 50%;
      &:first-child {
        width: 56px;
        border-radius: 14px;
      }
    }
  }
}
.content {
  margin: 30px -15px 0 -15px;
  display: flex;
  flex-wrap: wrap;
  &_item {
    flex-basis: 120px;
    margin-bottom: 25px;
  }
}
</style>
