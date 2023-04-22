/**
 * @file rank页面用到的接口
 */

import { instance } from "./instance";

/* 
* @method 获取所有榜单
 */
export const topList = () =>
    instance.get(`/toplist`);