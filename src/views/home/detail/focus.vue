<template>
  <div class="focus">
    <swiper
      class="swiper"
      :options="swiperOption"
      ref="mySwipers"
      @mouseenter.native="mouseEnter"
      @mouseleave.native="mouseLeave"
      v-if="isShowSwiper"
    >
      <swiper-slide v-for="item in imgData" :key="item.id">
        <img :src="item.imageUrl"/>
      </swiper-slide>
    </swiper>
    <div class="swiper-pagination" slot="pagination"></div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  // component-name小写命名
  name: "focus",
  // 组件
  components: {
    Swiper,
    SwiperSlide,
  },
  // 变量
  data() {
    return {
      // swiper配置
      swiperOption: {
        // 一组几张图
        slidesPerView: 3,
        // 间隔距离
        spaceBetween: 15,
        slidesPerGroup: 3,
        loop: true,
        loopFillGroupWithBlank: true,
        autoplay: {
          delay: 3000,
          pauseOnMouseEnter: true,
        },
        centeredSlides: true,
        paginationClickable: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
      // 图片数据
      imgData: [],
    };
  },
  // 方法
  methods: {
    // 获取轮播图数据
    async requestImg() {
      try {
        let res = await this.$api.getBanner();
        this.imgData = res.banners;
        let len = this.imgData.length;

        // this.imgData[len]的值 为第一张轮播图的展示图片
        this.imgData[len] = this.imgData[5];
      } catch (err) {
        console.log(err);
        this.$message({
          message: "轮播图加载失败",
          type: "error",
        });
      }
    },
    mouseEnter() {
      this.$refs.mySwipers.$swiper.autoplay.stop();
    },
    mouseLeave() {
      this.$refs.mySwipers.$swiper.autoplay.start();
    },
  },
  // 计算属性
  computed: {
    isShowSwiper() {
      return this.imgData.length;
    },
  },
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() {},
  // 生命周期 - 挂载完成(可以访问dom元素)
  mounted() {
    this.requestImg();
  },
};
</script>

<style lang="less">
.focus {
  position: relative;
  .swiper-slide {
    cursor: pointer;
  }
}
.swiper-slide-invisible-blank {
  display: none;
}
.swiper-pagination {
  width: 1200px;
  margin: 0 auto;
  .swiper-pagination-bullet {
    margin: 0 3px;
  }
}
.swiper-pagination-bullet-active {
  width: 15px;
  border-radius: 15px;
  background-color: #fa2800 !important;
}
</style>
