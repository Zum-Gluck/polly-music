/**
 * @file songmenu页面用到的接口
 */
import { instance } from "../../api/instance";


/**
 * @param {require} id 歌单id
 * @method 获取歌单详情
 */
export const getSongMenu = (id) => instance.get(`/playlist/detail?id=${id}`);

/**
 * @param {require} id 歌单id
 * @param {optional} limit 数量
 * @param {optional} offset 偏移量
 * @method 获取歌单歌曲
 */
export const getSongMenuList = (id, limit = 10, offset = 0) =>
    instance.get(`/playlist/track/all?id=${id}&limit=${limit}&offset=${offset}`);

/**
 * @param {require} id 歌单id
 * @param {optional} limit 数量
 * @method 获取歌单收藏者
 */
export const getSongMenuSubscribe = (id, limit = 28) =>
    instance.get(`/playlist/subscribers?id=${id}&limit=${limit}`);

/**
 * @param {require} id 歌单id
 * @method 获取歌单相关推荐
 */
export const getSongMenuRelated = (id) =>
    instance.get(`/related/playlist?id=${id}`);

/**
 * @param {require} id 歌单id
 * @param {optional} limit 数量
 * @method 获取歌单评论
 */
export const getSongMenuComment = (id, limit = 8) =>
    instance.get(`/comment/playlist?id=${id}&limit=${limit}`);