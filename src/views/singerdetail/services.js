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
