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
