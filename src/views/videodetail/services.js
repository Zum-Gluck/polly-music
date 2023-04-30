/**
 * @file videopage页面用到的接口
 */
import { instance } from "../../api/instance";

/**
 *  @param {require} id 视频vid
 * @method 视频详情
 */
export const getVideoDetail = (id) => instance.get(`/video/detail?id=${id}`);

/**
 *  @param {require} id MV id
 * @method MV详情
 */
export const getMVDetail = (id) => instance.get(`/mv/detail?mvid=${id}`);

/**
 *  @param {require} id MV id
 * @method MV播放地址
 */
export const getMVPlay = (id) => instance.get(`/mv/url?id=${id}`);

/**
 *  @param {require} id 视频 id
 * @method 视频播放地址
 */
export const getVideoPlay = (id) => instance.get(`/video/url?id=${id}`);

/**
 *  @param {require} id 视频 id
 * @method 获取相关视频
 */
export const getRelatedVideo = (id) =>
  instance.get(`/related/allvideo?id=${id}`);

/**
 *  @param {require} id mv id
 * @method 获取相关mv
 */
export const getRelatedMV = (id) => instance.get(`/simi/mv?mvid=${id}`);

/**
 * @param {require} id 视频 id
 * @param {optional} limit  数量
 * @param {optional} offset   偏移量
 * @method 获取视频评论
 */
export const getVideoComments = (id, limit = 20, offset = 0) =>
  instance.get(`/comment/video?id=${id}&limit=${limit}&offset=${offset}`);

/**
 * @param {require} id mv id
 * @param {optional} limit  数量
 * @param {optional} offset   偏移量
 * @method 获取mv评论
 */
export const getMvComments = (id, limit = 20, offset = 0) =>
  instance.get(`/comment/mv?id=${id}&limit=${limit}&offset=${offset}`);

/**
 *  @param {require} id mv id
 * @method  mv点赞转发评论数数据
 */
export const getMVinfo = (id) => instance.get(`/mv/detail/info?mvid=${id}`);

/**
 * @param {require} t  操作
 * @param {require} id   视频id
 * @method 给视频点赞
 */
export const praisingVideo = (id, t) =>
  instance.get(`/resource/like?t=${t}&type=5&id=${id}`);

/**
 * @param {require} t  操作
 * @param {require} id   mvid
 * @method 给mv点赞
 */
export const praisingMV = (id, t) =>
  instance.get(`/resource/like?t=${t}&type=1&id=${id}`);

/**
 * @param {require} t  操作
 * @param {require} id   mvid
 * @method 收藏mv
 */
export const subscribeMV = (id, t) => instance.get(`/mv/sub?t=${t}&mvid=${id}`);

/**
 * @param {require} t  操作
 * @param {require} id   视频id
 * @method 收藏视频
 */
export const subscribeVideo = (id, t) =>
  instance.get(`/video/sub?t=${t}&id=${id}`);

/**
 * @param {require} t  操作
 * @param {require} id   视频id
 * @param {require} cid   评论id
 * @method 给视频评论点赞
 */
export const praisingVideoComments = (id, cid, t) =>
  instance.get(`/comment/like?id=${id}&cid=${cid}&t=${t}&type=5`);

/**
 * @param {require} t  操作
 * @param {require} id   mvid
 * @param {require} cid   评论id
 * @method 给mv评论点赞
 */
export const praisingMVComments = (id, cid, t) =>
  instance.get(`/comment/like?id=${id}&cid=${cid}&t=${t}&type=1`);

/**
 * @param {require} id   视频id
 * @param {require} content   评论内容
 * @method 发布视频评论
 */
export const publishVideoComments = (id, content) =>
  instance.get(`/comment?t=1&type=5&id=${id}&content=${content}`);

/**
 * @param {require} id   mvid
 * @param {require} content   评论内容
 * @method 发布MV评论
 */
export const publishMVComments = (id, content) =>
  instance.get(`/comment?t=1&type=1&id=${id}&content=${content}`);

/**
 * @param {require} id   视频id
 * @param {require} cid   评论id
 * @method 删除视频评论
 */
export const deleteVideoComments = (id, cid) =>
  instance.get(`/comment?t=0&type=5&id=${id}&commentId=${cid}`);

/**
 * @param {require} id   mvid
 * @param {require} cid   评论id
 * @method 删除mv评论
 */
export const deleteMVComments = (id, cid) =>
  instance.get(`/comment?t=0&type=1&id=${id}&commentId=${cid}`);

/**
 * @param {require} id   视频id
 * @param {require} cid   评论id
 * @param {require} content   评论内容
 * @method 回复视频评论
 */
export const replayVideoComments = (id, cid, content) =>
  instance.get(
    `/comment?t=2&type=5&id=${id}&commentId=${cid}&content=${content}`
  );

/**
 * @param {require} id   mvid
 * @param {require} cid   评论id
 * @param {require} content   评论内容
 * @method 回复mv评论
 */
export const replayMVComments = (id, cid, content) =>
  instance.get(
    `/comment?t=2&type=1&id=${id}&commentId=${cid}&content=${content}`
  );
