import * as types from './mutations.type'

export const actions = {
    // 选择播放
    selectPlay({ commit }, { song, songList, page }) {
        commit(types.SET_CURRENT_SONG, song)
        commit(types.SET_IS_PLAYING, true)
        commit(types.SET_SONG_PLAY_LIST, songList)
        commit(types.SET_IS_PAUSE, false)
        commit(types.SET_ORIGIN_PAGE, page)
    },

    // 音乐暂停
    songPause({ commit }) {
        commit(types.SET_IS_PAUSE, true)
    },

    // 播放全部
    allPlay({ commit }, songList) {
        commit(types.SET_CURRENT_SONG, songList[0])
        commit(types.SET_IS_PLAYING, true)
        commit(types.SET_SONG_PLAY_LIST, songList)
        commit(types.SET_IS_PAUSE, false)
    },

    // 播放历史音乐
    playHisroy({ commit, getters }, item) {
        item.index = getters.currentSong.index
        commit(types.SET_CURRENT_SONG, item)
    }
}