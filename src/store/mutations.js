import * as types from './mutations.type'


export const mutations = {
    // 设置登陆状态
    [types.SET_LOGIN_STATUS](state, status) {
        state.isLogin = status;
    },

    // 设置用户信息
    [types.SET_PROFILE](state, profile) {
        state.profile = profile;
    },

    // 设置当前播放的音乐detail
    [types.SET_CURRENT_SONG](state, url) {
        state.currentSong = url;
    },

    // 设置播放列表
    [types.SET_SONG_PLAY_LIST](state, list) {
        state.songPlayList = list;
    },

    // 设置是否开始播放音乐
    [types.SET_IS_PLAYING](state, flag) {
        state.isBegin = flag
    },

    // 设置音乐是否暂停
    [types.SET_IS_PAUSE](state, flag) {
        state.isPause = flag
    },

    //设置播放音乐的页面
    [types.SET_ORIGIN_PAGE](state, page) {
        state.originPage = page;
    }
}