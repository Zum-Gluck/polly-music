<template>
  <div class="home">
    <HomeFocus></HomeFocus>
    <HomeSongList></HomeSongList>
    <HomeNewSong></HomeNewSong>
    <HomeSinger></HomeSinger>
  </div>
</template>

<script>
import HomeFocus from './detail/HomeFocus.vue';
import HomeSongList from './detail/HomeSongList.vue'
import HomeNewSong from './detail/HomeNewSong.vue'
import HomeSinger from './detail/HomeSinger.vue';

export default {
  name: "home",
  components: {
    HomeFocus,
    HomeSongList,
    HomeNewSong,
    HomeSinger
  },
  methods: {},
};
</script>