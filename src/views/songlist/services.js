/**
 * @file songlist页面用到的接口
 */

import { instance } from "../../api/instance";


/**
 * @method 歌单分类
 */
export const SongListCategory = () => instance.get(`/playlist/catlist`);



/**
 * @method 热门歌单分类
 */
export const SongListHot = () => instance.get(`/playlist/hot`);

/**
 * @param {optional} limit 数量
 * @param {optional} order 最新或热门
 * @param {optional} cat 标签
 * @param {optional} offset 偏移数量 , 用于分页
 * @method 收藏歌单
 */
export const NewHot = (limit = 50, order , cat = "全部", offset = 0) =>
    instance.get(
        `/top/playlist?limit=${limit}&order=${order}&cat=${cat}&offset=${offset}`
    );
