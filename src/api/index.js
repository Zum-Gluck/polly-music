import * as home from "@/views/home/services";
import * as rank from "@/views/rank/services";
import * as songlist from "@/views/songlist/services";
import * as songmenu from "@/views/songmenu/services";
import * as profile from "@/views/profile/services";
import * as user from "@/views/login/services";
import * as singer from "@/views/singer/services";
import * as videopage from "@/views/videopage/services";
import * as videodetail from "@/views/videodetail/services";
import * as mv from "@/views/mv/services";
import * as album from '@/views/albumdetail/services'
import * as singerdetail from '@/views/singerdetail/services'


export default {
  ...home,
  ...rank,
  ...songmenu,
  ...songlist,
  ...profile,
  ...user,
  ...singer,
  ...videopage,
  ...videodetail,
  ...mv,
  ...album,
  ...singerdetail
};