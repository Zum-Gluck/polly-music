import { instance } from "./instance";

/**
 * @method 获取推荐推荐歌单（轮播图）
 * @param {*} type:资源类型,对应以下类型,默认为 0 即 PC 
 * 
 */
export const getBanner = type => instance.get(`/banner`);

/**
 * @method 获取推荐新音乐
 * @param {*} limit 
 */
export const getNewSong = limit => instance.get(`/personalized/newsong?limit=${limit}`);


