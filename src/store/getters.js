export const getters = {
    // 用户是否登陆
    isLogin: state => state.isLogin || JSON.parse(window.localStorage.getItem("isLogin")),
    // 用户信息
    profile: state => state.profile || JSON.parse(window.localStorage.getItem("profile")),
}