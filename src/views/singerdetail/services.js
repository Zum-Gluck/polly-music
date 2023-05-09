import { instance } from "@/api/instance"

/**
 * @method 调用此接口,传入歌手id,歌手信息
 * @param {require} id 
 */
export const getSingerDetail = id => instance.get(`/artist/detail?id=${id}`)

/**
 * @method 调用此接口,传入歌手id,可获取歌手粉丝数量
 * @param {require} id 
 */
export const getSingerFollowers = id => instance.get(`/artist/follow/count?id=${id}`)




/**
 * @method 调用此接口,传入歌手id,可获取歌手全部歌曲
 * @param {require} id 
 * @param {optional} order hot, time 按照热门或者时间排序
 * @param {optional} limit 取出歌单数量, 默认为 50
 * @param {optional} offset  偏移数量, 用于分页
 */
export const getSingerSongs = (id, order = 'hot', limit = 50, offset = 0) =>
    instance.get(`/artist/songs?id=${id}&order=${order}&limit=${limit}&offset=${offset}`)


/**
* @method 获取歌手热门单曲
* @params id 歌手 id
*/
export const getArtists = id => instance.get(`/artists?id=${id}`, {})


/**
 * @method 获取歌手专辑
 * @param {require} id 歌手id
 * @param {optional} limit 取出歌单数量, 默认为 50
 * @param {optional} offset  偏移数量, 用于分页
*/
export const getAlbum = (id, limit = 50, offset = 0) => instance.get(`/artist/album?id=${id}&limit=${limit}&offest=${offset}`)