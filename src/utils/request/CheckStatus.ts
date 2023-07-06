import { message } from 'antd';
import i18n from '@/lang';

/**
 * @description: 校验网络请求状态码
 * @param {number} status 状态码
 * @param {string | string[]} msg 错误提示信息
 */
export const checkStatus = (status: number, msg?: string | Array<string>): void => {
  let errMsg = ''; // 错误提示信息

  switch (status) {
    case 400:
      message.error(i18n.t('api.errMsg400'));
      break;
    case 401:
      message.error(i18n.t('api.errMsg401'));
      // TODO: 退出登录
      break;
    case 403:
      if (msg) {
        errMsg = typeof msg === 'string' ? msg : msg[0];
      }
      message.error(errMsg || i18n.t('api.errMsg403'));
      break;
    case 404:
      message.error(i18n.t('api.errMsg404'));
      break;
    case 405:
      message.error(i18n.t('api.errMsg405'));
      break;
    case 408:
      message.error(i18n.t('api.errMsg408'));
      break;
    case 500:
      message.error(i18n.t('api.errMsg500'));
      break;
    case 502:
      message.error(i18n.t('api.errMsg502'));
      break;
    case 503:
      message.error(i18n.t('api.errMsg503'));
      break;
    case 504:
      message.error(i18n.t('api.errMsg504'));
      break;
    default:
      if (msg) {
        errMsg = typeof msg === 'string' ? msg : msg[0];
      }
      message.error(i18n.t(errMsg || 'api.errMsgdefault'));
  }
};
