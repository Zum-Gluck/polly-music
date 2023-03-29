import * as types from './mutations.type'

export const actions = {
    // 选择播放
    selectPlay({ commit }, { song, songList }) {
        commit(types.SET_CURRENT_SONG, song)
        commit(types.SET_IS_PLAYING, true)
        commit(types.SET_SONG_PLAY_LIST, songList)
        commit(types.SET_IS_PAUSE, false)
    },

    // 播放全部
    allPlay({ commit }, songList) {
        commit(types.SET_CURRENT_SONG, songList[0])
        commit(types.SET_IS_PLAYING, true)
        commit(types.SET_SONG_PLAY_LIST, songList)
        commit(types.SET_IS_PAUSE, false)
    }
}