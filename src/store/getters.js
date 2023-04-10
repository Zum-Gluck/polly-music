export const getters = {
    // 用户是否登陆
    isLogin: state => state.isLogin || JSON.parse(window.localStorage.getItem("isLogin")),
    // 用户信息
    profile: state => state.profile || JSON.parse(window.localStorage.getItem("profile")),
    // 当前播放音乐的detail
    currentSong: state => state.currentSong,
    // 当前播放列表
    songPlayList: state => state.songPlayList,
    // 是否播放音乐
    isBegin: state => state.isBegin,
    // 是否暂停
    isPause: state => state.isPause,
    // 播放音乐的页面
    originPage: state => state.originPage
}