import { instance } from "../../api/instance";

/**
 * @method 歌手分类列表
 * @params type -1:全部 1:男歌手 2:女歌手 3:乐队
*  @params area -1:全部 7华语 96欧美 8:日本 16韩国 0:其他
 * @params limit 返回数量 , 默认为30
 * @params offset 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @params initial 按首字母索引查找参数, 如 /artist/list?type=1&area=96&initial=b 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传0
 */
export const getSingerList = params => instance.get(`/artist/list`, { params })