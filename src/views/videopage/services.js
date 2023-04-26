/**
 * @file videopage页面用到的接口
 */
import { instance } from "../../api/instance";

/**
 * @method 获取视频标签
 */
export const getVideoTag = () => instance.get(`/video/group/list`);

/**
 * @method 获取视频分类
 */
export const getVideoCategory = () => instance.get(`/video/category/list`);

/**
 * @param {optional} offset 偏移量
 * @method 获取全部视频
 */
export const getVideoList = (offset = 0) =>
  instance.get(`/video/timeline/all?offset=${offset}`);

/**
 *  @param {require} id 标签id
 * @param {optional} offset 偏移量
 * @method 获取分类/标签视频
 */
export const getTagVideoList = (id, offset = 0) =>
  instance.get(`/video/group?id=${id}&offset=${offset}`);
