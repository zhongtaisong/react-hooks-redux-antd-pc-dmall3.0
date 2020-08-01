import React from 'react';
// 首页 - 轮播图
import Carousel from './components/carousel';
// 本周热门
import Hot from './components/hot';

export default () => {
    return (
        <div className='dm_home'>
            <Carousel />
            <Hot />
        </div>
    );
};