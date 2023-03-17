import * as types from './mutations.type'


export const mutations = {
    // 设置登陆状态
    [types.SET_LOGIN_STATUS](state, status) {
        state.isLogin = status;
    },

    // 设置用户信息
    [types.SET_PROFILE](state, profile) {
        state.profile = profile;
    }
}