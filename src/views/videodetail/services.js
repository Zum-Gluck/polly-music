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
