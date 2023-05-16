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
      <swiper-slide
        v-for="item in imgData"
        :key="item.id"
      >

        <img
          :src="item.imageUrl"
          :targetType="item.targetType"
          :targetId="item.targetId"
          :url="item.url"
        />
        <div class="type_title">{{item.typeTitle}}</div>
      </swiper-slide>
    </swiper>
    <div
      class="swiper-pagination"
      slot="pagination"
    ></div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import { mapActions } from 'vuex';
import { createSong } from '@/model/song';

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
        on: {
          // 轮播图点击事件
          click: async (e) => { // 在此处实现相关业务逻辑
            let targetType = e.target.getAttribute('targetType') // 获取自定义属性
            let targetId = e.target.getAttribute('targetId') // 获取自定义属性

            switch (Number(targetType)) {
              // 歌曲
              case 1:
                const res = await this.$api.getSongDetail(targetId)
                const song = createSong(res.songs[0]);
                song.index = 1;
                this.selectPlay({
                  song: song,
                  songList: [song]
                })
                break;

              // 专辑
              case 10:
                this.$router.push(`/album-detail/${targetId}`);
                break;

              // 歌单
              case 1000:
                this.$router.push(`/songmenu/${targetId}`);
                break;

              // 数字专辑
              case 3000:
                let url = e.target.getAttribute('url')
                //打开新标签
                window.open(url, '_blank');
                break;

              default:
                this.$message({
                  type: 'info',
                  message: '当前功能未完善'
                })
                break;
            }


          },
        },
      },
      // 图片数据
      imgData: [],
    };
  },
  // 方法
  methods: {
    ...mapActions(['selectPlay']),
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
  created() { },
  // 生命周期 - 挂载完成(可以访问dom元素)
  mounted() {
    this.requestImg();
  },
};
</script>

<style lang="less" scoped>
.focus {
  .type_title {
    position: absolute;
    right: 0px;
    bottom: 3px;
    width: 80px;
    height: 20px;
    color: #fff;
    line-height: 20px;
    text-align: center;
    background-color: #bd534f;
    border-radius: 4px;
  }
}
</style>
