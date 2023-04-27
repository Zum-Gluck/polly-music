<template>
  <div>vd</div>
</template>



<script>
export default {
  components: {},
  inject: ["reload"],
  data() {
    //这里存放数据
    return {};
  },
  methods: {},
  async activated() {
    let res;
    if (this.$route.params.id.length > 20)
      res = await this.$api.getVideoDetail(this.$route.params.id);
    else res = await this.$api.getMVDetail(this.$route.params.id);
    console.log("file: Vdetail.vue:19 @ res:", res.data);
  },
};
</script>



<style lang='less' scoped>
</style>