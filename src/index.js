import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import App from './App';
import * as serviceWorker from './serviceWorker';

import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

// url前缀
import { PUBLIC_URL } from '@config';
// 接口服务
import service from '@service';

// 日期国际化
moment.locale('zh-cn');

// 全局变量
React.$url = PUBLIC_URL;
React.$service = service;

// 超出指定行内容溢出，则显示省略号...
React.$ellipsis = (value, len) => {
    if( !value.trim() ) return '';
    return value.length >= len ? `${value.slice(0, len)}...` : value;
};

ReactDOM.render(
    <ConfigProvider locale={ zhCN }>
        <App />
    </ConfigProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
