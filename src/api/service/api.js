import { instance } from "./instance";

/**
 * @param {optional} type:资源类型,对应以下类型,默认为 0 即 PC 
 * @method 获取推荐推荐歌单（轮播图）
 */
export const getBanner = type => instance.get(`/banner?type=${type ? type : 0}`);

/**
 * @param {require} limit 取出数量 , 默认为 30 (不支持 offset)
 * @method 获取推荐新音乐
 */
export const getNewSong = limit => instance.get(`/personalized/newsong?limit=${limit ? limit : 30}`);


/**
 * @param {require} uid 
 * @method 获取用户喜欢的音乐
 */
export const getUserLikeList = uid => instance.get(`/likelist?uid=${uid}`)


/**
 * 
 * @param {require} ids 音乐 id, 如 ids=347230
 * @method 获取音乐详情
 */
export const getSongDetail = ids => instance.get(`/song/detail?ids=${ids}`)


/**
 * @param {require} id 音乐id
 * @method 获取VIP音乐的URL 
 */
export const getSongUrl = id => instance.get(`/song/url?id=${id}`)


/**
 * @param {optional} limit 获取数量
 * @method 获取推荐歌单
 */
export const getRecommendSongList = limit => instance.get(`/personalized?limit=${limit}`)



/**
 * @param {optional} limit 获取数量
 * @method 获取推荐歌单
 */
export const getRecommendNewSong = limit => instance.get(`/personalized/newsong?limit=${limit}`)


/**
 * @param {require} id 歌单id
 * @method 获取歌单详情
 */
 export const getSongMenu = id=> instance.get(`/playlist/detail?id=${id}`)