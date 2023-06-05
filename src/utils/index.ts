/**
 * @description: 通过时间返回对应的欢迎语
 * @return {string} 欢迎语
 */
export const getTimeStateStr = (): string => {
  const timeNow = new Date();
  const hours = timeNow.getHours();
  // 判断当前时间段
  if (hours >= 6 && hours <= 10) {
    return '早上好';
  } else if (hours >= 10 && hours <= 14) {
    return '中午好';
  } else if (hours >= 14 && hours <= 18) {
    return '下午好';
  } else {
    return '晚上好';
  }
};

/**
 * 欢迎语
 */
export const welcome = () => {
  const arr = [
    '加油努力工作',
    '喝一杯咖啡吧',
    '休息一会儿吧',
    '准备吃什么呢',
    '要不要站起来活动一下',
  ];
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

/**
 * @description 生成随机数
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @return {number} 随机数
 */
export const randomNum = (min: number, max: number): number => {
  const num = Math.floor(Math.random() * (min - max) + max);
  return num;
};

/**
 * @description 获取浏览器默认语言
 * @return {string} 浏览器语言
 */
export const getBrowserLang = (): string => {
  const browserLang = navigator.language;
  let defaultBrowserLang = '';
  if (
    browserLang.toLowerCase() === 'cn' ||
    browserLang.toLowerCase() === 'zh' ||
    browserLang.toLowerCase() === 'zh-cn'
  ) {
    defaultBrowserLang = 'zhCn';
  } else {
    defaultBrowserLang = 'en';
  }
  return defaultBrowserLang;
};
