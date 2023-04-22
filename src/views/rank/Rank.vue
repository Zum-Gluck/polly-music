<template>
  <div>
      <div class="home_song_list">
    <h2>云音乐特色榜单</h2>
    <ul>
      <li
        v-for="fea in feature"
        :key="fea.id
      "
      >
        <ListCover
          size="125px"
          :songListItem="fea"
        ></ListCover>
      </li>
    </ul>
  </div>
      <div class="home_song_list">
    <h2>全球榜单</h2>
    <ul>
      <li
        v-for="glo of globalTop"
        :key="glo.id
      "
      >
        <ListCover
          size="125px"
          :songListItem="glo"
        ></ListCover>
      </li>
    </ul>
  </div>

  </div>
</template>

<script>
import ListCover from '@/components/listcover/ListCover.vue';
export default {
  name: "rank",
  components: {
    ListCover
  },
  data() {
    return {
      tests:[],
      feature:[],
      globalTop:[]
    };
  },
  methods: {
    /*
    *获取榜单信息

    */
   async GetToplist(){
    let list= await this.$api.topList()
    this.tests=list.list
    this.feature=this.tests.filter(function(test){
        if(test.name==="飙升榜"||test.name==="新歌榜"||test.name==="原创榜"||test.name=="热歌榜")
        return test
    })
    this.globalTop=this.tests.filter(function(test){
      if(test.name==="飙升榜"||test.name==="新歌榜"||test.name==="原创榜"||test.name=="热歌榜")
        {}
        else
        {
          return test
        }
    })
   }
  },
  computed: {},
  created() {
    this.GetToplist()
  },
};
</script>

<style lang="less" scoped>
.home_song_list {
  margin-top: 30px;

  ul {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    margin-top: 20px;

    li {
      margin-right: 17px;
    }

    & li:nth-child(8n) {
      margin-right: 0;
    }
  }
}
</style>
