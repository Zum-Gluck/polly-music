import {instance} from '@/api/instance.js'

/** 
*
* @param {require} id 专辑id
* 
* @method 获取专辑详情
*/
export const getAlbum=(id)=>instance.get(`/album?id=${id}`)

/** 
* 获取歌手相关专辑
* params: id 
* @param {require} id 专辑id
* @param {optional} limit 数量
*/
export const getRelateAlbum=(id,limit=8)=>instance.get(`/artist/album?id=${id}&limit=${limit}`)

/**
 * @param {require} id 专辑id
 * @param {optional} limit 数量
 * @method 获取歌单评论
 */
export const getAlbumComment = (id, limit = 8) =>
    instance.get(`/comment/album?id=${id}&limit=${limit}`);

/**
 * @param {require} id 专辑id
 * @param {require} t  1 为收藏，其他为取消收藏
 * @method 收藏/取消收藏专辑
 */
export const ToSub=(id,t)=>
   instance.get(`/album/sub?t=${t}&id=${id}`);

/**
 * @param {require} id 专辑id
 * @method 专辑动态信息
 */
export const getDynamic=(id)=>
       instance.get(`/album/detail/dynamic?id=${id}`)