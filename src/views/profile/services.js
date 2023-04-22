/**
 * @file profile页面用到的接口
 */
import { instance } from "../../api/instance";

/**
 * @param {require} uid
 * @method 获取用户喜欢的音乐
 */
export const getUserLikeList = (uid) =>
    instance.get(`/likelist?uid=${uid}&timestamp=${Number(new Date())}`);


/**
 *
 * @param {require} ids 音乐 id, 如 ids=347230
 * @method 获取音乐详情
 */
export const getSongDetail = (ids) => instance.get(`/song/detail?ids=${ids}`);


/**
 * @param {require} id 音乐id
 * @method 获取VIP音乐的URL
 */
export const getSongUrl = (id) => instance.get(`/song/url?id=${id}`);


/**
 * @param {require} uid
 * @param {optional} type type=1 时只返回 weekData, type=0 时返回 allData
 * @method 获取用户播放记录
 */
export const getUserRecord = (uid, type = 1) =>
    instance.get(`/user/record?uid=${uid}&type=${type}`);


/**
 * @param {require} id 歌单id
 * @param {optional} t 1收藏,2取消收藏
 * @method 收藏歌单
 */
export const Subscribe = (id, t = 1) =>
    instance.get(`/playlist/subscribe?t=${t}&id=${id}`);
