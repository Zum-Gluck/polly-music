import { instance } from "./instance";


/**
 * @param {reqire} phone 手机号
 * @param {optional} ctcode 国家码 China is default : +86
 * @method 发送验证码
 */
export const sendCaptcha = phone => instance.get(`/captcha/sent?phone=${phone}`);

/**
 * @param {require} phone 
 * @param {require} captcha 
 * @method 验证验证码
 */
export const verifyCaptcha = ({ phone, captcha }) => instance.get(`/captcha/verify?phone=${phone}&captcha=${captcha}`);

/**
 * @method 获取登陆状态
 */
export const getLoginStatus = () => instance.get(`/login/status`);

/**
 * @param {require} uid 用户id
 * @method 获取用户详细 
 */
export const getUserDetail = uid => instance.get(`/user/detail?uid=${uid}`);

/**
 * @method 刷新登录状态,返回内容包含新的cookie 
 */
export const loginRefresh = () => instance.get(`/login/refresh`);

/**
 * @method 退出登陆
 */
export const loginOut = () => instance.get(`/logout`);

/**
 * @method 调用此接口可生成一个key
 */
export const getKey = () => instance.get(`/login/qr/key?timestamp=${Number(new Date())}`);

/**
 * @param {require} key 由上第一个接口生成
 * @param {optional} qrimg 传入后会额外返回二维码图片 base64 编码
 * @method 传入上一个接口生成的key可生成二维码图片的base64和二维码信息,可使用base64展示图片
 */
export const getQrCode = key => instance.get(`/login/qr/create?key=${key}&qrimg=1&timestamp=${Number(new Date())}`);

/**
 * @param {require} key 由上第一个接口生成
 * @method 传入第一个接口生成的key检查二维码的状态
 */
export const checkQrStatus = key => instance.get(`/login/qr/check?key=${key}&timestamp=${Number(new Date())}`);


/**
 * @method 登录后调用此接口,可以获取用户等级信息,包含当前登录天数,听歌次数,下一等级需要的登录天数和听歌次数,当前等级进度息
 */
export const getUserLevel = () => instance.get(`/user/level`);


export const getUserLikedSongList = uid => instance.get(`/user/playlist?uid=${uid}`);

