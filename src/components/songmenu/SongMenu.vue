<template>
  <div>
    <el-card>
      <div class="detail_header"><h1>
        {{ this.playlist.name }}
      </h1></div>
    </el-card>
  </div>
</template>

<script>
import SongList from '../songlist/SongList.vue';
import PollyButton from '../pollybutton/PollyButton.vue';

export default {
  data() {
    return {
      playlist: {},
    };
  },
  async mounted() {
    console.log(this.$route.params.id);
    let res = await this.$api.getSongMenu(this.$route.params.id);
    this.playlist = res.playlist;
    console.log( this.playlist)
  },

  methods: {},

  computed: {},
};
</script>


<style lang="less" scoped>
</style>