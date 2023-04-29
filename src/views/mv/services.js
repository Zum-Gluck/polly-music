/**
 * @file MV页面用到的接口
 */
import { instance } from "../../api/instance";

/**
 * @param {optional} area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
 * @param {optional} type: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
 * @param {optional} order: 排序,可选值为上升最快,最热,最新,不填则为上升最快
 * @param {optional} limit: 取出数量 , 默认为8
 * @param {optional} offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
 * @method 获取全部视频
 */
export const getMVList = (
  area = "全部",
  offset = 0,
  type = "全部",
  order = "上升最快",
  limit = 8
) =>
  instance.get(
    `/mv/all?area=${area}&offset=${offset}&type=${type}&order=${order}&limit=${limit}`
  );
