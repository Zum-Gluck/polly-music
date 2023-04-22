/**
 * @file home页面用到的接口
 */
import { instance } from "./instance";


/**
 * @param {optional} type:资源类型,对应以下类型,默认为 0 即 PC
 * @method 获取推荐推荐歌单（轮播图）
 */
export const getBanner = (type) =>
    instance.get(`/banner?type=${type ? type : 0}`);

/**
 * @param {require} limit 取出数量 , 默认为 30 (不支持 offset)
 * @method 获取推荐新音乐
 */
export const getNewSong = (limit) =>
    instance.get(`/personalized/newsong?limit=${limit ? limit : 30}`);

/**
* @param {optional} limit 获取数量
* @method 获取推荐歌单
*/
export const getRecommendSongList = (limit) =>
    instance.get(`/personalized?limit=${limit}`);


/**
 * @param {optional} limit 获取数量
 * @method 获取推荐新歌曲
 */
export const getRecommendNewSong = (limit) =>
    instance.get(`/personalized/newsong?limit=${limit}`);


/**
* @param {optional} limit 数量
* @param {optional} offset 偏移数量 , 用于分页
* @method 获取推荐歌手
*/
export const HotSinger = (limit = 30, offset = 0) => instance.get(`/top/artists?limit=${limit}&offset=${offset}`);
