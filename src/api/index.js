import * as home from './service/home'
import * as rank from './service/rank'
import * as songlist from './service/songlist'
import * as songmenu from './service/songmenu'
import * as profile from './service/profile'
import * as user from './service/user'

export default {
    ...home,
    ...rank,
    ...songmenu,
    ...songlist,
    ...profile,
    ...user
}