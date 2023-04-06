<template>
  <div class="home">
    <HomeFocus></HomeFocus>
    <HomeSongList></HomeSongList>
  </div>
</template>

<script>
import HomeFocus from './detail/HomeFocus.vue';
import HomeSongList from './detail/HomeSongList.vue'

export default {
  name: "home",
  components: {
    HomeFocus,
    HomeSongList
  },
  methods: {},
};
</script>