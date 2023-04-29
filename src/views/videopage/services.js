import {instance} from "@/api/instance"
/*
* 
* 获取视频标签列表
*/
export const groupList=()=>
    instance.get(`/video/group/list`);
/*
 *
 *获取视频分类列表
 */
export const category_list=()=>
instance.get(`/video/category/list`);

/*
* 
*获取视频标签下的视频
*paramas :id (必选)
*paramas :offset (可选,默认0)
*/
export const getVideo=(id,offset=0)=>
   instance.get(`/video/group?id=${id}&offset=${offset}`)
