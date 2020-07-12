import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
// 首页 - 轮播图
import Carousel from './components/carousel';
// // 本周热门
// import HotThisWeek from './components/HotThisWeek';

// // 本周热门 - 数据
// import hotThisWeekState from './components/HotThisWeek/state';
// const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default () => {
    return (
        <div className='dm_home'>
            <Carousel />
            {/* <HotThisWeek {...this.props} /> */}
        </div>
    );
};