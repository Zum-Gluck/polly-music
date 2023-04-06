<template>
  <div class="home">
    <HomeFocus></HomeFocus>
    <HomeSongList></HomeSongList>
    <HomeNewSong></HomeNewSong>
  </div>
</template>

<script>
import HomeFocus from './detail/HomeFocus.vue';
import HomeSongList from './detail/HomeSongList.vue'
import HomeNewSong from './detail/HomeNewSong.vue'

export default {
  name: "home",
  components: {
    HomeFocus,
    HomeSongList,
    HomeNewSong
  },
  methods: {},
  activated(){
    this.$notify.closeAll()
  }
};
</script>