<template>
  <div class="play_history shadow">
    <div
      class="close"
      @click.stop="$emit('closeClick')"
    >
      <span class="iconfont icon-guanbi"></span>
    </div>
    <div class="title clearfix">
      <h2 class="fl">播放历史</h2>

      <div
        class="remove fr"
        @click="clearClick"
      >
        <span class="iconfont icon-shanchu"></span>
      </div>
    </div>

    <!-- playList start -->
    <ul>
      <li
        v-for="(item,index) of hisList"
        :key="item.id"
        @dblclick="itemClick(item)"
        :class="{'isActive': currentSongName === item.name}"
      >
        <span> {{index + 1}}</span>
        <span> {{item.name}}</span>
      </li>
    </ul>
    <!-- playList end -->
  </div>
</template>

<script>
import PollyCard from '@/components/pollycard/PollyCard.vue';
import { mapActions } from 'vuex';
import { clearHistory } from '@/common/cache';

export default {
  // component-name小写命名
  name: "play-history",
  props: {
    hisList: {
      type: Array,
      default: []
    }
  },
  // 组件
  components: {
    PollyCard
  },
  // 变量
  data() {
    return {
    };
  },
  // 方法
  methods: {
    ...mapActions(['playHisroy']),
    // 歌曲点击
    itemClick(item) {
      this.playHisroy(item)
    },
    // 清除播放历史
    clearClick() {
      clearHistory()
      this.$emit('clearHisList')
    }
  },
  // 计算属性
  computed: {
    currentSongName() {
      return this.$store.getters.currentSong.name
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() { },
  // 生命周期 - 挂载完成(可以访问dom元素)
  mounted() {
  },
};
</script>

<style lang="less" scoped>
.isActive {
  color: @color;
}
.play_history {
  position: absolute;
  top: -500px;
  left: -251px;
  width: 350px;
  height: 460px;
  padding: 40px 30px 0;
  border-radius: 8px;

  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    &:hover {
      color: @color;
    }
  }

  .title {
    .remove span {
      font-size: 20px !important;
      cursor: pointer;
      &:hover {
        color: @color;
      }
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    height: 370px;
    overflow: auto;
    overflow-x: hidden;

    li {
      flex-shrink: 0;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

      & span:first-child {
        margin-right: 20px;
      }

      //  & span:last-child {
      //   margin-right: 20px;
      // }

      &:hover {
        color: @color;
      }
    }
  }
}
</style>
