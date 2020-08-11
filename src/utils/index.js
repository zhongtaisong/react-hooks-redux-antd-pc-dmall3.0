// icon
// export { default as IconFont } from './iconFont';
// // 双向绑定
// export { default as formUtils } from './formUtils';
// // 跳转路由页面滚动至顶部
// export { default as ScrollToTop } from './scrollToTop';
// // base64转文件
// export { default as base64ToFile } from './base64ToFile';
// // session
// export { default as session } from './session';

// 全局loading
export { default as loading } from './loading';

// 手机号码 - 校验
export const validatePhone = (rule, value) => {
    let reg = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
    if ( !reg.test( value ) ) {
        return Promise.reject('请输入合法的手机号码！');
    }
    return Promise.resolve();
};

// 超出指定行内容溢出，则显示省略号...
export const $ellipsis = (value, len) => {
    if( !value.trim() ) return '';
    return value.length >= len ? `${value.slice(0, len)}...` : value;
};